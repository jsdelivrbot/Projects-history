import {API, CodeGen} from './Main.jsx'

export function getSamples () {
  return API.get('sample')
}

export function deleteSample (sample) {
  return API.put('sample', sample)
}
