import {State}                      from '../../../State.jsx'
import * as Notification            from '../../../Functions/UI/Notification.jsx'
import {errorTypes, reportError}    from '../../../Functions/Errors.jsx'
import Functions                    from '../../../Functions/Functions.jsx'
import _                            from 'lodash'
import moment                       from 'moment'
import {TemplatesState}             from './TemplatesState.jsx'
import {LoginService}               from '../../../Services/API/Login/Main.jsx'
import {
  getTemplates,
  saveTemplate,
  getTemplateFormat,
  compile,
  templatesNeedUpdate,
  updatePublicTemplate as updatePublicTemplateAPI
} from '../../../Functions/Networking/API/Templates.jsx'

export function EditorState (contentObject) {
  if (!contentObject) {
    return TemplatesState().Editor
  }
  else {
    return TemplatesState({
      Editor: contentObject
    })
  }
}

// ----

export let editorConsole =
  ({
    text: (v) => ({ type: 'text', value: v }),
    timeStamp: (v) => ({ type: 'timestamp', value: v }),

    log (v)
    {
      let consoleContent = State
        .getState()
        .Templates.Editor
        .console.content

      let newContent = consoleContent.concat(
        this.text(''),
        this.timeStamp(moment().format('MM/DD/YYYY, HH:mm:ss')),
        this.text(v))

      State.setState({
        Templates: {
          Editor: {
            console: {
              content: newContent
            }
          }
        }
      })
    },

    clear ()
    {
      State.setState({
        Templates: {
          Editor: {
            console: {
              content: []
            }
          }
        }
      })
    },

    value ()
    {
      return State.getState()
        .Templates.Editor
        .console.content
    }

  })

// ----

//                                                   TEMPLATES

export function loadTemplates ({ callback } = {}) {
  if (EditorState().templates.length == 0 && LoginService.User && LoginService.User.id_token) {
    getTemplates()
      .then(templates => {
        EditorState({ templates })

        loadNeedUpdates()

        if (callback) callback()
      })
      .fail(...xhrError =>
        reportError(errorTypes.API.GET.TEMPLATES, xhrError))
  }
  else {
    console.log('checking update')

    // check if needs update
    getTemplates()
      .then(_templates => {
        let { templates } = EditorState()

        _templates.forEach(template => {
          if (!_.find(templates, { ID: template.ID })) {
            templates.push(template)
          }
        })

        window.console.log('Updating State')
        EditorState({ templates })

        loadNeedUpdates()

        if (callback) callback()
      })
      .fail(...xhrError =>
        reportError(errorTypes.API.GET.TEMPLATES, xhrError))
  }
}

export function loadNeedUpdates () {
  templatesNeedUpdate()
    .then(_templates => {
      if (!_templates.length) return

      let { templates } = EditorState()

      _templates.forEach(_template => {
        templates.forEach(template => {
          if (template.ID == _template.TemplateID &&
            template.Owner.UserID == _template.OwnerID) {
            template.needsUpdate = true
          }
        })
      })

      EditorState({ templates })
    })
    .fail(console.log.bind(console))
}

export function setActiveTemplate ({ templateId, fileName = null }) {
  let { activeTemplateId, templates } = State
    .getState()
    .Templates.Editor

  if (activeTemplateId == templateId) return null

  let template = _.find(templates, { ID: templateId })

  // check if template exists
  if (!template) {
    return reportError(errorTypes.TEMPLATES.NONEXISTENT_TEMPLATE(templateId))
  }

  let activeFileName = ( template.CodeFiles.length > 0
    ? template.CodeFiles[0].Name
    : null )

  EditorState({
    activeTemplateId: templateId,
    activeFileName: activeFileName
  })
}

export function updateTemplate ({ templateId, content }) {
  let { templates, unsavedTemplates } = State
    .getState()
    .Templates.Editor

  let updatedTemplates = templates.map(template => {
    return (template.ID == templateId)
      ? _.merge({}, template, content)
      : template
  })

  let updatedUnsavedTemplates = _
    .includes(unsavedTemplates, templateId)
    ? unsavedTemplates
    : unsavedTemplates.concat(templateId)

  EditorState({
    unsavedTemplates: updatedUnsavedTemplates,
    templates: updatedTemplates
  })
}

export function setTemplateForDeletion ({ templateId }) {
  updateTemplate({
    templateId: templateId,
    content: {
      IsDeleted: true
    }
  })
}

export function saveAll () {
  Functions.Shell.hitFeature('Save All Templates')
  editorConsole.log('Saving all files')

  // tell components that saving is being done
  EditorState({ saving: true })

  let {
    unsavedTemplates,
    activeFileName,
    activeTemplateId,
    templates
  } = State.getState().Templates.Editor

  // adds unsaved templates to object that will
  // be saved. used for when a template is modified
  // eg: changing template name, notebook content...
  let templatesToSave = unsavedTemplates.map(templateId =>
    _.find(templates, { ID: templateId }))

  // erros :templateIds[]
  let errors = []
  let count = 1

  function onTemplateSaved () {
    // If all templates have been processed
    if (count++ == templatesToSave.length) {
      if (errors.length > 0) {
        Notification.error({
          title: "Error Saving Templates",
          text: `Not all templates were saved correctly
                    Please try again`
        })

        editorConsole.log('Error saving templates')
      }
      else {
        Notification.success({
          title: "Templates Saved",
          text: "All templates saved successfully"
        })

        editorConsole.log('All files saved successfully')
      }

      TemplatesState({
        Editor: { saving: false },
        UI: { showSaveNotification: true }
      })
    }
  }

  let activeTemplateToSave = _.find(templatesToSave, { ID: activeTemplateId })

  if (activeTemplateToSave && activeTemplateToSave.IsDeleted) {
    EditorState({
      activeTemplateId: null,
      activeFileName: null
    })
  }

  // foreach template, get template, merge
  // with edited code files then save to api
  _.forEach(templatesToSave, template => {
    window.console.log('save template: ', template)

    saveTemplate(template)
      .done(returnedTemplate => {
        let { templates, unsavedTemplates } = State
          .getState()
          .Templates.Editor

        // if the template is returned that means it was not deleted
        if (returnedTemplate && !returnedTemplate.IsDeleted) {
          let updatedActiveFileName = activeFileName

          if (activeTemplateId == template.ID) {
            activeTemplateId = returnedTemplate.ID
            // check if activeFileName is
            // still in returnedTemplate.CodeFiles,
            // if not then it was deleted
            let codeFile = _.find(returnedTemplate.CodeFiles,
              { Name: activeFileName })

            // if the code file was deleted,
            // try to set a new activeFileName
            if (!codeFile) {
              updatedActiveFileName = returnedTemplate.CodeFiles.length > 0
                ? returnedTemplate.CodeFiles[0].Name
                : null
            }
          }

          let updatedTemplates = templates.map(_template =>
            (_template.ID == template.ID ? returnedTemplate : _template))

          EditorState({
            activeTemplateId,
            templates: updatedTemplates,
            activeFileName: updatedActiveFileName
          })
        }
        // if template was deleted
        else {
          let updatedTemplates = templates.filter(
            _template => _template.ID != template.ID)

          EditorState({
            templates: updatedTemplates
          })
        }

        EditorState({
          unsavedTemplates: unsavedTemplates.filter(
            templateId => templateId != template.ID)
        })
      })
      .fail(error => errors.push(template))
      .always(onTemplateSaved)
  })
}

export function addToUnsavedTemplates ({ templateId }) {
  let { unsavedTemplates } = State
    .getState()
    .Templates.Editor

  let updatedUnsavedTemplates =
    (unsavedTemplates.indexOf(templateId) == -1
      ? unsavedTemplates.concat(templateId)
      : unsavedTemplates )

  EditorState({ unsavedTemplates: updatedUnsavedTemplates })
}

export function updatePublicTemplate (template) {
  if (Number.isInteger(template)) {
    template = _.find(EditorState().templates, { ID: template })
  }

  EditorState({
    templatesUpdating: {
      [template.ID]: true
    }
  })

  window.toastr.success('Updating template: ' + template.Name)

  updatePublicTemplateAPI(template)
    .then((_template) => {
      let { templates, templatesUpdating } = EditorState()

      let key = 0

      templates.forEach((template, k) => {
        if (template.ID == _template.ID) {
          key = k
        }
      })

      templates[key] = _template

      delete templatesUpdating[template.ID]

      EditorState({ templates, templatesUpdating: [] })
      EditorState({ templatesUpdating })

      window.toastr.success('Updated template: ' + template.Name)
    })
    .fail(window.console.log)
}

export function enableSharing ({ templateId, disable }) {
  let { templates } = EditorState()

  templates.forEach(template => {
    if (template.ID == templateId) {
      template.IsPublic = !disable
    }
  })

  EditorState({ templates })

  addToUnsavedTemplates({ templateId: templateId })
}

//                                                         FILES

export function openFile ({ templateId, fileName }) {
  let { templates } = State.getState().Templates.Editor

  // check if template and file exists
  let template = _.find(templates, { ID: templateId })
  let codeFile = _.find(template.CodeFiles, { Name: fileName })

  if (template && codeFile) {
    EditorState({
      activeTemplateId: template.ID,
      activeFileName: codeFile.Name
    })

    State.setState({
      Templates: {
        UI: {
          rightBarView: 'parameters'
        }
      }
    })
  }
}

export function addFile ({ fileName, callback }) {
  editorConsole.log('Adding file : ' + fileName)

  let { activeTemplateId, templates } = State
    .getState()
    .Templates.Editor

  let template = _.find(templates, { ID: activeTemplateId })

  getTemplateFormat('', fileName)
    .then(codeFormat => {
      let newFile = {
        Name: fileName,
        Code: codeFormat,
        IsEdited: false,
        Parameters: [],
        IsDeleted: false
      }

      template.CodeFiles.push(newFile)

      let updatedTemplates = templates.reduce((templates, _template) =>
          templates.concat(_template.ID == template.ID ? template : _template)
        , [])

      EditorState({
        templates: updatedTemplates,
        activeFileName: fileName
      })

      editorConsole.log('Added file : ' + fileName)
      editorConsole.log('Remember to save your changes')

      if (callback) callback()

      addToUnsavedTemplates({ templateId: template.ID })
    })
    .fail(...xhrError => {
      editorConsole.log('Error adding file : ' + fileName)
    })
}

export function updateFile ({ templateId, fileName, content }) {
  let { templates } = State.getState().Templates.Editor

  let template = _.find(templates, { ID: Number(templateId) })
  let codeFile = _.find(template.CodeFiles, { Name: fileName })

  if (template && codeFile) {
    let updatedCodeFile = _.merge({}, codeFile, content)

    let updatedTemplates = templates.map(_template => {
      if (_template.ID == template.ID) {
        _template.CodeFiles = _template.CodeFiles.map(_codeFile =>
          _codeFile.Name == codeFile.Name ? updatedCodeFile : _codeFile)
      }

      return _template
    })

    EditorState({ templates: updatedTemplates })

    addToUnsavedTemplates({ templateId: template.ID })
  }
}

export function updateFileCode ({ templateId, fileName, code }) {
  updateFile({
    templateId, fileName,
    content: { Code: code }
  })
}

export function setFileForDeletion ({ templateId, fileName }) {
  updateFile({
    templateId, fileName,
    content: { IsDeleted: true }
  })
}

export function doesFileContainErrors ({ templateId, fileName }) {
  let { compiler } = State.getState().Templates.Editor

  return !!_.find(compiler.compileResponse.Exceptions,
    { CodeFile: fileName })
}

//                                                     COMPILING

export function handleCompile () {
  let { templates } = State.getState().Templates.Editor

  // used for compile button spinner
  EditorState({
    compiler: { compiling: true }
  })

  editorConsole.log(`Compiling files...`)

  compile(templates)
    .then(response => {
      console.log(response)
      // so other components can update
      EditorState({
        compiler: { compileResponse: response }
      })

      if (!!response.IsSuccess) {
        editorConsole.log(`Files compiled successfully`)
        Notification.success({ title: 'Compiled successfully' })
      }
      else {
        editorConsole.log(`Compilation Error`)
        Notification.error({ title: 'Compile Unsuccessful' })

        TemplatesState({
          UI: {
            editor: {
              footer: {
                tab: 1
              }
            }
          }
        })
      }
    })
    .fail(...errors => {
      console.log(errors)
      Notification.error({ title: 'Compile Error' })
    })
    .always(() => {
      EditorState({
        compiler: { compiling: false }
      })
    })
}

// ----

//                                                       Utils

export function needsSaving () {
  let { unsavedTemplates } = State
    .getState()
    .Templates.Editor

  return unsavedTemplates.length > 0
}

export function focusFile ({ templateId, fileName }) {
  TemplatesState({
    Editor: {
      activeTemplateId: templateId,
      activeFileName: fileName
    },
    UI: {
      rightBarView: 'parameters'
    }
  })
}
