function createMocks (propertyName) {
  /**
   * @param { [{PortfolioID: *, Accounts: string[] }] } Portfolios
   */
  return function createMock (Portfolios) {
    return Portfolios.reduce((result, { PortfolioID, Accounts }) => {
      result[PortfolioID] = Accounts.map((AccountID, key) => {
        return { AccountID, PortfolioID, [propertyName]: key }
      })
      return result
    }, {})
  }
}

export default {
  agents: createMocks('AgentID'),
  positions: createMocks('ID'),
  orders: createMocks('ID'),
  pendingOrders: createMocks('ID')
}
