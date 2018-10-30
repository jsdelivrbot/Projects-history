import {API, CodeGen} from './Main.jsx'

export default
{
  getUserDetails ({ id } = {})
  {
    return API.get('user' + (id ? `/${id}` : ""))
  },

  getDetails ()
  {
    return API.get('user')
  },

  postSubscription (data)
  {
    return API.post('user/subscription', data)
  },

  userOnboarded ()
  {
    return API.put('user', { OnBoarded: true })
  },

  loadStatistic ({ statistic, userId })
  {
    let _userId = (userId ? (userId + '/') : '')
    return API.get(`user/${ _userId }statistic/${statistic}`)
  },

  updateDetails (details)
  {
    return API.put('user', details)
  },

  managementURL ()
  {
    return API.get('user/subscription/managementurl')
  },
}
