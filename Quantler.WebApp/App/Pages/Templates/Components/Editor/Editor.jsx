import React                 from 'react'
import {AceEditor}         from './AceEditor.jsx';
import {AddNewFileModal}   from './AddNewFileModal.jsx'
import {connect}           from '../../../../State.jsx'
import {handleToggleModal} from '../../Functions/UI.jsx'
import * as TemplatesEditor  from '../../Functions/Editor.jsx';
import _                     from 'lodash'
import {Footer}            from './Footer.jsx'

@connect(state => ({
  compiling: state.Templates.Editor.compiler.compiling
}))
class CompileButton extends React.Component {
  render () {
    let { compiling } = this.props

    let disabled = (
      compiling)
      ? { disabled: 'disabled' }
      : {}

    return (
      <div className="col-md-2" style={{ float: 'right' }}>
        <button className="btn btn-primary pull-right compile-btn"
                onClick={() => TemplatesEditor.handleCompile()}
                {...disabled}
        >
          <span>Compile</span>
                <span>
                &nbsp;&nbsp;&nbsp;
                  {
                    compiling
                      ? <i className="fa fa-refresh fa-spin"/>
                      : <i className="fa fa-chevron-circle-right fa-align-right"/>
                  }
                </span>
        </button>
      </div>
    )
  }
}

class EditorComponent extends React.Component {
  handleAddFile = (fileName, componentUpdate) => {
    // callback from Add file modal, to
    // update it on API call and response
    componentUpdate({ loading: true })

    TemplatesEditor.addFile({
      fileName: fileName,
      callback: function () {
        componentUpdate({
          done: true
        })
      }
    })
  }

  editor = null
  activeFileObject = null
  updateTimeout = setTimeout(() => {}, 0)

  componentDidUpdate () {
    if (this.editor) {
      let session = this.editor.getSession()
      session.setUseWrapMode(false)
      session.setUseWrapMode(true)
    }
  }

  editorComponent () {
    let { tabsHeight } = this.props.UI.editor
    let TemplatesUI = this.props.UI

    let {
      activeFileName,
      EditorId,
      activeTemplateId,
      templates
    } = this.props.Editor

    let height = String(0
      + TemplatesUI.templatesContentHeight
      - TemplatesUI.editorFooterHeight
      - tabsHeight)

    let activeTemplate = _.find(templates, { ID: activeTemplateId })

    let activeFileObject = (
      !activeTemplate
        ? null
        : _.find(activeTemplate.CodeFiles, { Name: activeFileName }))

    let onChange = value => {
      if (value !== activeFileObject.Code) {
        TemplatesEditor.updateFileCode({
          templateId: activeTemplateId,
          fileName: activeFileName,
          code: value
        })
      }
    }

    let onLoad = editor => {
      this.editor = editor
      editor.getSession().setUseWrapMode(true)
    }

    clearTimeout(this.updateTimeout)

    this.updateTimeout = setTimeout(() => {
        if (this.editor) {
          this.editor.resize(true)

          if (this.activeFileObject &&
            activeFileObject.Name !== this.activeFileObject.Name) {
            console.log("this.activeFileObject")
            this.activeFileObject = activeFileObject
            this.editor.navigateFileStart()
          }
        }
      }
      , 50)

    return (
      !activeFileObject)
      ? null
      : <AceEditor
      style={{ height: height }}
      code={ activeFileObject.Code }
      id={ EditorId }
      {...{ onChange, onLoad }} />
  }

  editorTabs () {
    let { activeTemplateId, activeFileName, templates } = this.props.Editor

    let template = _.find(templates, { ID: activeTemplateId })

    // if there is no active template or
    // the template has no code files
    if (!template) return null

    let btnClassName = fileObject => "btn btn-menu btn-primary " +
    (
      activeFileName == fileObject.Name
        ? 'active'
        : '' )

    let iconClassName = fileObject => "fa fa-exclamation-triangle " +
    (
      TemplatesEditor.doesFileContainErrors({
        templateId: template.ID,
        fileName: fileObject.Name
      })
        ? ''
        : 'hide' )

    return (
      <div className="col-md-10">
           {
             template.CodeFiles.map((codeFile, key) =>
               (
                 <button className={ btnClassName(codeFile) }
                         key={ key }
                         onClick={() => TemplatesEditor.openFile(
                           {
                             templateId: template.ID,
                             fileName: codeFile.Name
                           })}>
                   <span>{ codeFile.Name }</span> &nbsp;
                   <i style={{ color: '#ffce54' }}
                      className={ iconClassName(codeFile) }/>
                 </button>
               ))
           }
           {
             this.addNewFileBtn()
           }
      </div>
    )
  }

  addNewFileBtn () {
    return (
      <button onClick={ handleToggleModal('addNewFile') }
              className="btn btn-menu btn-primary"
      >
        <span>+ Add</span>
        <AddNewFileModal handleAdd={ this.handleAddFile }/>
      </button>
    )
  }

  render () {
    let TemplatesUI = this.props.UI
    let ui = this.props.ui

    let style = {
      height: '100%',
      left: TemplatesUI.leftSidebarWidth,
      background: '#3E3F4B',
      width: (
        $(window).width()
        - (TemplatesUI.leftSidebarWidth + TemplatesUI.rightSidebarWidth)
        - ((ui.activeLayout == 'expanded') ? 220 : 70)
      )
    };

    let consoleContent = TemplatesEditor.editorConsole.value()

    return (
      <div className="box-mmenu col-sm-8" style={style}>

        <div className="col-sm-12 box-tab-menu" style={{ height: TemplatesUI.editor.tabsHeight }}>
          <div className="row">
               { this.editorTabs() }
                 <CompileButton />
          </div>
        </div>

        <div>
          { this.editorComponent() }
          <Footer />
        </div>
      </div>
    )
  }

}

export let Editor = connect(state => ({
  ui: state.ui,
  Editor: state.Templates.Editor,
  UI: state.Templates.UI
}))(EditorComponent)
