import _ from 'lodash'
import Interface from './Interface.jsx'

// Pusher instance (activated with appKey and auth endpoint)
// QuickStart: https://pusher.com/docs/javascript_quick_start#/lang=cs-mvc
// Auth: https://pusher.com/docs/authenticating_users#/lang=cs-mvc
import {pusher, resetPusher} from '../Networking/Pusher.jsx'

// subscribed channels
// {
//   [channelID] = {
//     instance: Channel,
//     handler: Function
//   }
// }
let channels = {}

export let Pusher = {
  error (message) {
    Interface.interfaceError("Pusher", message)
  },

  unsubscribedError (message, channel) {
    Pusher.error(message + ` to Channel ${ channel }, which is not subscribed to`)
  },

  channelIsSubscribed (channelName) {
    return (!!channels[channelName])
  },

  // subscriptions = [[ channelName: string, handler: Function ]]
  // https://pusher.com/docs/client_api_guide/client_channels
  subscribe (subscriptions) {
    _.forEach(subscriptions, ([ channel, handler ]) => {
      console.log('subscription, channel: ', channel)

      if (Pusher.channelIsSubscribed(channel)) {
        Pusher.error(`Channel ${ channel } is already subscribed to`)
        return onError()
      }

      channels[channel] = { instance: pusher.subscribe(channel), handler }
      channels[channel].instance.bind_all(Interface.handler(handler))
    })
  },

  // unsubscribe = [channel names]
  unsubscribe (unsubscribe) {
    unsubscribe.forEach((channelName) => {
      if (!Pusher.channelIsSubscribed(channelName)) {
        return Pusher.unsubscribedError(`Trying to unsubscribe`, channelName)
      }
      // channels[channelName].instance.unbind_all()
      pusher.unsubscribe(channelName)
    })
  },

  unsubscribeAll () {
    Pusher.unsubscribe(Object.keys(channels))
  },

  // send event to channel
  // https://pusher.com/docs/client_api_guide/client_events
  // channelEvents = { [channel]: [[ name: string, data: {} ]] }
  event (channelEvents) {
    _.forEach(channelEvents, (events, channel) => {
      // console.log('Pusher: sending events ', channel, events)
      if (!Pusher.channelIsSubscribed(channel)) {
        return Pusher.unsubscribedError('Trying to send event', channel)
      }
      events.forEach(([ name, data ]) =>
        console.log(channels[channel].instance.trigger('client-' + name, data))
      )
    })
  },

  cutChannels () {
    let _channels = channels
    channels = {}
    return _channels
  },

  reset () {
    Pusher.unsubscribeAll()
    resetPusher()
    let channels = _.reduce(Pusher.cutChannels(),
      (result, {handler}, channel) => result.concat([[ channel, handler ]]), [])
    Pusher.subscribe(channels)
  }
}
