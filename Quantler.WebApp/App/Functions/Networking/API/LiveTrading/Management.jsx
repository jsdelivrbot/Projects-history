import {API} from '../Main.jsx'

export let Management =
{
  getPortfolio () {
    return API.get('portfolio/')
  },

  deleteAccount (PortfolioID) {
    return API.delete('portfolio/' + PortfolioID)
  },

  addAgent (agent) {
    return API.put('portfolio/addagent', agent)
  },

  checkAgent (agent) {
    return API.put('portfolio/checkagent', agent)
  },

  downloadLog (agentId)
  {
    return API.get('portfolio/agent/' + agentId + '/log')
  },

  portfolioUpdates () {
    return API.get('portfolio/updates')
  },

  updatePortfolio (AccountID) {
    return API.post('portfolio/' + AccountID + '/update')
  }
}
