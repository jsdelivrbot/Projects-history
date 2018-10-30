import React from 'react'
import Radium, {keyframes} from 'radium'
import _ from 'lodash'
import {Fonts, Colors} from '../../Utils/GlobalStyles.jsx'
import {Table, NoAvailable} from './Table/Table.jsx'
import {valuesOrdered} from '../../../Functions/Utils/Utils.jsx'
import {connect} from '../../../State.jsx'
import Functions from '../../../Functions/Functions.jsx'
import Utils from '../../../Functions/Utils/Utils'
import Shared from './Shared.jsx'
import DeleteModal from '../../DeleteModal/DeleteModal.jsx'

let ButtonStyle = {
  cursor: 'pointer',
  userSelect: 'none',
  display: 'inline-block',
  fontFamily: Fonts.openSans,
  fontSize: 12,
  padding: '0 10px',
  margin: '0 5px 5px 0',
  color: Colors.white,
  textAlign: 'center',
  lineHeight: '30px',
  letterSpacing: 0.5,
  height: 30,
  borderRadius: 3,
  fontWeight: 600,
  boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)',
}

let ButtonTypes = {
  dark: {
    backgroundColor: Colors.primaryLight,
    border: 'solid 1px '.concat(Colors.primary)
  },
  light: {
    backgroundColor: Colors.guava,
    border: 'solid 1px #c83948'
  }
}

let fades = {
  'positive': keyframes({
    '0%': { background: 'transparent' },
    '25%': { background: 'rgba(160, 211, 104, 0.8)' },
    '75%': { background: 'rgba(160, 211, 104, 0.8)' },
    '100%': { background: 'transparent' },
  }, 'fadepositive'),
  'negative': keyframes({
    '0%': { background: 'transparent' },
    '25%': { background: 'rgba(241, 90, 107, 0.8)' },
    '75%': { background: 'rgba(241, 90, 107, 0.8)' },
    '100%': { background: 'transparent' },
  }, 'fadenegative'),
  'neutral': ''
}

@Radium
class Button extends React.Component {
  render () {
    let { title, type } = this.props
    let props = _.omit(this.props, ['title', 'type'])

    return (
      <button style={[ButtonStyle, ButtonTypes[type]]} { ...props }>
              { title }
      </button>)
  }
}

@connect(state => ({
  agents: state.livetrading.management.commands.agents
}))
class AgentCommands extends React.Component {
  state = {
    downloadLog(){},
    command(){},
    modalOpen: false
  }

  openModal = () => this.setState({
    modalOpen: true
  })

  closeModal = () => this.setState({
    modalOpen: false
  })

  constructor (props) {
    super()

    let agent = (props || this.props).agent

    // setting functions in constructor for performance,
    // not having to create them on every render

    this.state.downloadLog = () =>
      Functions.LiveTrading.Management.Agent.downloadLog(agent)

    this.state.command = (command) =>
      Functions.LiveTrading.Management.command({
        type: 'agents',
        agent: agent,
        command: command,
        data: {
          PortfolioID: agent.PortfolioID
        }
      })

    this.deleteDescription = `You are about to delete agent '${agent.Name}'. Deleting an agent will not automatically close all its positions and cancel all its pending orders. You will have to do this manually at your broker!`
  }

  render () {
    let { agent, agents } = this.props

    // { agents } = state.livetrading.management.commands
    let { _start, _stop, _flatten, _delete, _download } =
      Utils.toMap(_.get(agents, Utils.UID.agent(agent), []), _.identity)

    return (
      <div>
        <DeleteModal
          modalProps={{
            onRequestClose: this.closeModal,
            isOpen: this.state.modalOpen
          }}
          callback={ () => {
            this.state.command('delete')
            this.closeModal()
          }}
          title="Delete Agent"
          description={ this.deleteDescription }/>
        {
          agent.IsRunning
            ? <Button
            type="dark"
            title={ !!_stop ? "STOPPING" : 'STOP' }
            onClick={ () => this.state.command('stop') }
            disabled={ !!_stop }/>
            : <Button
            type="dark"
            title={ !!_start ? "STARTING" : 'START' }
            onClick={ () => this.state.command('start') }
            disabled={ !!_start }/>
        }
        <Button
          title={ !!_delete ? "DELETING" : "DELETE" }
          type="light"
          disabled={ !!_delete }
          onClick={ this.openModal }/>
        <Button
          title={ !!_download ? "DOWNLOADING LOG" : "DOWNLOAD LOG" }
          type="dark"
          disabled={ !!_download }
          onClick={ this.state.downloadLog }/>
      </div>
    )
  }
}

@Radium
export class TradingAgentsTable extends React.Component {
  headers = [
    "AGENT",
    "TEMPLATES",
    "STARTED",
    "RUNNING",
    "STATE",
    "SYMBOL",
    "TIMEFRAME",
    "ROI",
    ""
  ]

  keys = [
    'Name',
    'Templates',
    'StartedDTUTC',
    'IsRunning',
    'CurrentState',
    'Symbol',
    'Timeframe',
    'ROI'
  ]

  transform = (value, key, item) => {
    if (_.isBoolean(value)) {
      value = value ? "YES" : "NO"
    }
    // date string
    else if (_.endsWith(key, 'DTUTC')) {
      value = Utils.formatDay(value)
    }
    // ROI percentage
    else if (key == 'ROI') {
      value = (value * 100).toFixed(2) + ' %'
    }

    let portfolioAgent = Utils._try(() =>
      this.props.portfolioAgents[Utils.UID.agent(item)], {})

    let templateItems = Utils._try(() =>
      portfolioAgent.templateItems, null)

    // match key, used below at return
    let match = {
      'Templates': (
        <div>
          { templateItems || 'Loading...' }
        </div>
      ),
      'Symbol': Utils._try(() =>
        portfolioAgent.Symbol, 'Loading...'),
      'Timeframe': Utils._try(() =>
        Utils.secondsToTimestamp(portfolioAgent.Timeframe), 'Loading...')
    }

    // normal string
    return Shared.cell((match[key] || value), item, key)
  }

  cellClass = _.uniqueId('_')

  cellTransform = (cell, item, items) => {
    let change = _.get(items[0].props.item,
      `changes[${item.key}]`, false)

    if (change) {
      return cell({
        className: this.cellClass + change,
        style: {
          animation: 'fadeGreen 2s',
          animationName: fades[change]
        }
      })
    }

    return cell()
  }

  render () {
    let { headers, props, keys, transform, cellTransform } = this

    // if no agents available
    if (!_.size(props.agents)) {
      return <NoAvailable text="NO AGENTS AVAILABLE"/>
    }

    let _rows = valuesOrdered(keys, props.agents, transform)

    // add command buttons to the end of each row
    let rows = _rows.map((row, key) =>
      row.concat(<AgentCommands key={props.agents[key].AgentID} agent={ props.agents[key] }/>))

    return <Table
      {...{ headers, rows }}
      dontRowClick="last"
      cellTransform={ cellTransform }/>
  }
}
