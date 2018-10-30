import {Component}        from 'react'
import {BacktesterObject} from './State/Backtester.jsx'
import {Templates}        from './State/Templates.jsx'
import {User}             from './State/User.jsx'
import algorithms from './State/Algorithms'
import livetrading          from './State/LiveTrading/LiveTrading.jsx'
import marketplace          from './State/Marketplace.jsx'
import samples              from './State/Samples.jsx'
import dashboard            from './State/Dashboard.jsx'
import ui                   from './State/UI.jsx'
import _                    from 'lodash'

let initialState = {
  algorithms,
  Backtester: BacktesterObject,
  Templates,
  User,
  marketplace,
  samples,
  dashboard,
  livetrading,
  ui,
}

let state = Object.deepExtend({}, initialState)

let listeners = []

function publish () {
  listeners.forEach(listener => listener[1]())
}

let stateTimeout = setTimeout(() => {}, 0)

export let State = {
  resetState()
  {
    state = Object.deepExtend({}, initialState)
  },

  replaceState (valueObject)
  {
    clearTimeout(stateTimeout)

    state = Object.deepExtend({}, valueObject)

    stateTimeout = setTimeout(publish, 50)
  },

  setState (valueObject, timeout)
  {
    clearTimeout(stateTimeout)

    state = Object.deepExtend(state, valueObject)

    stateTimeout = setTimeout(publish, timeout || 50)
  },

  getState ()
  {
    return Object.deepExtend({}, state)
  },

  get ()
  {
    return this.getState()
  },
  set (value)
  {
    return this.setState(value)
  }
}

export function connect (stateSelector, mapStateToProps = (state => state), debug) {
  return function (PassedComponent) {
    return class ConnectedComponent extends Component {
      id = _.uniqueId()
      internalState
      props

      constructor (props) {
        super(props)
        this.internalState = stateSelector(State.getState())
        this.callback = () => {
          debug && debug('before')
          this && this.setState({ '': '' }, () => debug && debug('after'))
        }
      }

      componentWillMount () {
        listeners.push([this.id, this.callback])
      }

      componentWillUnmount () {
        listeners.forEach(([id], index) => {
          if (id == this.id) {
            listeners.splice(index, 1)
            return false
          }
        })
      }

      shouldComponentUpdate (nextProps) {
        let newState = stateSelector(State.getState())
        if (!_.isEqual(this.internalState, newState) || !_.isEqual(this.props, nextProps)) {
          this.internalState = newState
          return true
        }
        else {
          return false
        }
      }

      render () {
        let props = Object.deepExtend(this.props, mapStateToProps(this.internalState))

        return <PassedComponent {...props}/>
      }
    }
  }
}

window.state = State
window.setState = function () {
  let state = prompt('input state update object: ')
  State.setState(JSON.parse(state))
}
