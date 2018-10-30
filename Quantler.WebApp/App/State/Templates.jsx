import _ from 'lodash'

export let Templates =
{
  UI: {
    templatesContentHeight: null,
    leftSidebarWidth: 270,
    rightSidebarWidth: 270,
    leftMaxWidth: null,
    rightMaxWidth: null,
    editorFooterHeight: 150,

    rightBarView: 'templateSettings',
    showSaveNotification: true,

    // modals open/closed
    modals: {
      addNewFile: false
    },
    editor: {
      tabsHeight: 50,
      footer: {
        tab: 0
      }
    }
  },
  Editor: {
    EditorId: _.uniqueId('ace'),
    activeTemplateId: null,
    activeFileName: null,
    // type IOpenedFile[]
    templates: [],
    templatesUpdating: {},
    // if the editor is in the
    // process of saving the files
    // (ex: API calls to save template)
    saving: false,
    // used for modifying the templates
    unsavedTemplates: [],
    console: {
      // every array item is
      // a line in the console
      content: [{
        type: 'text',
        value: 'Initializing Quantler Console'
      }]
    },
    compiler: {
      compiling: false,
      compileResponse: {}
    }
  },
  TemplateSettings: {}
}
