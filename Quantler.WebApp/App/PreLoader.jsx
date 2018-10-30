//import * as highstock     from '../Vendor/highstock'
import * as Polyfills     from 'babel-polyfill'
import * as GlobalPolyfills from './Functions/Utils/GlobalPolyfills.js'
import * as React         from 'react'
// we're using a custom render for the Help page
// so for now this version of flatdoc needs to stay
import * as flatdoc       from '../Vendor/flatdoc.jsx'
import * as API           from './Services/API/Main.jsx'
import {}                 from '../Vendor/jquery.date-dropdowns.js'
import {}                 from './Components/Styles/Main.jsx'
import _                  from 'lodash'

window.Quantler = {}
window.React = React
window.idtoken = () => JSON.parse(localStorage.User).id_token

try {
  LE.init(API.LOGENTRIESTOKEN)
} catch (error) {
  window.console.log("LogEntries Error")
}
