import Utils from './Utils.jsx'
import _ from 'lodash'

describe('utility functions', () => {
  //
  it('generates UIDs', () => {
    let mock = (value) => Object.assign(value, { PortfolioID: 1 })
    let tests = {
      account: [
        [mock({ AccountID: 1 }), '1_1']
      ],
      agent: [
        [mock({ AgentID: 2 }), '1_2'],
        [mock({ AgentID: 3, ID: 1 }), '1_3'],
        [mock({ ID: 4 }), '1_4']
      ],
      chart: [
        [mock({ AgentID: 2, Name: 'chartEMA' }), '1_2_chartEMA']
      ],
      position: [
        [mock({ AgentID: 5, Symbol: 'EURUSD' }), '1_5_EURUSD']
      ],
      pendingOrder: [
        [mock({ AgentID: 10, ID: 4 }), '1_10_4']
      ],
      order: [
        [mock({ AccountID: 33, ID: 10 }), '1_33_10']
      ]
    }
    _.forEach(tests, (value, key) =>
      value.forEach(([ mock, result ]) =>
        expect(Utils.UID[key](mock)).toEqual(result)))
  })
})
