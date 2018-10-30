import {Component} from 'react'
import _ from 'lodash'
import './collapsr.scss'

class Item extends Component {
  render () {
    let { item, options } = this.props

    let className = ""

    if (options.activePredicates && options.activePredicates.item) {
      className += options.activePredicates.item(item) ? 'active' : ''
    }

    return (
      <div className="panel panel-default">
        <div style={ item.style }
             className="panel-heading">
          <h4 className="panel-title panel-title-child">
            <a onClick={ event => options.onClickFunc(item, event) }>
              <div className={ className }
                   style={ item.itemStyle || {} }
              >
                   { item.icon }
                     <span>&nbsp;&nbsp;{ item.title }</span>
              </div>
            </a>
          </h4>
        </div>
      </div>
    )
  }
}

class Panel extends Component {
  render () {
    let { item, options, state, togglePanel } = this.props

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title panel-title-child"
              style={{ cursor: 'pointer' }}
              onClick={ event => {
                if (options.renderLevel >= 3) {
                  togglePanel('panels', item.id)
                }

                options.onClickFunc(item, event)
              }}
          >
            <div className="collapsr-item-title">
              <item.element onClickFunc={ options.onClickFunc }/>
            </div>
          </h4>
        </div>

           { options.renderLevel >= 3 &&
           <div className={ "panel-collapse collapse " + ( state.panels[item.id] ? 'in' : '' ) }>
             <div className="panel-body">
               <div className="panel-group">
                    {
                      item.children && item
                        .children.map((codeFileItem, key) =>
                          <Item key={ key }
                                item={ codeFileItem }
                                options={ options }/>)
                    }
               </div>
             </div>
           </div>
           }
      </div>
    )
  }
}

class Heading extends Component {
  render () {
    let { item, options, state, togglePanel } = this.props

    return (
      <div className={ "panel panel-default " + ( state.headers[item.id] ? 'heading-open' : '' ) }>
        <div className="panel-heading top-panel-heading">
          <h4 onClick={ () => togglePanel('headers', item.id) }
              className="panel-title">
            <a>
              <div>
                { (item.icon) ? item.icon : null }

                <span>&nbsp;&nbsp;{ item.title }</span>

                {
                  (item.children && !options.fixedOpen)
                    ? <i className={
                    "fa fa-angle-"
                    + ( state.headers[item.id] ? 'down' : 'right' )
                    + " pull-right indicator"
                  }/>
                    : null
                }
              </div>
            </a>
          </h4>
        </div>

        <div className={ "panel-collapse collapse " + (
          state.headers[item.id] || options.fixedOpen ? 'in' : ''
        )}>
          <div className="panel-body">
            <div className="panel-group">
                 {
                   item.children.map((templateItem, key) =>
                     <Panel togglePanel={ togglePanel }
                            state={ state }
                            key={ key }
                            item={ templateItem }
                            options={ options }/>)
                 }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class Collapsr extends Component {
  _state = {
    headers: {},
    panels: {}
  }

  get state () {
    return _.merge({}, this._state)
  }

  set state (v) {
    this._state = _.merge({}, v)
  }

  componentWillMount () {
    if (this.props.data.length > 0) {
      this.buildState(this.props.data, this.props.options)
    }

    if (this.props.registerControl) {
      this.props.registerControl(
        this.setCollapsrState.bind(this))
    }
  }

  shouldComponentUpdate (nextProps) {
    this.buildState(nextProps.data, nextProps.options)
    return true
  }

  buildState (data, options) {
    this.state = data.reduce((state, item) => {
        state.headers[item.id] = false
        item.children.forEach(child => { state.panels[child.id] = false })
        return state
      }
      , { headers: {}, panels: {} })
  }

  remapState (category) {
    _.forEach(this.state[category],
      (v, k) => { this._state[category][k] = false })
  }

  togglePanel (category, id) {
    if (this.props.options.fixedOpen) return;

    let toset = !this.state[category][id]

    this.remapState(category)

    this._state[category][id] = toset

    this.forceUpdate()
  }

  // used to open header and panel
  // mainly for external functions
  // controlling the collapsr instance
  setCollapsrState (headerId, panelId) {
    if (this.props.options.fixedOpen) return;

    this.remapState('headers')
    this.remapState('panels')

    this._state.headers[headerId] = true
    this._state.panels[panelId] = true

    this.forceUpdate()
  }

  render () {
    let { data, options } = this.props

    return (
      <div className="collapsr panel-group">
           {
             data.map((item, key) =>
               <Heading togglePanel={ this.togglePanel.bind(this) }
                        state={ _.merge({}, this.state) }
                        key={ key }
                        item={ item }
                        options={ options }/>)
           }
      </div>
    )
  }

}
