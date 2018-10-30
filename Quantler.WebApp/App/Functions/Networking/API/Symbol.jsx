import {API, CodeGen} from './Main.jsx'

export function getSymbols () {
  return API.get('symbol')
}
