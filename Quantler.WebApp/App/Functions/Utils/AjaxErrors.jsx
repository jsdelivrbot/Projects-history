import _ from 'lodash'
import {LoginService} from '../../Services/API/Login/Main.jsx'

function statusNotification (text, messageOverride) {
  return message => [{
    type: 'error',
    message: text + (messageOverride || message)
  }]
}

// TODO: add logging
let AjaxErrors = {
  consoleLog ({ data, statusText, xhr }) {
    window.console.warn('\nAJAX ERROR')
    window.console.dir(data)
    window.console.log('Status: ' + statusText)
    window.console.dir(xhr)
    window.console.warn('\n')
  },

  handler ({ message, then }) {
    return function (data, statusText, xhr) {
      AjaxErrors.consoleLog({ data, statusText, xhr })
      if (xhr.status == 401 || xhr.status == 0) {
        return {
          do: [[() => LoginService.logout()]]
        }
      }
      let status = AjaxErrors.statusCodes[xhr.status] || {}
      let _do = (!then
        ? _.get(status, 'do', {})
        : [[then, [data, statusText, xhr]]])
      let notification = (!status.notification
        ? {}
        : { notification: status.notification(message) })
      return { ...notification, do: _do }
    }
  },

  statusCodes: {
    401: {
      notification: statusNotification(
        'Look like you are logged out, ' +
        'please login to continue', null)
    },
    500: {
      notification: statusNotification('System Error - ')
    }
  }
}

export default AjaxErrors
