import * as API from '../Networking/API/API.jsx'

let user = value => ({ state: { User: value } })

let statisticAjax =
  (statistic, { accountDetails }, userId) => ([
    API.User.loadStatistic, { statistic, userId },
    User._loadUserStatistic(accountDetails)])

let accountStaisticAjax =
  (statistic, userId) => statisticAjax(statistic, { accountDetails: true }, userId)

export let User = {

  getDetails (after)
  {
    return {
      ajax: [
        [API.User.getDetails, {}, User._getDetails(after)]]
    }
  },

  _getDetails: (after) => (details) => {
    return {
      ...user({ details }),
      do: (Array.isArray(after)) ? [after] : []
    }
  },

  updateDetails (details)
  {
    return {
      ...user({ details }),
      ajax: [
        [API.User.updateDetails, details, User._updateDetails]]
    }
  },

  _updateDetails ()
  {
    // TO-DO: check for error
    return {}
  },

  toggleUserBar (state)
  {
    let { view, open } = state.User.userBar

    return {
      ...user({
        userBar: {
          view: "Default",
          open: ((view == "Default" && open) ? false : true)
        }
      })
    }
  },

  closeAccountDetails ()
  {
    return {
      ...user({
        userBar: {
          open: false,
          accountDetails: {
            id: -1
          }
        }
      })
    }
  },

  openAccountDetails (userId, _state)
  {
    let { view, accountDetails } = _state.User.userBar

    if (userId == accountDetails.id && view == "AccountDetails") {
      return {}
    }
    else {
      let loadUserStatistics =
        User.loadUserStatistics({ userId, accountDetails: true })

      let state =
        Object.deepExtend(
          loadUserStatistics.state,
          user({
            userBar: {
              open: true,
              view: "AccountDetails",
              accountDetails: {
                userId,
                loading: true
              }
            }
          }).state)

      let ajax =
        loadUserStatistics.ajax.concat(
          [[API.User.getUserDetails, { id: userId }, User._openAccountDetails]])

      return { state, ajax }
    }
  },

  _openAccountDetails (response)
  {
    console.log('_openAccountDetails: ', response)

    return {
      ...user({
        userBar: {
          accountDetails: {
            loading: false,
            data: response
          }
        }
      })
    }
  },

  loadUserStatistics ({ userId, accountDetails })
  {
    let userBar = (accountDetails
      ? {
      accountDetails: {
        statistics: []
      }
    }
      : {
      userDetails: {
        statistics: []
      }
    })

    return {
      ...user({ userBar }),
      ajax: [
        accountStaisticAjax("templates", userId),
        accountStaisticAjax("totalbacktests", userId),
        accountStaisticAjax("timeanalyzed", userId)]
    }
  },

  _loadUserStatistic: (accountDetails = false) =>
    (response, status, xhr, state) => {
      let userBar = (accountDetails
        ? {
        accountDetails: {
          statistics: state.User.userBar
            .accountDetails
            .statistics.concat(response)
        }
      }
        : {
        userDetails: {
          statistics: state.User.userBar
            .userDetails
            .statistics.concat(response)
        }
      })

      return { ...user({ userBar }) }
    },

  managementURL ()
  {
    return {
      ajax: [
        [API.User.managementURL, {}, User._managementURL]]
    }
  },

  _managementURL (managementURL)
  {
    return {
      state: {
        User: {
          managementURL
        }
      }
    }
  },

  upgradePremium (parameters)
  {
    // set to #/accounts/loading
    // load subscriptions
    // upgrade
    let callback = subscriptions => {
      let subscription = subscriptions.reduce
      ((result, subscription) =>
        ({ ...result, [ subscription.Name ]: subscription }), {})

      let Subscriptionorder = subscription.Premium.Order

      let ChargifySubscriptionID = parameters.subid

      return {
        state: { User: { subscription } },
        ajax: [[API.User.postSubscription,
          { Subscriptionorder, ChargifySubscriptionID },
          User._upgradePremium]]
      }
    }

    let ChargifyID = parameters.chargifyid

    let updateUserDetails = [[API.User.updateDetails, { ChargifyID }, () => ({
      do: [[User.getDetails, null]],
      ajax: [[API.LiveTrading.Accounts.subscription, {}, callback]]
    })]]

    return {
      location: "/accounts/loading",
      ajax: updateUserDetails
    }
  },

  _upgradePremium ()
  {
    return {
      location: "/accounts/login"
    }
  },

  updateName (property, value) {

    let details = {}
    details[property] = value

    return {
      ...user({ details }),
      ajax: [
        [API.User.updateDetails, details, User._updateName]]
    }
  },

  // Callback
  _updateName () {
    return {}
  }
}
