import {API} from '../Main.jsx'

export let Accounts =
{
  getCountries ()
  {
    return API.get('settings/countries')
  },

  subscription ()
  {
    return API.get('subscription')
  },

  brokers ()
  {
    return API.get('broker')
  },

  brokerLogin ({ BrokerName, Server, UserName, Password })
  {
    return API.post('broker/login', { BrokerName, Server, UserName, Password })
  },

  brokerAccounts () {
    return API.get('broker/account')
  }
}
