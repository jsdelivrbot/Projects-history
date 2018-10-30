import {Marketplace} from './Marketplace/Marketplace.jsx'
import {Samples} from './Samples/Samples.jsx'
import {handler} from './Interface/Interface.jsx'
import {Algorithms} from './Algorithms/Algorithms'
import {User} from './User/User.jsx'
import {Dashboard} from './Dashboard/Dashboard.jsx'
import {LiveTrading} from './LiveTrading/LiveTrading.jsx'
import {Shell} from './Shell/Shell'
import {UI} from './UI/UI.jsx'
import _ from 'lodash'
import {Backtester} from './Backtester/Backtester.jsx'

let handlerize = object => (!_.isPlainObject(object))
  ? handler(object)
  : _.reduce(object, (functions, value, key) => ({
  ...functions, [ key ]: handlerize(value)
}), {})

export default handlerize({
  Algorithms,
  Backtester,
  Dashboard,
  LiveTrading,
  Marketplace,
  Samples,
  Shell,
  UI,
  User
})
