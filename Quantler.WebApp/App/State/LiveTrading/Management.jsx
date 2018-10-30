export default
{
  portfolio: {},
  loadingPortfolio: false,
  //
  // for which account to
  // show agents and trades
  // { PortfolioID, AccountID }
  // Functions/LiveTrading/Management.Account.select()
  selectedAccount: [],
  //
  // chart values are received from pusher
  // channel and aggregate into a single
  // array `Value` as described above
  //
  // [chartUID] = ChartInfo with { Value : [] }
  //
  charts: {
    // '001': { ... Value: Array<number> }
  },
  //
  // accountUpdates:
  // { [AccountID]: PortfolioUpdate }
  // Shell/Components/LiveTrading/Management/AccountsTable.jsx
  accountUpdates: {},
  //
  // account which an update
  // request have been sent
  accountUpdating: "",
  //
  // [PortfolioID]: Value[]
  accounts: {},
  agents: {},
  positions: {},
  orders: {},
  pendingOrders: {},
  //
  // sorted data based on selectedAccount,
  // used for rendering view components
  view: {
    // currencies: {
    //   // [accountID]: '$'
    // },
    accounts: [],
    agents: [],
    positions: [],
    orders: [],
    pendingOrders: [],
  },
  //
  // tracks commands that have been
  // sent. used for showing loading
  // gif and disabling buttons while
  // a command is processing
  //
  // [AccountID | AgentID] = Array<string>
  commands: {
    accounts: {
      // '0123': ['DELETE']
    },
    agents: {
      // '0001': ['STOP']
    }
  },
  // used for only updating components when new
  // data arrives, checked in shouldComponentUpdate
  timestamps: {
    charts: +new Date
  }
}
