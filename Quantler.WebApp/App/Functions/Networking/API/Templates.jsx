import {API, CodeGen} from './Main.jsx'

export default
{
  getTemplates ()
  {
    return API.get('template')
  },

  saveTemplate (template)
  {
    return API.put('template', template)
  },

  getTemplateFormat (templateType, templateName)
  {
    return API.get(`template/format/?TemplateType=${templateType}&TemplateName=${templateName}`)
  },

  getSpecificTemplate ({ ownerId, templateId })
  {
    return API.get(`template/${ownerId}/${templateId}`)
  },

  compile (templates)
  {
    return CodeGen.post('Compiler/Compile', templates)
  },

  getPublicTemplates (props)
  {
    let base = `template/public/?page=${props.page}`

    let url = base + Object.keys(props).reduce(
        (value, key) => value +
        ((!props[key]) ? ''
          : `&${key}=${ props[key] }` ), '')

    return API.get(url)
  },

  postComment ({ userId, templateId, content })
  {
    return API.put(
      `template/${userId}/${templateId}/comment`,
      { Content: content })
  },

  importTemplate ({ templateId, userId })
  {
    return API.post(`template/import/${userId}/${templateId}`, {})
  },

  templatesNeedUpdate ()
  {
    return API.get('template/updates')
  },

  updatePublicTemplate ({ ID, Owner })
  {
    return API.put(`template/update/${ Owner.UserID }/${ ID }`)
  },
}
