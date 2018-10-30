import {Component, PropTypes} from 'react';
import {default as _}         from 'lodash';
import {Store}                from '../../Utils/pubsub.jsx';
import {APIURL}               from '../Main.jsx';
import {AjaxErrorHandler}     from '../../../Functions/Networking/API/Main.jsx';
import {AjaxHandler}          from '../AjaxHandler.jsx';

class UserStatistic {

  constructor (data = { Name: String, Type: String, Value: Number }) {
    this.Name = data.Name || ''
    this.Type = data.Type || ''
    this.Value = data.Value
  }

  Type:String
  Name:String
  Value:String
}

class UserStatisticsClass extends Store {

  get templates ():UserStatistic {
    if (this._templates.Value < 0) this.loadData('templates')
    return this._templates
  }

  get totalbacktests ():UserStatistic {
    if (this._totalbacktests.Value < 0) this.loadData('totalbacktests')
    return this._totalbacktests
  }

  get timeanalyzed ():UserStatistic {
    if (this._timeanalyzed.Value < 0) this.loadData('timeanalyzed')
    return this._timeanalyzed
  }

  constructor () {
    super()

    this._templates = new UserStatistic({ Value: -1 })
    this._totalbacktests = new UserStatistic({ Value: -1 })
    this._timeanalyzed = new UserStatistic({ Value: -1 })
  }

  // Prevent multiple API calls set
  // statisticType when doing JSON call
  loading = []

  loadData (statisticType:string) {
    if (!_.includes(this.loading, statisticType)) {
      this.loading.push(statisticType)

      AjaxHandler.Get(APIURL + 'user/statistic/' + statisticType)
        .success((data:UserStatistic) => {
          this['_' + statisticType] = new UserStatistic(data)

          _.pull(this.loading, statisticType)

          this.Publish();
        })
        .fail(AjaxErrorHandler)
    }
  }

}

export let UserStatistics = new UserStatisticsClass()
