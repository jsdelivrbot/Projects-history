import React         from 'react'
import {Store}            from '../../Utils/pubsub.jsx'
import {AjaxErrorHandler} from '../../../Functions/Networking/API/Main.jsx'
import {Template}         from '../Models'
import {NotebookModalButton} from '../../../Components/Template/NotebookModal.jsx'
import {APIURL}           from '../Main.jsx'
import {AjaxHandler}      from '../AjaxHandler.jsx'

// Functions to return elements used in Collapsr panels
var _iconElement = (iconClass) => <i className={"fa glyphicon " + iconClass}/>;

let _templateItem = (template:Template) => {
  return {
    title: template.Name,
    element: class TemplateItem extends React.Component {

      render () {
        let titleAttributes = {
          className: "title",
          onClick: this.props.onClickFunc
        }

        return (
          <div className="templateitem">
            &nbsp;&nbsp;
            <i className="fa fa-chain-broken"/> &nbsp;&nbsp;

            <span {...titleAttributes}>{template.Name}</span>

            <NotebookModalButton template={template}/>
          </div>
        )
      }
    }
  }
}

export class TemplateLoaderClass extends Store {

  get templateItem () {
    return _templateItem
  }

  get templates ():Array<Template> {
    return this._templates;
  }

  set templates (templates:Array<Template>) {
    this._templates = templates;
    this.Publish();
  }

  // If there is any element in this.templates
  ready ():bool {
    return (
    (
    this.templates || []).length > 0);
  }

  // Returns Ajax promise to template API Get
  loadTemplates () {
    return AjaxHandler.Get(APIURL + 'template');
  }

  // Resolves Ajax promise and Publishes
  fetchTemplates (callback) {
    this.loadTemplates()
      .success((data) => {
        this.templates = data
        if (callback) callback(this.templates)
      })
      .fail(AjaxErrorHandler)
  }

  iconElements = {
    'Entry': _iconElement('fa-sign-in'),
    'Risk Management': _iconElement('fa-exclamation-triangle'),
    'Money Management': _iconElement('fa-money'),
    'Exit': _iconElement('fa-sign-out')
  }

  // Returns <i/> icon element for
  // the given template type
  iconElement (type) {
    return this.iconElements[type] || null
  }

}

export var TemplateLoader:TemplateLoaderClass = new TemplateLoaderClass();
