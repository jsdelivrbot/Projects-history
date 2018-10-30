import {Template, CodeFile} from '../Models.jsx';
import {APIURL, CODEGENURL} from '../Main.jsx';
import {AjaxHandler}        from '../AjaxHandler.jsx';

export function saveTemplate (template:Template) {
  return AjaxHandler.Put(APIURL + 'template', template)
}

export function getTemplateFormat (templateType:String, templateName:String) {
  return AjaxHandler.Get(APIURL + `template/format/?TemplateType=${templateType}&TemplateName=${templateName}`)
}

export function compile (template:Template) {
  return AjaxHandler.Post(CODEGENURL + 'Compiler/Compile', JSON.stringify([template]))
}
