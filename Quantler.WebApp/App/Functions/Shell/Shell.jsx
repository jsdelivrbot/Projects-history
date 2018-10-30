import {API as QAPI} from '../Networking/API/Main.jsx'
import * as API from '../Networking/API/API.jsx'
import {Management} from '../LiveTrading/Management.jsx'
import {Backtester} from '../Backtester/Backtester.jsx'

export let Shell = {

  load (params, { User }) {
    return {
      pusher: {
        subscribe: [[
          'presence-' + User.details.ChannelID.toUpperCase(),
          Shell.Events.handler
        ]]
      }
    }
  },

  unload ({ details }) {
    return {
      pusher: {
        unsubscribe: ['presence-' + details.ChannelID.toUpperCase()]
      }
    }
  },

  Events: {

    handler (eventName, data, state) {
      /*if (eventName=='ChartUpdate'){
        window.console.log('Pusher Event:')
        window.console.log(`Name: ${ eventName }`)
        window.console.log(`Data: `, data)
      }*/


      let eventHandlers = {
        ...Backtester.Events,
        ...Shell.Events,
        ...Management.Events
      }

      try {
        if (eventHandlers[eventName]) {
          return eventHandlers[eventName](data, state)
        } else {
          window.console.error('Pusher: Event does not have a handler: ', eventName, data)
        }
      } catch (error) {
        window.console.error('Pusher: Event error: ', eventName, data, error)
      }

      return {}
    },

    // START: presence channel events
    // https://pusher.com/docs/client_api_guide/client_presence_channels

    // received after pusher connects to channel
    'pusher:subscription_succeeded' (data, state)
    {
      return {}
    },

    'pusher:subscription_error' (error)
    {
      window.console.log(error)
      return {}
    },

    'pusher:subscription_ended' (data, state)
    {
      return {}
    },

    'pusher:member_added' ()
    {
      return {}
    },

    'pusher:member_removed' ()
    {
      return {}
    },

    brokerloginok (_content) {
      let content = (_content == "True" ? true : false)
      return {
        state: {
          livetrading: {
            accounts: {
              login: { brokerloginok: content }
            }
          }
        }
      }
    },

    brokerlogin (content, { livetrading }) {
      let { brokerlogin } = livetrading.accounts.login
      return {
        state: {
          livetrading: {
            accounts: {
              login: {
                brokerlogin: brokerlogin.concat(content)
              }
            }
          }
        }
      }
    }
    // END: presence channel events
  },

  hitFeature (featureName) {
    return {
      ajax: [[
        () => QAPI.get('Feature?Name=' + featureName),
        {}, () => ({})
      ]]
    }
  }
}
