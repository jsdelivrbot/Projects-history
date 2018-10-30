import {Component}                      from 'react';
import {TemplateLoader}                 from '../../../../Services/API/Template/Loader.jsx'
import {Collapsr}                       from '../../../../Components/Collapsr/Main.jsx'
import {Template, CodeFile}             from '../../../../Services/API/Models.jsx'
import {connect}                        from '../../../../State.jsx'
import {BacktesterState}                from '../../Functions/BacktesterState.jsx'
import * as StrategyFn                    from '../../Functions/Strategy.jsx'
import * as Utils                         from '../../Functions/Utils.jsx'
import _                                  from 'lodash'

function mapChildren (template:Template) {
  return _.extend(TemplateLoader.templateItem(template), {
    id: template.ID,
    children: template.CodeFiles.map((file:CodeFile) => (
    {
      template: template,
      codeFile: file,
      id: file.Name,
      style: { paddingLeft: 36 },
      icon: <i className="fa fa-file-code-o"/>,
      title: file.Name,
      parent: template.Name
    }))
  })
}

function mapTemplates (templates, templateType) {
  // object has been grouped by template.Type
  return {
    id: templateType,
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
  collapsed: false,
  activePredicates: {
    item: item => {
      return item.title == BacktesterState().activeCodeFileName
        && item.template.ID == BacktesterState().activeTemplateId
    }
  },
  openHeadingClass: '',
  renderLevel: 3,
  onClickFunc: (item) => {
    if (item.parent) {
      if (item.codeFile) {
        StrategyFn.openCodeFile({
          templateId: item.template.ID,
          fileName: item.codeFile.Name
        })
      }

      StrategyFn.openTemplateSettings({
        templateId: item.template.ID
      })

      $(() => {
        $('.collapsr-item-title').css('color', '')
        $('#item-title-' + item.title).css('color', '#e84e1b')
        // .replace('.','_')
      })
    }
  }
}

function CodePanelComponent ({ strategy }) {
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

export let CodePanel = connect(state => ({

  strategy: state.Backtester.strategy,
  activeCodeFileName: state.Backtester.activeCodeFileName,
  activeTemplateId: state.Backtester.activeTemplateId

}))(CodePanelComponent)
