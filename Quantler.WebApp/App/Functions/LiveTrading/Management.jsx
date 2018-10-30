import * as API from '../Networking/API/API.jsx'
import _        from 'lodash'
import moment   from 'moment'
import Utils from '../Utils/Utils.jsx'
import AjaxErrors from '../Utils/AjaxErrors.jsx'
import {TemplateTooltip} from '../../Components/Template/TemplateTooltip.jsx'

function startLiveTradingState (processing = false, messages = []) {
  return {
    Backtester: {
      startLiveTrading: {
        processing,
        messages
      }
    }
  }
}

function startLiveTradingError (value) {
  let message = {
    type: 'error',
    message: value
  }
  return { state: startLiveTradingState(false, [message]) }
}

// TODO: check if selected account still exists

export let Management = {
  load ({ User, livetrading }) {
    // check for account updates
    return {
      ...Management.state({
        loadingPortfolio: true
      }),
      ajax: [
        [API.LiveTrading.Management.portfolioUpdates, {},
          Management.Account._accountUpdates({ unlock: false })],
        [API.LiveTrading.Management.getPortfolio, {},
          Management.Account._getPortfolio]]
    }
  },

  state (management) {
    return { state: { livetrading: { management } } }
  },

  accountCommands ({ livetrading }, AccountID) {
    return _.get(livetrading,
      'management.commands.accounts[' + AccountID + ']', [])
  },

  /**
   * used for filtering positions, orders and pendingOrders.
   * checks if selectedAccount is set and filters the data, or it
   * sets all the data which will be shown in the view components.
   *
   * @param {string} propertyName - property in state, eg: positions
   * @param {Array} values - data values received from channel event
   * @param {string} selectedAccount - from state.livetrading.management
   * @returns {Object} - object used for state update
   */
  filterView (propertyName, values, selectedAccount, selector) {
    if (!selectedAccount.AccountID) return { [propertyName]: values }
    // selector is because some objects have
    // account id defined as DefaultAccountID
    return {
      [propertyName]: values.filter(value =>
        value[selector || 'AccountID'] == selectedAccount.AccountID &&
        value.PortfolioID == selectedAccount.PortfolioID)
    }
  },

  // Array<any> -> Object<string, any>
  toMap (values = [], idFunction) {
    if (values.length == 0) return {}
    let result = {}
    for (let value of values) result[idFunction(value)] = value
    return result
  },

  // used in Events functions below, to
  // calculate value changes (positive/negative).
  mapWithNeutral (values) {
    let result = {}
    for (let value of values) result[value] = 'neutral'
    return result
  },

  /**
   * sends a command event to channel
   *
   * @param {string} type - 'accounts' | 'agents'
   * @param {string} agent - account/agent id
   * @param {string} command - event command, e.g: 'Stop'
   * @param {*} [data] - any event data
   * @param {Object} [livetrading]
   * @returns {Object}
   * @constructor
   */
  command ({ type, agent, command, data }, { User, livetrading }) {
    let { commands } = livetrading.management

    let channel = 'presence-' + User.details.ChannelID.toUpperCase()

    let eventData = {
      AgentID: agent.ID,
      Command: command,
      PortfolioID: data.PortfolioID
    }

    let agentUID = Utils.UID.agent(agent)
    let agentCommands = _.get(commands[type], agentUID, []).concat('_' + command)

    let updatedCommands = {
      agents: Object.deepExtend(commands.agents, { [agentUID]: agentCommands })
    }

    window.console.log('agent commands')
    window.console.log(agentCommands)

    return {
      ...Management.state({ commands: updatedCommands }),
      pusher: {
        event: {
          [channel]: [['Command', eventData]]
        }
      }
    }
  },

  // used in Events
  checkChanges (newData, currentData) {
    for (let key in newData.changes) {
      if (newData[key] > currentData[key]) {
        newData.changes[key] = 'positive'
      } else if (newData[key] < currentData[key]) {
        newData.changes[key] = 'negative'
      }
    }
  },

  Events: {
    AddAccountOK (status, state) {
      if (status === "False") {
        return {
          state: startLiveTradingState(true, [{
            type: 'error',
            message: 'Error adding agent'
          }])
        }
      }
      return {
        state: startLiveTradingState(),
        location: '/management'
      }
    },

    // AddAccountProgress = { AgentName: string, start: boolean, message: string }
    AddAccount (AddAccountProgress, { Backtester }) {
      console.log('\n\nAddAccount Event', AddAccountProgress)
      return {
        state: startLiveTradingState(true, [{
          type: 'info',
          message: AddAccountProgress.Message
        }])
      }
    },

    Account ({ PortfolioID, Value: accounts }, { livetrading }) {
      let currentAccounts = livetrading.management.accounts[PortfolioID]
      let currentAccountsMap = Management.toMap(currentAccounts, Utils.UID.account)
      accounts.forEach(newAccount => {
        newAccount.ROI = (((newAccount.Equity / newAccount.Balance) - 1) * 100).toFixed(2)
        newAccount.changes = Management.mapWithNeutral(['Balance', 'Equity', 'UnrealizedPnL', 'ROI'])
        let currentAccount = currentAccountsMap[Utils.UID.account(newAccount)]
        if (!currentAccount) return
        Management.checkChanges(newAccount, currentAccount)
      })
      let updatedAccounts = livetrading.management.accounts
      updatedAccounts[PortfolioID] = accounts
      let view = { accounts: _.flatten(_.toArray(updatedAccounts)) }
      return { ...Management.state({ accounts: updatedAccounts, view }) }
    },

    AddAgent (result) {
      let message = result.Result || ('Added Agent: ' + result.AgentName)
      return {
        notification: [{
          type: 'success',
          message
        }]
      }
    },

    Agent ({ PortfolioID, Value: newAgents }, { livetrading }) {
      let { selectedAccount, agents } = livetrading.management
      let currentAgentsMap = Management.toMap(agents[PortfolioID], Utils.UID.agent)
      newAgents.forEach(agent => {
        agent.changes = Management.mapWithNeutral(['ROI'])
        let currentAgent = currentAgentsMap[Utils.UID.agent(agent)]
        if (!currentAgent) return
        Management.checkChanges(agent, currentAgent)
      })
      agents[PortfolioID] = newAgents
      let viewAgents = _.flatten(_.toArray(agents))
      let filter = ['agents', viewAgents, selectedAccount, 'DefaultAccountID']
      let view = Management.filterView(...filter)
      return { ...Management.state({ agents, view }) }
    },

    ChartUpdate ({ PortfolioID, Value: ChartInfo }, { livetrading }) {
      let { charts } = livetrading.management
      ChartInfo.reverse()
      ChartInfo.forEach(Chart => {
        let UID = Utils.UID.chart(Chart)
        let chart = charts[UID]
        let newChart = (!chart ? Chart : Object.deepExtend(chart, Chart))
        let _value = (Array.isArray(Chart.Value) ? Chart.Value[0][1] : Chart.Value)
        let value = [[moment.utc(Chart.DataPointDTUTC).unix(), _.round(_value, 5)]]
        let data = (!chart) ? [].concat(value) : chart.Value.concat(value)

        var newData = {}
        var newArray = []
        for (var i = 0; i < data.length; i++) {
          newData[data[i][0]] = data[i][1]
        }
        for (var key in newData) {
          newArray.push([key, newData[key]])
        }
        newChart.Value = newArray
        charts[UID] = newChart
      })
      console.log(charts)

      return {
        ...Management.state({
          charts,
          timestamps: { charts: +new Date }
        })
      }
    },

    Command (result, { livetrading }) {
      window.console.log('Event: Command ', result)
      let { commands } = livetrading.management
      let agentUID = Utils.UID.agent(result)
      commands.agents[agentUID] =
        commands.agents[agentUID].filter(command =>
        command !== ('_' + result.Command))
      return {
        ...Management.state({ commands }),
        notification: [{
          type: result.ResultOK ? 'success' : 'error',
          message: result.Result
        }]
      }
    },

    OrderUpdate ({ PortfolioID, Value: OrderInfo }, { livetrading }) {
      let { orders, selectedAccount } = livetrading.management
      orders[PortfolioID] = (orders[PortfolioID] || []).concat(OrderInfo)
      let viewUpdate = _.flatten(_.toArray(orders))
      let view = Management.filterView('orders', viewUpdate, selectedAccount)
      return { ...Management.state({ orders, view }) }
    },

    PendingOrder ({ PortfolioID, Value: newOrders }, { livetrading }) {
      let { selectedAccount, pendingOrders } = livetrading.management
      let pendingOrdersMap = Management.toMap(pendingOrders[PortfolioID], Utils.UID.pendingOrder)
      newOrders.forEach(newPendingOrder => {
        newPendingOrder.changes = Management.mapWithNeutral(['Distance'])
        let currentPendingOrder = pendingOrdersMap[Utils.UID.pendingOrder(newPendingOrder)]
        if (!currentPendingOrder) return
        Management.checkChanges(newPendingOrder, currentPendingOrder)
      })
      pendingOrders[PortfolioID] = newOrders
      let viewPendingOrders = _.flatten(_.toArray(pendingOrders))
      let view = Management.filterView('pendingOrders', viewPendingOrders, selectedAccount)
      return { ...Management.state({ pendingOrders, view }) }
    },

    Position ({ PortfolioID, Value: newPositions }, { livetrading }) {
      let { selectedAccount, positions } = livetrading.management
      let positionsMap = Management.toMap(positions[PortfolioID], Utils.UID.position)
      newPositions.forEach(newPosition => {
        newPosition.changes = Management.mapWithNeutral(['UnrealizedPnL'])
        let position = positionsMap[Utils.UID.position(newPosition)]
        if (!position) return
        Management.checkChanges(newPosition, position)
      })
      positions[PortfolioID] = newPositions
      let viewPositions = _.flatten(_.toArray(positions))
      let view = Management.filterView('positions', viewPositions, selectedAccount)
      return { ...Management.state({ positions, view }) }
    },
  },

  Account: {
    /**
     * formats the data correctly for state
     * accountUpdates: { [AccountID]: PortfolioUpdate }
     * it's this way for faster access in rendering,
     * checking if the account has an available update
     */
    accountUpdateReduce (result, update) {
      return { ...result, [update.PortfolioID]: update }
    },

    _accountUpdates ({ unlock }) {
      //
      // see Management.Account.update()
      // for explanation about "unlock"
      return {
        success (updates, status, xhr, { livetrading }) {
          let accountUpdating = (unlock
            ? ''
            : livetrading.management.accountUpdating)

          return {
            ...Management.state({
              accountUpdating,
              accountUpdates: updates.reduce(
                Management.Account.accountUpdateReduce, {})
            })
          }
        },
        error: AjaxErrors.handler({
          message: 'Error fetching account updates'
        })
      }
    },

    /**
     * send request to delete account
     * @param {string} PortfolioID
     * @param {Object} [livetrading]
     * @returns {Object}
     */
    delete ({ PortfolioID, AccountID }, { livetrading }) {
      let accountCommands = _.get(livetrading,
        'management.commands.accounts[' + AccountID + ']', [])

      return {
        ...Management.state({
          commands: {
            accounts: {
              [AccountID]: accountCommands.concat('DELETE')
            }
          }
        }),
        ajax: [[
          API.LiveTrading.Management.deleteAccount,
          PortfolioID, Management.Account._delete.success(AccountID)
        ]]
      }
    },

    _delete: {
      success (AccountID) {
        return (response, xhr, status, state) => {
          window.console.log('\nDELETE ACCOUNT RESPONSE')
          window.console.log(response)

          let accountCommands = Management
            .accountCommands(state, AccountID)
            .filter((command) => command !== 'DELETE')

          return {
            ...Management.state({
              commands: {
                accounts: {
                  [AccountID]: accountCommands
                }
              }
            })
          }
        }
      },
      error: AjaxErrors.handler({
        message: 'Error deleting account'
      })
    },

    _getPortfolio: {
      success (portfolios, status, xhr) {
        window.console.log(xhr)
        portfolios.Agents = {}
        portfolios.forEach((portfolio) => {
          portfolio.Agents.forEach((agent) => {
            agent.PortfolioID = portfolio.PortfolioID
            let key = Utils.UID.agent(agent)
            agent.templateItems = agent.Templates.map((template, index) => {
              return <TemplateTooltip
                key={ key + ':' + index }
                name={ template.Name }
                type={ template.Type }
                hoverMessage={ Utils.templateTooltipText(template) }/>
            })
            portfolios.Agents[key] = agent
          })
        })
        return {
          ...Management.state({
            portfolio: portfolios,
            loadingPortfolio: false
          })
        }
      },
      error: AjaxErrors.handler({
        message: 'Error fetching portfolio'
      })
    },

    /**
     * select account and filter data.
     * if account is already selected it will
     * clear state and un-filter the data
     * (show all in view components)
     * @param {{ PortfolioID: *, AccountID: * }} props
     */
    select (props, { livetrading }) {
      let { selectedAccount } = livetrading.management

      // if (account already selected) un-filter view
      if (_.isEqual(selectedAccount, props)) {
        let picks = _.pick(livetrading.management, ['agents', 'positions', 'orders', 'pendingOrders'])
        let view = _.reduce(picks, (result, value, key) => ({
          ...result, [key]: _.flatten(_.toArray(value))
        }), {})

        // un-select account by setting `selectedAccount` to []
        return { ...Management.state({ selectedAccount: [], view }) }
      }

      // get from state and filter to only the ones from the selected account
      let filter = value => (value.AccountID == props.AccountID || value.DefaultAccountID == props.AccountID)

      let picks = _.pick(livetrading.management, ['agents', 'positions', 'orders', 'pendingOrders'])

      let reduce = _.reduce(picks,
        (result, values) => {
          return Utils._try(result.concat([[]]), () =>
            result.concat([values[props.PortfolioID].filter(filter)]))
        }, [])

      // window.console.log(JSON.stringify(reduce, null, 2))

      let [ agents, positions, orders, pendingOrders ] = reduce

      return {
        ...Management.state({
          selectedAccount: props,
          view: { agents, positions, orders, pendingOrders }
        })
      }
    },

    //
    // when an account update occurs it sets
    // `accountUpdating` to the account id, that
    // "locks" the others account preventing them
    // from updating at the same time. then _update()
    // callback fetches the account updates again
    // and "unlocks" the other accounts for updates.
    // e.g:
    //  the `accountUpdating` is used in:
    //    Shell/Components/LiveTrading/Management/AccountsTable.jsx
    //
    update (PortfolioID) {
      return {
        ...Management.state({
          accountUpdating: PortfolioID
        }),
        ajax: [[
          API.LiveTrading.Management.updatePortfolio,
          PortfolioID, Management.Account._update
        ]]
      }
    },

    _update: {
      success (response) {
        return {
          notification: [{
            type: 'success',
            message: 'Account updated successfully'
          }],
          ajax: [[
            API.LiveTrading.Management.portfolioUpdates, {},
            Management.Account._accountUpdates({ unlock: true })
          ]]
        }
      },
      error: AjaxErrors.handler({
        message: 'Error updating account'
      })
    }
  },

  Agent: {
    checkAgent ({ Backtester }) {
      let { AccountID, AgentName, Start } = Backtester.startLiveTrading.value

      if (!AccountID || !AgentName) return {}

      let agent = {
        AgentID: Backtester.backtest.currentTest.id,
        AccountID: Number(AccountID),
        AgentName,
        Start,
        PortfolioID: Number(AccountID)
      }

      window.console.log('\nCHECK AGENT')
      window.console.dir(agent)
      window.console.log('\n')

      return {
        state: {
          Backtester: {
            startLiveTrading: {
              messages: [{ type: 'info', message: 'Checking Agent...' }],
              processing: true
            }
          }
        },
        ajax: [[
          API.LiveTrading.Management.checkAgent,
          agent, Management.Agent._checkAgent(agent)
        ]]
      }
    },

    _checkAgent(agent) {
      return {
        success (result, status, xhr) {
          if (result.ResultOK === false) return startLiveTradingError(result.Result)
          window.console.log('\nCHECK AGENT RESPONSE\n')
          Utils.outputResponse(result, xhr, status)
          window.console.log('\nADDING AGENT\n')
          window.console.dir(agent)
          return {
            state: {
              Backtester: {
                startLiveTrading: {
                  messages: [{ type: 'info', message: 'Adding Agent...' }]
                }
              }
            },
            ajax: [[
              API.LiveTrading.Management.addAgent,
              agent, Management.Agent._add
            ]]
          }
        },
        error: AjaxErrors.handler({
          message: 'Error verifying backtest',
          then () {
            return startLiveTradingError('System error, please try again later')
          }
        })
      }
    },

    _add: {
      success (result, status, xhr) {
        // check if events start right away or if channel needs subscription ....
        Utils.outputResponse(result, xhr, status, 'ADD AGENT RESPONSE')
        if (result.ResultOK === false) return startLiveTradingError(result.Result)
        let _return = { state: startLiveTradingState(false) }
        return (result.IsNewAccount === true ? _return : { ..._return, location: 'management'} )
      },
      error: AjaxErrors.handler({
        message: 'Error adding agent',
        then () {
          return startLiveTradingError('System error, please try again later')
        }
      })
    },

    /**
     * download agent log file. sends API request
     * for download and sets in state that a
     * request was sent for the given agentId.
     * throttled 1 second.
     * @param {string|number} agentId
     * @returns {Object}
     */
    downloadLog: _.throttle((agent, { livetrading }) => {
      let agentUID = Utils.UID.agent(agent)
      let agentCommands = _.get(livetrading.management.commands.agents, agentUID, [])
      return {
        ...Management.state({
          commands: {
            agents: {
              [agentUID]: ['DOWNLOAD'].concat(agentCommands)
            }
          }
        }),
        ajax: [[API.LiveTrading.Management.downloadLog, agent.ID,
          Management.Agent._downloadLog(agent)]]
      }
    }, 1000),

    _downloadLog (agent) {
      let agentUID = Utils.UID.agent(agent)
      return {
        success (file, status, xhr, { livetrading }) {
          //
          // file url, which will be
          // opened in a new window
          let _blank = 'data:text/json;charset=utf-8,' + encodeURIComponent(file)
          //
          // remove command from state
          let agentCommands = livetrading.management
            .commands.agents[agentUID]
            .filter(command => command != 'DOWNLOAD')
          return {
            ...Management.state({
              commands: {
                agents: { [agentUID]: agentCommands }
              }
            }),
            location: { _blank }
          }
        },
        error: AjaxErrors.handler({
          message: 'Error downloading agent log'
        })
      }
    }
  },

  Pusher: {
    command (name, data, { User }) {
      return {
        pusher: {
          event: [{
            channel: User.details.ChannelID,
            events: [[name, data]]
          }]
        }
      }
    },
  }
}
