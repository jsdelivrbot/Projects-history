import {Management} from './Management.jsx'
import Mocks from './__Mocks'
import Utils from '../Utils/Utils.jsx'

describe('LiveTrading-Management', () => {
  describe('Account', () => {
    //
    it('selects/unselects account and filters content', () => {
      let mockPortfolios = [
        { PortfolioID: 1, Accounts: [1, 2] },
        { PortfolioID: 2, Accounts: [1, 1] }
      ]
      let accountProps = {
        AccountID: 1,
        PortfolioID: 2
      }
      let testState = {
        livetrading: {
          management: {
            selectedAccount: [],
            agents: Mocks.agents(mockPortfolios),
            positions: {},
            orders: Mocks.orders(mockPortfolios),
            pendingOrders: {}
          }
        }
      }
      let resultView = {
        agents: [
          { ...accountProps, AgentID: 0 },
          { ...accountProps, AgentID: 1 }
        ],
        positions: [],
        orders: [
          { ...accountProps, ID: 0 },
          { ...accountProps, ID: 1 }
        ],
        pendingOrders: []
      }
      let resultState = {
        ...Management.state({
          selectedAccount: accountProps,
          view: resultView
        })
      }
      let result = Management.Account.select(accountProps, testState)
      expect(result).toEqual(resultState)
      // unselect account
      let newState = Utils.deepExtend(testState, result.state)
      let result2 = Management.Account.select(accountProps, newState)
        .state.livetrading.management.selectedAccount
      expect(result2).toEqual([])
    })
  })
})
