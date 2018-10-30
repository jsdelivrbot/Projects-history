import * as API from '../Networking/API/API.jsx'
import {Routes} from "../../Routes.jsx"
import _        from 'lodash'
import moment   from 'moment'
import AjaxErrors from '../Utils/AjaxErrors.jsx'
import Utils from '../Utils/Utils.jsx'

function accounts (accounts) {
  return ({ state: { livetrading: { accounts } } })
}

function getAccounts (state) {
  return state.livetrading.accounts
}

function getSignup (state) {
  return getAccounts(state).signup
}

// what to omit from user details when
// sending a details update request
let omits = ['selects', 'channelId', 'chargifyId', 'subscription',
  'autoDiscoveryOn', 'newsletterOn', 'onBoarded', 'userId', "agreements"]

export let Accounts = {
  //
  // user details form
  Signup: {
    //
    // `/#/accounts/signup`
    // form proceed button
    proceed ({ livetrading }) {
      window.console.log('proceeding ')

      let { signup } = livetrading.accounts

      //
      // TODO: stop doing this change of case
      //
      // state properties from camel to pascal case
      // eg: firstName => FirstName
      //
      let details = _.mapKeys(_.omit(signup.form, omits),
        (value, key) => key[0].toUpperCase() + key.substr(1))

      let Agreements = _.map(signup.agreements, (value, key) => ({
        AgreedDTUTC: moment().format(),
        IsAgreed: value,
        Name: key
      }))

      let { countries } = livetrading.accounts.signup.form.selects
      let CountryOfBirth = _.find(countries, { Code: details.CountryOfBirth })
      let CountryOfResidence = _.find(countries, { Code: details.CountryOfResidence })

      // format for datetime
      let DateOfBirth = details.DateOfBirth.stamp

      details = Object.deepExtend(details, {
        DateOfBirth,
        Agreements,
        CountryOfResidence,
        CountryOfBirth
      })

      let callback
      let proceed = Accounts.Signup._proceed.success
      let getUserDetails = (callback) => () => ({
        ajax: [[
          API.User.getUserDetails, {},
          (details) => ({
            state: {
              User: { details }
            },
            do: [[callback]]
          })
        ]]
      })

      let { selectedSubscription, subscription } = livetrading.accounts.upgrade

      // premium
      if (selectedSubscription == subscription.Premium.Order) {
        // update user details
        callback = getUserDetails(proceed)
      }
      // sponsored
      else {
        // update user details
        // upgrade user to sponsored
        let data = { Subscriptionorder: selectedSubscription }

        callback = getUserDetails(() => ({
          ajax: [[API.User.postSubscription, data, proceed]]
        }))
      }

      window.console.log('proceed - details ', details)

      return {
        ...accounts({
          signup: {
            proceedLoading: true
          }
        }),
        ajax: [[API.User.updateDetails, details, callback]]
      }
    },

    _proceed: {
      success (...params) {
        let { upgrade } = _.last(params).livetrading.accounts

        let location =
          (upgrade.selectedSubscription == upgrade.subscription.Premium.Order)
            ? "new-account-premium"
            : "new-account-sponsored"

        return {
          ...accounts({
            signup: {
              proceedLoading: false
            }
          }),
          location: Routes.Accounts + location
        }
      },
      error: AjaxErrors.handler({
        message: 'Error submitting form',
      })
    }
  },

  signupLoad (state) {
    if (state.livetrading.accounts.upgrade.selectedSubscription == -1) {
      return {
        location: Routes.Accounts
      }
    }

    let ajax = []

    if (getSignup(state).form.selects.countries.length == 0) {
      ajax.push([
        API.LiveTrading.Accounts.getCountries, {},
        Accounts._loadCountries])
    }

    let form = _.mapKeys(state.User.details,
      (value, key) => _.camelCase(key))

    let dateOfBirth

    if (!!form.dateOfBirth) {
      let date = moment(form.dateOfBirth)
      dateOfBirth = {
        day: date.day(),
        month: date.month() + 1,
        year: date.year(),
        stamp: form.dateOfBirth.replace(/([T:])\w+/g, "")
      }
    } else {
      dateOfBirth = {
        day: '',
        month: '',
        year: '',
        stamp: ''
      }
    }

    form = Object.deepExtend(form, {
      dateOfBirth,
      countryOfBirth: _.get(form, 'countryOfBirth.Code', ""),
      countryOfResidence: _.get(form, 'countryOfResidence.Code', "")
    })

    let agreements = _.mapValues(getSignup(state).agreements,
      (value, key) => _.get
      (_.find(form.agreements, { Name: key }), 'IsAgreed', value))

    return {
      ...accounts({
        signup: {
          form,
          agreements
        }
      }),
      ajax
    }
  },

  updateForm ({ property, value }, state) {
    return {
      ...accounts({
        signup: {
          form: {
            [ property ]: value
          }
        }
      })
    }
  },

  updateDateOfBirth ({ property, value }, { livetrading }) {
    let { dateOfBirth } = livetrading.accounts.signup.form

    let stamp = moment(new Date(''
      + `${ dateOfBirth.year }-`
      + `${ dateOfBirth.month }-`
      + dateOfBirth.day)).format()

    let updated = Object.deepExtend(
      dateOfBirth, {
        [ property ]: value,
        stamp
      })

    return Accounts.updateForm({
      property: 'dateOfBirth',
      value: updated
    })
  },

  toggleCheck ({ property, whichCheck }, state) {
    let value =
      !getSignup(state) [property][whichCheck]

    return {
      ...accounts({
        signup: {
          [ property ]: {
            [ whichCheck ]: value
          }
        }
      })
    }
  },

  _loadCountries: {
    success (countries) {
      return {
        ...accounts({
          signup: {
            form: {
              selects: {
                countries
              }
            }
          }
        })
      }
    },
    error: AjaxErrors.handler({
      message: 'Error loading countries list, please try again later'
    })
  },

  // the main Accounts page
  Upgrade: {
    load ({ livetrading }) {
      let ajax = []
      if (!Object.keys(livetrading.accounts.upgrade.subscription).length) {
        ajax.push([
          API.LiveTrading.Accounts.subscription, {},
          Accounts.Upgrade._subscription
        ])
      }
      return { ajax }
    },

    _subscription: {
      success (contents) {
        return {
          ...accounts({
            upgrade: {
              subscription: Utils.toMap(contents, ({ Name }) => Name)
            }
          })
        }
      },
      error: AjaxErrors.handler({
        message: 'Error loading account subscriptions, please try again later'
      })
    },

    signup (selectedSubscription) {
      return {
        ...accounts({
          upgrade: { selectedSubscription }
        }),
        location: Routes.Accounts + "signup"
      }
    },

    link () {
      return {
        location: Routes.Accounts + "login"
      }
    },

    seenDiscountPopup () {
      return {
        ...accounts({
            upgrade: { seenDiscountPopup: true }
          }
        )
      }
    },
  },

  Login: {
    load () {
      return {
        ...accounts({
          login: {
            brokerloginok: undefined,
            brokerlogin: []
          }
        }),
        ajax: [
          [API.LiveTrading.Accounts.brokers, {},
            Accounts.Login._loadBrokers]]
      }
    },

    _loadBrokers: {
      success (brokers) {
        // broker:
        //   Name :string,
        //   Servers :[{
        //       Name :string }],
        //   Logo :string,
        //   SignupURL :string,
        //   IsSponsor :boolean
        return {
          ...accounts({
            login: { selects: { brokers } }
          })
        }
      },
      error: AjaxErrors.handler({
        message: 'Error loading brokers, please try again later'
      })
    },

    updateForm ({ property, value }, { livetrading }) {
      let selects = {}

      if (property == 'broker') {
        let broker =
          livetrading.accounts.login
            .selects.brokers.filter
          (broker => broker.Name == value)[0]

        selects.selects = {
          servers: broker.Servers
        }
      }

      return {
        ...accounts({
          login: {
            [ property ]: value,
            brokerloginok: undefined,
            ...selects
          }
        })
      }
    },

    login ({ livetrading }) {
      let { login } = livetrading.accounts

      let data = {
        BrokerName: login.broker,
        Server: login.server,
        UserName: login.username,
        Password: login.password
      }

      console.log('broker login ', data)

      return {
        ...accounts({
          login: {
            logging: true,
            brokerlogin: [],
            brokerloginok: undefined
          }
        }),
        ajax: [[API.LiveTrading.Accounts.brokerLogin, data, Accounts.Login._login]]
      }
    },

    _login: {
      success (response) {
        console.log('broker login response: ', response)

        return {
          ...accounts({
            login: { logging: false }
          })
        }
      },
      error: AjaxErrors.handler({
        message: 'Cannot log in to broker, please try again later'
      })
    },
  },

  NewAccountPremium: {
    load (state) {
      if (state.livetrading.accounts.upgrade.selectedSubscription == -1) {
        return { location: Routes.Accounts }
      } else {
        return {}
      }
    },
  },

  NewAccountSponsored: {
    load () {
      return {
        ...accounts({
          newAccount: {
            sponsored: {
              loading: true
            }
          }
        }),
        ajax: [[
          API.LiveTrading.Accounts.brokers, {},
          Accounts.NewAccountSponsored._loadBrokers]]
      }
    },

    _loadBrokers: {
      success (brokers) {
        return {
          ...accounts({
            newAccount: {
              sponsored: {
                brokers,
                loading: false
              }
            }
          })
        }
      },
      error: AjaxErrors.handler({
        message: 'Error loading brokers, please try again later'
      })
    },
  },
}
