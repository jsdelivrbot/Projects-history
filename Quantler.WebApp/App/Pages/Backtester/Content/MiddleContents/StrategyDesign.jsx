import {Component}      from 'react'
import {connect}        from '../../../../State.jsx'
import {TemplateLoader} from '../../../../Services/API/Template/Loader.jsx';
import * as StrategyFn    from '../../Functions/Strategy.jsx'
import * as Utils         from '../../Functions/Utils.jsx'
import _                  from 'lodash'
import {NotebookModalButton} from '../../../../Components/Template/NotebookModal.jsx'

@connect(state => ({
  templates: state.Backtester.templates,
  strategy: state.Backtester.strategy
}))
export class StrategyDesignContent extends Component {

  dragboxHeight

  setDragboxHeight () {
    this.dragboxHeight = ($(window).height() - 220) / 2
    this.forceUpdate()
  }

  constructor () {
    super()

    $(() => {
      this.setDragboxHeight()
      $(window).resize(() => this.setDragboxHeight())
    })
  }

  mapTemplates (template) {
    return (
      <p key={_.uniqueId()}>
        <a onClick={ () => StrategyFn.openTemplateSettings(
          {
            templateId: template.ID
          })}
        >
          &nbsp;&nbsp;
          <i className="fa fa-chain-broken"/>
          &nbsp;&nbsp;
          <span>{template.Name}</span>
        </a>
        <a onClick={() => StrategyFn.removeFromStrategy(
          {
            templateId: template.ID,
            templateType: template.Type
          })}
        >
          <i className="fa fa-close pull-right"/>
        </a>
        <a onClick={() => StrategyFn.openTemplateSettings(
          {
            templateId: template.ID
          })}
        >
          <i className="fa fa-cog pull-right"/>
        </a>
        <NotebookModalButton template={template}/>
      </p>
    )
  }

  // Takes a StrategyTypeProperty and returns
  // the helpText if there is no template selected yet
  helpText (type) {
    let text = (type == "Entry") ? "Choose an entry template to specify how, when and where to enter the markets." :
      (type == "Exit") ? "Choose an exit template to specify how, when and where to exit the markets." :
        (type == "Money Management") ? "Choose a money management template to specify position sizing and timing." :
          (type == "Risk Management") ? "Choose a risk management template to specify how to manage your risk." :
            "";

    return (
      <div className="info">
        <i className="fa fa-question-circle"/>
        <h5>Empty</h5>
        <div style={{ width: 280, margin: '0 auto' }}>
          <span>{ text }</span>
        </div>
      </div>
    )
  }

  // Renders the 4 areas of the strategy designer
  renderItems = (templates, type) => {
    // If there is any template selected it renders
    // the list, else it renders the help text
    return (_.size(templates) > 0
      ? templates.map(this.mapTemplates)
      : this.helpText(type))
  }

  icon = templateType => TemplateLoader.iconElement(templateType)
  text = typeProperty => typeProperty.current + '/' + typeProperty.max

  templatesOfType = (templates, type) =>
    templates.filter(template => template.Type == type)

  // Returns function (templateType) => element
  mapContent (templates) {
    return (typeProperty, templateType) => (
      <div key={_.uniqueId()}
           className="dragbox col-sm-6"
           style={{ height: this.dragboxHeight }}>

        <div className="title">
             { this.icon(templateType) }
               &nbsp;<span>{ templateType }</span>
               &nbsp;<span>{ this.text(typeProperty) }</span>
        </div>

           {
             this.renderItems(
               this.templatesOfType(templates, templateType),
               templateType)
           }
      </div>
    )
  }

  render () {
    let { templates, strategy } = this.props

    let strategyTemplates = Utils.resolveViewTemplates()

    let content = _.map(strategy.templateTypes, this.mapContent(strategyTemplates))

    return (
      <div className="current-strategy unselectable-all">
        <img src={ "Art/" + 'Icons/micro-logo.png' } alt=""/>
        <div className="top-shadow">
          <div></div>
        </div>
           { content }
      </div>
    )
  }
}
