import marketplaceModel  from '../../State/Marketplace.jsx'
import * as TemplatesAPI from '../Networking/API/Templates.jsx'
import * as UserAPI      from '../Networking/API/User.jsx'
import * as API          from '../Networking/API/API.jsx'
import _                 from 'lodash'
import Utils from '../Utils/Utils.jsx'
import AjaxErrors from '../Utils/AjaxErrors.jsx'


let marketplace = value => ({ state: { marketplace: value } })


let templateImportCheck = ({ userTemplates, needsUpdate }) => {
  return (template) => {
    template.imported = !!_.find(userTemplates, {
      ID: template.ID,
      Owner: { UserID: template.Owner.UserID }
    })

    template.needsUpdate = !!_.find(needsUpdate, {
      TemplateID: template.ID,
      OwnerID: template.Owner.UserID
    })

    return template
  }
}

export let Marketplace = {
  // Marketplace Load

  // the marketplace loads the templates that need update and the
  // current user templates. these are used both in the index (main
  // page) and the details page to check if the template is already
  // imported or if it needs updating (to render the import button)

  load ()
  {
    return {
      ...marketplace({
        loading: true
      }),
      ajax: [
        [API.Templates.templatesNeedUpdate,
          {}, Marketplace._needsUpdate]]
    }
  },

  _needsUpdate: {
    success (needsUpdate) {
      return {
        ...marketplace({
          templateImport: { needsUpdate }
        }),
        ajax: [
          // load user templates: used to know
          // which templates have been imported
          [API.Templates.getTemplates, {}, Marketplace._loadUserTemplates]
        ]
      }
    },
    error: AjaxErrors.handler({
      message: 'Error loading template updates, please try again later'
    })
  },

  _loadUserTemplates: {
    success (userTemplates) {
      return {
        ...marketplace({
          loading: false,
          templateImport: { userTemplates }
        })
      }
    },
    error: AjaxErrors.handler({
      message: 'Error loading templates, please try again later'
    })
  },

  unLoad ()
  {
    return {
      ...marketplace({
        loading: true
      })
    }
  },

  // Index View

  indexLoad (_state)
  {
    let { state, ajax } =
      Marketplace.loadPublicTemplates({}, _state)

    return {
      ajax,
      state: Object.deepExtend(state, {
        marketplace: {
          view: "Index"
        }
      })
    }
  },

  scrollLoadPublicTemplates: (_ajaxOptions = {}, state) => {
    let ajaxOptions = Object.deepExtend(
      state.marketplace.index.ajaxOptions, _ajaxOptions)

    return {
      ...marketplace({
        index: {
          ajaxOptions,
          loading: false
        }
      }),
      ajax: [[TemplatesAPI.getPublicTemplates,
        ajaxOptions, Marketplace._scrollLoadPublicTemplates]]
    }
  },

  _scrollLoadPublicTemplates: {
    success (ajaxResponse, text, xhr, state) {
      // check which templates have already
      // been imported and if it needs updating
      let templates = ajaxResponse.Content.map(
        templateImportCheck(state.marketplace.templateImport))

      templates = state.marketplace.index.templates.concat(templates)

      return {
        ...marketplace({
          index: {
            ajaxResponse,
            templates,
            loading: false
          }
        })
      }
    },
    error: AjaxErrors.handler({
      message: 'Error loading public templates, please try again later'
    })
  },

  loadPublicTemplates: (_ajaxOptions = {}, state) => {
    let ajaxOptions = Object.deepExtend(
      state.marketplace.index.ajaxOptions, _ajaxOptions)

    return {
      ...marketplace({
        index: {
          ajaxOptions,
          loading: true
        }
      }),
      ajax: [[TemplatesAPI.getPublicTemplates,
        ajaxOptions, Marketplace._loadPublicTemplates]]
    }
  },

  _loadPublicTemplates: {
    success (ajaxResponse, text, xhr, state) {
      // check which templates have already
      // been imported and if it needs updating
      let templates = ajaxResponse.Content.map(
        templateImportCheck(state.marketplace.templateImport))
      
      return {
        ...marketplace({
          index: {
            ajaxResponse,
            templates,
            loading: false
          }
        })
      }
    },
    error: AjaxErrors.handler({
      message: 'Error loading public templates, please try again later'
    })
  },

  filterTemplates ({ filterType }, state) {
    window.console.warn('filterType: ', filterType)
    return Marketplace.loadPublicTemplates(
      Object.deepExtend(
        state.marketplace.index.ajaxOptions, { filterType }))
  },

  // Details View

  detailsLoad (props, _state) {
    let { state, ajax } = Marketplace.loadTemplateDetails(props, _state)

    return {
      ajax,
      state: Object.deepExtend(state, {
        marketplace: {
          view: "Details",
          details: {
            code: { codeFile: 0 }
          }
        }
      })
    }
  },

  loadTemplateDetails (props) {
    return {
      ...marketplace({
        details: { loading: true }
      }),
      ajax: [[TemplatesAPI.getSpecificTemplate,
        props, Marketplace._loadTemplateDetails]]
    }
  },

  _loadTemplateDetails: {
    success ({ Template, Comments }, status, xhr, state) {
      let template = templateImportCheck(state.marketplace.templateImport)(Template)
      return {
        ...marketplace({
          details: {
            comment: { loading: false },
            Comments,
            loading: false,
            Template: template
          }
        })
      }
    },
    error: AjaxErrors.handler({
      message: 'Error loading template details, please try again later'
    })
  },

  selectTab (tab)
  {
    return {
      ...marketplace({
        details: { tab }
      })
    }
  },

  openCodeFile (key)
  {
    return {
      ...marketplace({
        details: {
          code: {
            codeFile: key
          }
        }
      })
    }
  },

  postComment (state) {
    let { Template, comment } = state.marketplace.details
    let { ID : templateId, Owner } = Template
    let content = comment.text
    return {
      ...marketplace({
        details: {
          comment: { loading: true }
        }
      }),
      ajax: [[
        API.Templates.postComment,
        { templateId, content, userId: Owner.UserID },
        Marketplace._postComment
      ]]
    }
  },

  _postComment: {
    success (response, status, xhr, state) {
      let { ID : templateId, Owner } = state.marketplace.details.Template
      return Marketplace.loadTemplateDetails({
        ownerId: Owner.UserID, templateId
      })
    },
    error: AjaxErrors.handler({
      message: 'Error posting comment, please try again later'
    })
  },

  updateCommentText (text) {
    return {
      ...marketplace({
        details: {
          comment: { text }
        }
      })
    }
  },

  // General Functions

  loadOwnerInfo ({ id }) {
    return {
      state: {
        User: {
          ui: {
            userDetails: {
              loading: true
            }
          }
        }
      },
      ajax: [
        [UserAPI.getUserDetails, { id }, Marketplace._loadOwnerInfo]]
    }
  },

  _loadOwnerInfo: {
    success (ownerInfo) {
      return {
        state: {
          User: {
            ui: {
              userDetails: { loading: false, ...ownerInfo }
            }
          }
        }
      }
    },
    error: AjaxErrors.handler({
      message: 'Error , please try again later'
    })
  },

  importTemplate ({ templateId, userId, searchSource }, _state) {
    // if a template is being imported,
    // avoids multiple template imports
    if (_state.marketplace.templateImport.importing.ID != -1) return {}

    // `source` is where to look for the template,
    // it's used in the details page as it's template
    // is kept in a different location in state than the
    // templates of the index page (avoids code duplication)
    let source = (searchSource
      ? searchSource(_state)
      : _state.marketplace.index.templates)

    let { ID, Owner } = _.find(source,
      { ID: templateId, Owner: { UserID: userId } })

    let { state } = marketplace({
      templateImport: {
        importing: { ID, Owner }
      }
    })

    if (_state.marketplace.view == "Index") {
      let templates =
        _state.marketplace.index.templates.map(template => {
          if (template.ID == ID &&
            template.Owner.UserID == Owner.UserID) {
            template.importing = true
          }

          return template
        })

      state = Object.deepExtend(
        state,
        {
          marketplace: {
            index: {
              templates
            }
          }
        })
    }

    return {
      state,
      ajax: [
        [TemplatesAPI.importTemplate,
          { templateId, userId },
          Marketplace._importTemplate]]
    }
  },

  _importTemplate: {
    success (response, status, xhr, _state) {
      window.console.log('\n IMPORT TEMPLATE RESPONSE')
      Utils.outputResponse(response, xhr, status)
      let { importing } = marketplaceModel.templateImport
      let { state } = marketplace({ templateImport: { importing } })
      switch (_state.marketplace.view) {
        case "Index":
          let templates = _state.marketplace.index.templates
          let template = _.find(templates,
            _state.marketplace.templateImport.importing)
          template.imported = (true)
          template.importing = (false)
          state = Object.deepExtend(state, {
            marketplace: {
              index: { templates }
            }
          })
          break
        case "Details":
          let { Template } = _state.marketplace.details
          Template.imported = true
          state = Object.deepExtend(state, {
            marketplace: {
              details: { Template }
            }
          })
          break
      }
      return {
        state,
        ajax: [[
          API.Templates.templatesNeedUpdate,
          {}, Marketplace._needsUpdate
        ]]
      }
    },
    error: AjaxErrors.handler({
      message: 'Error importing template, please try again later'
    })
  },
}
