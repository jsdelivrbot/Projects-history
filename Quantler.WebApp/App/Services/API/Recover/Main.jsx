import {default as _} from 'lodash';
import {Store}        from '../../Utils/pubsub.jsx';
import {Auth0}        from '../Auth0.jsx';

class RecoverServiceClass extends Store {

  onRequest = false

  recover (email, password) {
    let then = () => {},
      error = () => {},
      always = () => {}

    if (!this.onRequest) {
      this.onRequest = true

      $.ajax({
        url: Auth0.dbconnections.change_password,
        crossdomain: true,
        method: 'POST',
        data: {
          client_id: Auth0.client_id,
          connection: Auth0.connections.usernamePassword,
          username: email,
          password: password
        }
      })
        .done((data) => {
          if (typeof data != 'string') error()
          then()
        })
        .fail((xhr, status, _error) => {
          let errormsg = xhr.responseJSON.description
          error({ status, errormsg })
        })
        .always(() => {
          this.onRequest = false
          always()
        })
    }

    return {
      then(callback:Function) {
        then = callback
        return this
      },
      error(callback:Function) {
        error = callback
        return this
      },
      always(callback:Function) {
        always = callback
        return this
      }
    }
  }

}

export let RecoverService = new RecoverServiceClass()
