export default
{
  view: "Index",
  loading: true,
  index: {
    ajaxOptions: {
      page: 1,
      pagesize: 9,
      filtertype: ""
    },
    ajaxResponse: [],
    templates: [],
    loading: true
  },
  details: {
    tab: "Note",
    loading: true,
    Template: [],
    Comments: [],
    comment: {
      loading: false,
      text: ""
    },
    code: {
      codeFile: 0
    }
  },
  templateImport: {
    userTemplates: [],
    needsUpdate: [],
    importing: {
      ID: -1,
      Owner: {
        UserID: -1,
        AvatarURL: "",
        FullName: ""
      }
    }
  }
}
