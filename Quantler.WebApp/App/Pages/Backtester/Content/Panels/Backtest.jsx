import {Component}                      from 'react';
import {TemplateLoader}                 from '../../../../Services/API/Template/Loader.jsx';
import {Collapsr}                       from '../../../../Components/Collapsr/Main.jsx';
import {Template}                       from '../../../../Services/API/Models.jsx';
import {connect}                      from '../../../../State.jsx'
import * as StrategyFn                  from '../../Functions/Strategy.jsx'
import * as Utils                       from '../../Functions/Utils.jsx'
import _                                from 'lodash';

function mapChildren (template:Template) {
  return _.extend(TemplateLoader.templateItem(template), {
    template: template
  })
}

function mapTemplates (templates, templateType) {
  // object has been grouped by template.Type
  return {
    title: templateType,
    icon: TemplateLoader.iconElement(templateType),
    children: _.sortBy(
      templates.map((v) => mapChildren(v))
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
  fixedOpen: true,
  onClickFunc: (item) => {
    if (item.template) {
      StrategyFn.openTemplateSettings({
        templateId: item.template.ID
      })
    }
  }
}

function BacktestPanelComponent () {
  let data = formattedTemplates(Utils.resolveViewTemplates())

  return (
    <div>
      <div className="headertext">
        <span>Your Strategy</span>
      </div>

      <Collapsr data={data}
                options={collapsrOptions}/>
    </div>
  )
}

export let BacktestPanel = connect(state => ({

  strategy: state.Backtester.strategy

}))(BacktestPanelComponent)
