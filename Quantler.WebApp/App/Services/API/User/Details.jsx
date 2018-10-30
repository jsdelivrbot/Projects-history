import {Component, PropTypes} from 'react';
import {default as _}         from 'lodash';
import {Store} from '../../Utils/pubsub.jsx';
import {APIURL} from '../Main.jsx';
import {AjaxErrorHandler} from '../../../Functions/Networking/API/Main.jsx';
import {AjaxHandler}         from '../AjaxHandler.jsx';

export class UserDetails {

  Subscription
  OnBoarded
  AutoDiscoveryOn

  constructor (details) {
    this.Subscription = details.Subscription
    this.OnBoarded = details.OnBoarded
    this.AutoDiscoveryOn = details.AutoDiscoveryOn
  }

}

class UserDetailsServiceClass extends Store {

  get details () {
    if (!this._details.Subscription) this.loadData()
    return this._details || new UserDetails({})
  }

  constructor () {
    super()
    this._details = new UserDetails({})
  }

  // Prevent multiple API calls set
  // statisticType when doing JSON call
  loading = false

  loadData () {
    if (!this.loading) {
      this.loading = true

      AjaxHandler.Get(APIURL + 'user/')
        .success((details) => {
          this._details = new UserDetails(details)
          this.loading = false
          this.Publish();
        })
        .fail(AjaxErrorHandler)
    }
  }

}

export let UserDetailsService = new UserDetailsServiceClass()
