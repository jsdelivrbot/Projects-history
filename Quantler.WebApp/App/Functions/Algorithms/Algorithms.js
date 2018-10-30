import * as API from '../../Functions/Networking/API/API.jsx'

export let Algorithms = {
  state (value) {
    return {
      state: { algorithms: value }
    }
  },
  Index: {
    load (options, { algorithms }) {

      options = Object.assign(algorithms.index.options, options)

      return {
        ...Algorithms.state({
          index: { loading: true, options }
        }),
        ajax: [[
          API.Algorithms.getHistory,
          options, Algorithms.Index._load
        ]]
      }
    },

    _load (history) {
      return {
        ...Algorithms.state({
          index: { history, loading: false }
        })
      }
    }
  }
}
