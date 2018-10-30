import {Component, addons, createClass}      from 'react/addons'
import {BacktesterState}                     from '../Functions/BacktesterState.jsx'
import {connect}                             from '../../../State.jsx'
import * as StrategyFn                         from '../Functions/Strategy.jsx'
import * as Utils                              from '../Functions/Utils.jsx'
import _                                       from 'lodash'
import Modal                                   from '../../../Components/Modal/Modal.jsx'
import Tooltip                                 from 'rc-tooltip'
import {Combobox}                              from 'react-widgets'

class AdvancedSettings extends Component {
  open = false

  state = {
    Commission: 4.00,
    Slippage: 0.1,
    LatencyMS: 2,
    Spread: 0.0,
    InitialBalance: 10000,
    Leverage: 100,
  }

  regex = (/^([0-9]{1,})?([,.])?([0-9]{1,2})?$/)

  onChange = (option) => ({ target }) => {
    let value = target.value.replace('$', '').replace(' ', '')

    if (!this.regex.test(value)) return false

    this.setState({
      [ option ]: value
    })

    StrategyFn.setAdvancedSettings({
      [ option ]: parseFloat(value || 0)
    })
  }

  toggle = () => {
    this.open = !this.open
    this.forceUpdate()
  }

  headerStyle = { padding: '14px 0 0 15px', fontWeight: 300, fontSize: 16, color: '#31323e' }

  option = ({ property, currency, float, title, width, tooltip }) => {
    let value = this.state[property]

    return (
      <div className={"col-md-2"} style={{ width }}>
        <div className="row">
          <span>{title}</span>
          <Tooltip overlay={tooltip} placement="top">
            <i className="fa fa-info-circle pull-right"/>
          </Tooltip>
        </div>
        <div className="row">
          <input
            onChange={ this.onChange(property) }
            value={(currency ? '$ ' : '') + value}
            type="text"
            style={{ width: '100%', padding: '2px 0 0 5px' }}/>
        </div>
      </div>
    )
  }

  render = () => {
    let { Settings } = this.props

    return (
      <div className="selectionmenu">

        <br/>
        <div className="row">
          <div style={{ float: 'left' }}>
               {/*onChange checked*/}
                 <input
                   checked={ Settings.UseTickData }
                   onChange={ () => StrategyFn.updateGlobalSettings({
                     setting: "Settings", content: {
                       UseTickData: !Settings.UseTickData
                     }
                   })}
                   id="cmn-toggle-2"
                   className="cmn-toggle cmn-toggle-round"
                   type="checkbox"/>
                 <label htmlFor="cmn-toggle-2"></label>
          </div>

          <span style={{ float: 'left', marginLeft: 10 }}>Use tick data</span>

          <Tooltip overlay={`${!Settings.UseTickData ? 'Force using tick data' : 'Use pre-aggregated data'}`}>
            <i className="fa fa-info-circle" style={{ color: '#ee4415', float: 'right' }}/>
          </Tooltip>
        </div>

        <br/>
        <a onClick={this.toggle}>
          Advanced Settings
          <i style={{ fontSize: 22, marginTop: 4 }} className="zmdi zmdi-more pull-right"/>
        </a>
        <Modal isOpen={this.open} onRequestClose={this.toggle}>

          <div className="QModal">
            <div className="modal-body">
              <div className="row">
                <h5 style={this.headerStyle}>Advanced Settings</h5> <br/>
              </div>
              <div className="row">
                   {this.option({
                     property: "Commission",
                     currency: true,
                     width: 155,
                     float: false,
                     title: 'Commission',
                     tooltip: 'Broker Commissions per side'
                   })}
                   {this.option({
                     property: "Slippage",
                     currency: false,
                     width: 142,
                     float: false,
                     title: 'Slippage in pips',
                     tooltip: 'Simulated Slippage'
                   })}
                   {this.option({
                     property: "LatencyMS",
                     currency: false,
                     width: 140,
                     float: false,
                     title: 'Latency in ms',
                     tooltip: 'Simulated Latency'
                   })}
                   {this.option({
                     property: "Spread",
                     currency: false,
                     width: 134,
                     float: false,
                     title: 'Spread in pips',
                     tooltip: 'Additional spread on fills'
                   })}
                   {this.option({
                     property: "InitialBalance",
                     currency: true,
                     width: 141,
                     float: false,
                     title: 'Initial Balance',
                     tooltip: 'Account initial balance'
                   })}
                   {this.option({
                     property: "Leverage",
                     currency: false,
                     width: 120,
                     float: false,
                     title: 'Leverage',
                     tooltip: 'Fixed Account Leverage'
                   })}
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={this.toggle} key={0} type="button" className="btn btn-danger">
                Submit
              </button>
            </div>
          </div>

        </Modal>
      </div>
    )
  }
}

@connect(state => ({

  Backtester: state.Backtester

}))
class GlobalSettings extends Component {
  assetTypes () {
    return (
      <div className="selectionmenu">
        <span className="setting-title">Asset Type</span>
        <div className="select">
          <select className="setting-form form-control">
            <option value="Forex">
              Forex
            </option>
          </select>
        </div>
      </div>
    )
  }

  handleSymbolSelect = (event) => {
    if (event.target.value !== '?') {
      StrategyFn.setSymbol({
        symbolId: Number(event.target.value)
      })
    }
  }

  setDefaultSymbol (symbol) {
    BacktesterState({
      strategy: {
        globalSettings: {
          Samples: {
            Symbol: symbol
          }
        }
      }
    })
  }

  setDefaultSample (sample) {
    BacktesterState({
      strategy: {
        globalSettings: {
          Samples: sample
        }
      }
    })
  }

  symbols () {
    let { strategy }  = this.props.Backtester
    let currentSymbol = strategy.globalSettings.Samples.Symbol
    let symbols = Utils.resolveViewSymbols()

    let options = _.map(symbols, symbol =>
      <option
        value={ symbol.ID }
        key={ symbol.ID }
        label={ symbol.Name }>
        { symbol.Name }
      </option>)

    /* Set the first symbol if there's one */
    if (symbols.length !== 0 && !currentSymbol) this.setDefaultSymbol(symbols[0])

    return (
      <div className="selectionmenu">
        <span className="setting-title">Symbol</span>
        <div className="select">
          <select className="setting-form form-control"
                  value={ currentSymbol ? currentSymbol.ID : "?" }
                  onChange={ this.handleSymbolSelect }>
            <option value="?" label=""/>
            { options }
          </select>
        </div>
      </div>
    )
  }

  handleSampleSelect (event) {
    if (event.target.value !== '?') {
      StrategyFn.setSample({
        sampleId: Number(event.target.value)
      })
    }
  }

  samples () {
    let { strategy }  = this.props.Backtester
    let samples = Utils.resolveViewSamples()
    let currentSample = strategy.globalSettings.Samples

    let options = samples.map(sample =>
      <option
        key={ sample.ID }
        label={ sample.Name }
        value={ sample.ID }>
        { sample.Name }
      </option>)

    /* Set the first sample if there's one */
    if (samples.length !== 0 && !currentSample.Symbol) this.setDefaultSample(samples[0])

    return (
      <div className="selectionmenu">
        <span className="setting-title">Sample</span>
        <div className="select">
          <select className="setting-form form-control"
                  value={ currentSample ? currentSample.ID : "?" }
                  onChange={ this.handleSampleSelect }>
            <option value="?" label=""/>
                  { options }
          </select>
        </div>
      </div>
    )
  }

  //

  handleTimeframeChange = (select) => {
    if (!/([0-9:])/.test(_.last(select.value || select))) return
    let lastTimeframe = this.props.Backtester.strategy.globalSettings.Settings.DefaultTimeframe
    let newTimeFrame = lastTimeframe
    if (typeof select == 'string' && select.length <= 8) {
      // if deleting a character
      if (select.length == lastTimeframe.length - 1) {
        newTimeFrame = select
      }
      else if ('11:11:11'.startsWith(select.replace(/[0-9]/g, '1'))) {
        newTimeFrame = (_.includes([2, 5], select.length) ? (select + ':') : select )
      }
    }
    else if (typeof select == 'object') {
      newTimeFrame = select.value
    }
    StrategyFn.setTimeframe({ value: newTimeFrame })
  }

  timeframe () {
    let timeframe =
      this.props.Backtester.strategy.globalSettings.Settings.DefaultTimeframe

    return (
      <div className="selectionmenu">
        <div className="row">
          <div className="col-md-12" style={{ marginBottom: 15 }}>
            <span className="setting-title">Timeframe</span>
          </div>

          <div className="col-md-12">
            <Combobox
              valueField="id"
              textField="text"
              value={ timeframe }
              onChange={ this.handleTimeframeChange }
              data={[
                { id: 0, value: '00:00:01', text: '1 second' },
                { id: 1, value: '00:01:00', text: '1 minute' },
                { id: 2, value: "00:05:00", text: "5 minutes" },
                { id: 3, value: "00:15:00", text: "15 minutes" },
                { id: 4, value: "01:00:00", text: "1 hour" },
                { id: 5, value: "12:00:00", text: "12 hours" },
                { id: 6, value: "24:00:00", text: "24 hours" }
              ]}/>
          </div>

        </div>
      </div>
    )
  }

  render () {
    let { globalSettings } = this.props.Backtester.strategy

    return (
      <div className="templatesetting">
        <div className="headertext">
          <span>Global Settings</span>
        </div>

        <div className="parameters-holder">
             { this.assetTypes() }
             { this.symbols() }
             { this.samples() }
             { this.timeframe() }
               <AdvancedSettings Settings={globalSettings.Settings}/>
        </div>
      </div>
    )
  }

}

class ParameterModal extends Component {
  state = {
    modalOpen: false
  }

  closeModal = () => {
    this.setState({
      modalOpen: false
    })
  }

  openModal = () => {
    this.setState({
      modalOpen: true
    })
  }

  render = () => (
    <div>
      <a onClick={ this.openModal }>
        <i className="fa fa-info-circle pull-right"/>
      </a>

      <Modal
        isOpen={ this.state.modalOpen }
        onRequestClose={ this.closeModal }
        style={{ width: 600 }}
      >
        <div ref="modalBody" className="QModal">

          <h4 className="pull-left"
              style={{ fontSize: 16, margin: '40px 0 20px 40px' }}>
            Parameter: {this.props.parameter.Name}
          </h4>

          <div className="row">
            <div className="col-md-12" style={{ padding: '0 40px 0 40px' }}>
              <p style={{ textAlign: 'justify' }}>
                 {this.props.parameter.Comment}
              </p>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-danger" onClick={ this.closeModal } data-dismiss="modal">Close</button>
          </div>
        </div>
      </Modal>
    </div>
  )

}

@connect(state => ({

  activeTemplatId: state.Backtester.activeTemplateId,
  rightSidebarView: state.Backtester.ui.rightSidebarView

}))
class TemplateSettings extends Component {
  toGlobalSettings () {
    BacktesterState({
      ui: { rightSidebarView: "globalSettings" }
    })
  }

  mapParameters (parameters) {
    return parameters.map(parameter => {
      let values = _.range(
        parameter.Min,
        (parameter.Max + parameter.Inc),
        parameter.Inc
      )

      return (
        <div key={_.uniqueId()}>
          <div className="row">
            <span className="setting-title">{ parameter.Name }</span>
            <ParameterModal parameter={ parameter }/>
          </div>
          <div className="select">
            <Combobox
              data={values}
              defaultValue={parameter.Value}
              onChange={value => {
                StrategyFn.updateParameter({
                  fileName: parameter.codeFile.Name,
                  parameterName: parameter.Name,
                  value
                })
              }}/>
          </div>
        </div>
      )

    })
  }

  render () {
    let activeTemplate = Utils.activeTemplate()

    if (!activeTemplate) return <div/>

    let parameters = activeTemplate.CodeFiles.reduce(
      (parameters, codeFile) => {
        // adds 'codeFile' object to parameter properties. Later on
        // StrategyFn({ fileName, parameterName, value }) can be called
        let modelledParameters = codeFile.Parameters.map(
          parameter => Object.deepExtend(parameter, { codeFile }))

        return parameters.concat(modelledParameters)
      }
      , [])

    let content = ( parameters.length > 0
      ? this.mapParameters(parameters)
      : <div className="text-center vertical-align">No parameters detected</div> )

    return (
      <div className="templatesetting">
        <div className="headertext">
          <span>Template Settings</span>
        </div>

        <div className="selectionmenu">
          <div className="setting-title-top">
            <div>
              { activeTemplate.Name }
            </div>
            <div onClick={ this.toGlobalSettings }>
              <i className="fa fa-times"/>
            </div>
          </div>

          <div className="parameters-holder">
               { content }
          </div>
        </div>
      </div>
    )
  }

}

@connect(state => ({

  rightSidebarView: state.Backtester.ui.rightSidebarView,
  activeTemplateId: state.Backtester.activeTemplateId

}))
export class RightContainer extends Component {
  render () {
    let { props } = this

    return (
      <div className="box-lrmenu round-right pull-right">
           {
             props.rightSidebarView == 'templateSettings'
             && props.activeTemplateId != null
               ? <TemplateSettings/>
               : <GlobalSettings/>
           }
      </div>
    )
  }
}
