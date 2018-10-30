export let Mocks = {
  PendingOrder: {
    AgentID: 45917,
    AgentName: "a name",
    Direction: "Short",
    Distance: 0.00289,
    ID: 169470621,
    LastModifiedUTC: "2016-05-13T16:57:22Z",
    LimitPrice: 0,
    PortfolioID: 45465,
    Quantity: 0.01,
    Size: 1000,
    StopPrice: 1.1279,
    Symbol: "EURUSD",
    Type: "Stop",
    Valid: true
  },
  AgentInfo: [{
    CurrentState: 'state 1',
    DefaultAccountID: '321',
    DefaultBrokerName: 'Test 1',
    ID: 321,
    IsRunning: true,
    Name: 'Test 1',
    PortfolioID: 321321,
    ROI: 13.11,
    Server: 'Server1',
    StartedDTUTC: '2016-05-13T16:57:22Z'
  },
    {
      CurrentState: 'state 2',
      DefaultAccountID: '1232',
      DefaultBrokerName: 'Test 2',
      ID: 123,
      IsRunning: true,
      Name: 'Test 2',
      PortfolioID: 1231232,
      ROI: 12.12,
      Server: 'Server 2',
      StartedDTUTC: '2016-05-13T16:57:22Z'
    }]
}

window.Quantler.Mocks = Mocks
