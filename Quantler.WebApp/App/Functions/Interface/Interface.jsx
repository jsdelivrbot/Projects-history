import {State} from '../../State.jsx'
import _ from 'lodash'
import {Pusher} from './Pusher.jsx'

let Interface = {
  interfaceError (type, message)
  {
    window.console.error(`Interface ${ type } Error: ${ message }`)
  },

  //
  // applies state updates.
  // when `stateValue` is an array the
  // values are merged and set to state.
  //
  // stateValue = {} | Array <{}>
  //
  state (stateValue)
  {
    if (Array.isArray(stateValue)) {
      //
      // e.g:
      //   [{ a : 1, b : 2 }, { a : 2 }]
      //   -> { a : 2, b : 2 }
      //
      State.set(
        stateValue.reduce((reduced, value) =>
          Object.deepExtend(reduced, value), {}))
    }
    else {
      State.set(stateValue)
    }
  },

  //
  // executes async requests
  // and runs passed callback
  //
  ajax (requests)
  {
    requests.forEach(request => {
      try {
        // [[
        //     [ asyncRequest, data1 ],
        //     [ asyncRequest, data2 ],
        // ], callback ]]
        if (Array.isArray(request[0])) {
          let asyncRequests = request[0]
          let callback = Interface.handler(request[1])
          let ajaxReturns = []

          let resolve = key => value => {
            ajaxReturns[key] = value

            if (_.size(ajaxReturns) == asyncRequests.length) {
              callback(ajaxReturns)
            }
          }

          // [[ request, data ], [ request2, data2 ]] ...
          asyncRequests.forEach((ajaxRequest, key) =>
            ajaxRequest[0](ajaxRequest[1])
              .then(resolve(key), callback))
        }
        // [[ asyncRequest, data, callback ]]
        else {
          let callback = []
          if (_.isPlainObject(request[2])) {
            callback.push(Interface.handler(request[2].success),
              Interface.handler(request[2].error))
          } else {
            let handled = Interface.handler(request[2])
            callback.push(handled, handled)
          }
          let _request = request[0](request[1])
          _request.then.apply(_request, callback)
        }
      }
      catch (e) {
        Interface.interfaceError('Ajax', request)
        throw e
      }
    })
  },

  //
  // loads a url in current or new window.
  // useful for doing other side effects
  // before loading a page.
  // e.g: updating state, then loading page
  //      which is the case in the accounts
  //      page where an async call needs to
  //      be done to upgrade the user before
  //      loading the next page.
  //
  // url : string | { ["self" | "blank"] : string }
  //
  location (url)
  {
    //
    // e.g: { location : "accounts/" }
    //
    if (_.isString(url)) {
      window.location.replace('#' + url)
    }
    //
    // e.g:
    //   { location : { blank : "http://google.com" } }
    //
    else {
      _.forEach(url, (value, option) => {
        switch (option) {
          case "_blank":
            window.open(value)
            break
          case "_self":
            window.location.replace('#' + url)
            break
        }
      })
    }
  },

  //
  // execute functions which will
  // be handled by the Interface
  //
  do (functions)
  {
    functions.forEach(_function =>
      Interface.handler(_function[0])(_function[1]))
  },

  //
  // see ./Pusher.jsx for action types
  //
  pusher (actions)
  {
    _.map(actions, (value, key) => {
      try {
        Pusher[key](value)
      }
      catch (error) {
        if (!Pusher[key]) {
          Interface.interfaceError('Pusher', `Action ${ key } does not exist`)
        } else {
          Interface.interfaceError('Pusher', error)
        }
      }
    })
  },

  notification (notifications)
  {
    notifications.forEach(({ type, message }) => {
      window.toastr[type](message)
    })
  },

  //
  // wraps functions and executes their
  // returned value in the Interfaces.
  // used in ../Functions/Functions.jsx
  //
  handler (handlerFunction)
  {
    return (...props) => {
      let params = [].concat(props, State.get())
      let result

      try {
        result = handlerFunction.apply(null, params)
      } catch (error) {
        window.console.warn('\nInterface handler error')
        window.console.log(`func: ${ handlerFunction.name }`)
        window.console.log('params: ', params)
        window.console.log(handlerFunction.toString())
        window.console.log('\n')
        throw error
      }

      Object
        .keys(result)
        .forEach(key =>
        Interface[key] && Interface[key](result[key]))
    }
  }
}

export default Interface
