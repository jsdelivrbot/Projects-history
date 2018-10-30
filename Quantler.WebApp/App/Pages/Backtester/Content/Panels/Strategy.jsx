import {Component}       from 'react';
import {TemplateLoader}  from '../../../../Services/API/Template/Loader.jsx';
import {Collapsr}        from '../../../../Components/Collapsr/Main.jsx';
import {Template}        from '../../../../Services/API/Models.jsx';
import {connect}         from '../../../../State.jsx'
import * as StrategyFn     from '../../Functions/Strategy.jsx'
import _                   from 'lodash';

function mapChildren (template:Template, parentKey:string) {
  return _.extend(TemplateLoader.templateItem(template), {
    template: template,
    parent: parentKey,
    id: template.ID
  })
}

function mapTemplates (templates, templateType) {
  // object has been grouped by template.Type
  return {
    id: templateType,
    title: templateType,
    icon: TemplateLoader.iconElement(templateType),
    children: _.sortBy(
      templates.map((v) => mapChildren(v, templateType))
      , 'title')
  }
}

function formattedTemplates (templates) {
  return _(templates)
    .filter((template) => template.Type !== 'Indicator')
    .groupBy((template) => template.Type)
    .map(mapTemplates)
    .sortBy('title')
    .value()
}

let collapsrOptions =
{
  renderLevel: 2,
  onClickFunc: (item) => {
    if (item.parent) {
      StrategyFn.addToStrategy({
        templateId: item.template.ID,
        templateType: item.template.Type
      })
    }
  }
}

function StrategyPanelComponent ({ templates }) {
  if (templates.length == 0) return <noscript/>

  let data = formattedTemplates(templates)

  return (
    <div>
      <div className="headertext">
        <span>Templates</span>
      </div>

      <Collapsr data={data}
                options={collapsrOptions}/>
    </div>
  )
}

export let StrategyPanel = connect(state => ({

  templates: state.Backtester.templates

}))(StrategyPanelComponent)
