import {Component}          from 'react';
import _                      from 'lodash';
import {QPaginator}           from '../../../../Components/QPaginator/Main.jsx';
import Utils                  from '../../../../Functions/Utils/Utils.jsx'
import {State, connect}     from '../../../../State.jsx'
import {RunBacktestTimer}   from '../../Components/RunBacktestTimer.jsx'
import {SocialPaymentAlert} from '../../Components/Alerts.jsx'
import {BacktesterState}    from '../../Functions/BacktesterState.jsx'
import * as BacktestFn        from '../../Functions/Backtest.jsx'
import {UserDetailsService} from '../../../../Services/API/User/Details.jsx'

function PreviousTestLink () {

  return (
    <a onClick={ BacktestFn.loadPreviousTest }>
      Previous Test
    </a>
  )

}

class PerformanceOverview extends Component {

  chartData = {}

  mapDatapointValues (datapoints) {
    return _(datapoints)
      .sortBy('UnixTimeStamp')
      .map((values) => [values.UnixTimeStamp, values.Value * 100])
      .value()
  }

  initiateGraph ({ animation } = { animation: false }) {
    let { chartData } = this.props

    let equity = this.mapDatapointValues(chartData.equity.Datapoints)
    let drawdown = this.mapDatapointValues(chartData.drawdown.Datapoints)

    this.chartData.equity = chartData.equity.Datapoints
    this.chartData.drawdown = chartData.drawdown.Datapoints

    // set the allowed units for data grouping
    // [[{unit_name, [allowed_multiples]}]]
    let groupingUnits = [['week', [1]], ['month', [1, 2, 3, 4, 6]]]

    $(this.refs.highstock)
      .highcharts('StockChart', {
        plotOptions: {
          line: {
            animation: animation
          },
          area: {
            animation: animation
          }
        },
        rangeSelector: {
          selected: 5
        },
        title: {
          text: ''
        },
        credits: {
          enabled: true,
          text: 'Quantler.com',
          href: 'https://Quantler.com'
        },
        yAxis: [{
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Cumulative Return %'
          },
          height: '60%',
          lineWidth: 2
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Drawdown %'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }],
        series: [{
          type: 'line',
          name: 'Return',
          color: '#31323E',
          data: equity,
          dataGrouping: {
            units: groupingUnits
          }
        }, {
          type: 'area',
          name: 'Drawdown',
          color: '#C83948',
          data: drawdown,
          yAxis: 1,
          dataGrouping: {
            units: groupingUnits
          }
        }]
      })
  }

  componentDidMount () {
    this.initiateGraph({ animation: true })
  }

  chartTimeout = setTimeout(() => {}, 0)
  // contains the datapoints, see componentDidMount
  chartData = { equity: null, drawdown: null }

  // nextProps contains chartData with original
  // datapoints + the new ones received, so the
  // previous ones must be removed, uses this.chartData
  // to know how many datapoints to remove from nextProps
  shouldComponentUpdate (nextProps) {
    $(() => {
      clearTimeout(this.chartTimeout)
      this.chartTimeout = setTimeout(() => this.initiateGraph(), 500)
    })

    return false
  }

  render () {
    return (
      <div className="panel">
        <div className="panel-heading">
          Performance Overview
        </div>
        <div className="panel-body">
          <div ref="highstock" style={{ height: 400 }}></div>
        </div>
      </div>
    )
  }

}

class IndividualTradesComponent extends Component {

  //Function for rounding the values (can be easily altered)
  round = (number, points) => number.toFixed(points)

  tableBody () {
    let { trades } = this.props

    return trades.Content.map((trade, i) =>
      <tr key={i}>
        <td>{ trade.ID }</td>
        <td>{ Utils.formatTime(trade.TimeStamp, 'DD/MM/YYYY') }</td>
        <td>{ Utils.formatTime(trade.TimeStamp, 'HH:mm:ss') }</td>
        <td>{ trade.Symbol }</td>
        <td>{ trade.Side ? 'Long' : 'Short' }</td>
        <td>{ trade.Price }</td>
        <td>{ (trade.Size / 1000) + 'K' }</td>
        <td>{ '$ ' + this.round(trade.Result, 2) }</td>
        <td>{ this.round(trade.ResultPerc * 100, 2) }</td>
      </tr>)
  }

  render () {
    let { trades } = this.props

    if (!trades || !trades.Content) return null

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span>Individual Trades</span>
        </div>
        <div className="panel-body">
          <table className="table table-hover">
            <thead>
            <tr>
              <td>#</td>
              <td>Date</td>
              <td>Time</td>
              <td>Symbol</td>
              <td>Side</td>
              <td>Price</td>
              <td>Size</td>
              <td>Result</td>
              <td>%</td>
            </tr>
            </thead>
            <tbody>
            { this.tableBody() }
            </tbody>
          </table>
        </div>
        <div className="row center-as-table">
          <QPaginator pagination={trades}
                      onClick={ page => BacktestFn.loadTrades({ page }) }/>
          <br/>
        </div>
      </div>
    )
  }

}

let IndividualTrades = connect(state => ({

  trades: state.Backtester.backtest.currentTest.data.trades

}))(IndividualTradesComponent)

class BacktestContentComponent extends Component {

  alerts = {
    runBacktest: () => (
      <div className="alert ng-isolate-scope alert-warning" role="alert">
        <div>
          <span className="ng-binding ng-scope">Press the "Run Backtest" button to test your strategy.</span>
        </div>
        <i className="fa fa-warning pull-right"/>
      </div>
    ),
    runningBacktest: () => (
      <div className="alert ng-isolate-scope alert-warning" role="alert">
        <div>
          <span className="ng-binding ng-scope">Sending Backtest...</span>
        </div>
      </div>
    ),
    error: (error, key) => (
      <div key={key} className="alert ng-isolate-scope alert-danger" role="alert">
        <div>
                    <span className="ng-binding ng-scope">
                        {
                          typeof error == "object"
                            ? _.map(error, (value, key) => <span key={key}>{ key + ' : ' + value }<br/></span>)
                            : Array.isArray(error)
                            ? error.map((line, key) => <span key={key}>{ line }<br/></span>)
                            : error
                        }
                    </span>
        </div>
           {/*<i className="fa fa-close pull-right"/>*/}
      </div>
    ),
    success: (text) => (
      <div className="alert ng-isolate-scope alert-success" role="alert">
        <div>
                    <span className="ng-binding ng-scope">
                        { text }
                    </span>
        </div>
      </div>
    )
  }

  //
  //         Determine red or green

  getResultColor (comparison) {

    return (comparison.isMaximization && comparison.difference.value >= 0)
    || (!comparison.isMaximization && comparison.difference.value <= 0) ? 'success' : 'danger';
  }

  //
  //         Performance Statistics

  summary ({ performance }) {
    return (
      <div>
        <br/>
        <div className="row">
          <div className="col-md-12 table-header">
            Summary
          </div>
        </div>

        <table className="table table-hover">
          <thead>
          <tr>
            <th>Statistics</th>
            <th>Current Test</th>
            <th><PreviousTestLink/></th>
            <th>Difference</th>
          </tr>
          </thead>
          <tbody>
          {
            _.sortBy(performance.summary, (n) => n.Order)
              .map(comparison =>
                (
                  <tr>
                    <td>{comparison.pText}</td>
                    <td>{ comparison.pType + ' ' + comparison.currentTest }</td>
                    <td>{ comparison.pType + ' ' + comparison.previousTest }</td>
                    <td>
                                  <span className={ this.getResultColor(comparison) }>
                                    { comparison.difference.value }
                                  </span>&nbsp;
                      <span>{ '(' + comparison.difference.percentage + '%)' }</span>
                    </td>
                  </tr>
                ))
          }
          </tbody>
        </table>

      </div>
    )
  }

  tradingPeriod ({ performance }) {
    return (
      <div>
        <br/>
        <div className="row">
          <div className="col-md-12 table-header">
            Trading Period
          </div>
        </div>

        <table className="table table-hover">
          <thead>
          <tr>
            <th>Statistics</th>
            <th>Current Test</th>
            <th><PreviousTestLink/></th>
            <th>Difference</th>
          </tr>
          </thead>
          <tbody>
          {
            _.sortBy(performance.tradingPeriod, (n) => n.Order)
              .map(comparison =>
                (
                  <tr>
                    <td>{comparison.pText}</td>
                    <td>{ comparison.pType + ' ' + comparison.currentTest }</td>
                    <td>{ comparison.pType + ' ' + comparison.previousTest }</td>
                    <td>
                                  <span className={ this.getResultColor(comparison) }>
                                    { comparison.difference.value }
                                  </span>&nbsp;
                      <span>{ '(' + comparison.difference.percentage + '%)' }</span>
                    </td>
                  </tr>
                ))
          }
          </tbody>
        </table>

      </div>
    )
  }

  trades ({ performance }) {
    return (
      <div>
        <br/>
        <div className="row">
          <div className="col-md-12 table-header">
            Trades
          </div>
        </div>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Statistics</th>
            <th>Current Test</th>
            <th><PreviousTestLink/></th>
            <th>Difference</th>
          </tr>
          </thead>
          <tbody>
          {
            _.sortBy(performance.trades, (n) => n.Order)
              .map(comparison =>
                (
                  <tr key={comparison.currentTest + comparison.previousTest}>
                    <td>{ comparison.pText }</td>
                    <td>{ comparison.pType + ' ' + comparison.currentTest }</td>
                    <td>{ comparison.pType + ' ' + comparison.previousTest }</td>
                    <td>
                                    <span className={ this.getResultColor(comparison) }>
                                        {comparison.difference.value}
                                    </span>&nbsp;
                      <span>{ '(' + comparison.difference.percentage + '%)' }</span>
                    </td>
                  </tr>
                ))
          }
          </tbody>
        </table>
      </div>
    )
  }

  performanceStatistics () {
    let { comparedData } = this.props.backtest
    let { performance }  = comparedData

    return (
      <div className="panel panel-default performance-statistics">

        <div className="panel-heading">
          Performance Statistics
        </div>

        <div className="panel-body">
             {
               !!performance.summary
               && this.summary({ performance })
             }
             {
               !!performance.tradingPeriod
               && this.tradingPeriod({ performance })
             }
             {
               !!performance.trades
               && this.trades({ performance })
             }
             {
               !performance.summary
               && !performance.tradingPeriod
               && !performance.trades
               && <p><br/>No data available<br/></p>
             }
        </div>

      </div>
    )
  }

  //

  content (childContent) {
    return (
      <div key={this.props.id} className="row">
        <div className="backtest-content content col-md-12">
             {childContent}
        </div>
      </div>
    )
  }

  render () {
    let { runBacktest, currentTest, runningBacktest, backtestRequested } = this.props.backtest

    let User = this.props.User

    if (!runBacktest &&
      (currentTest.exceptions.length > 0 || runningBacktest.returnData.Exceptions.length > 0)) {
      let exceptions = [].concat(currentTest.exceptions).concat(runningBacktest.returnData.Exceptions)

      console.log(exceptions)

      return this.content(exceptions.map(this.alerts.error))
    }

    if (runBacktest) {
      // check if user is not front-runner
      if (UserDetailsService.details && UserDetailsService.details.Subscription.Name !== 'Normal') {
        setTimeout(BacktestFn.runBacktest, 1)

        return this.content(this.alerts.runningBacktest())
      }
      else {
        BacktesterState({
          backtest: {
            alerts: {
              runBacktestTimer: {
                active: true,
                time: 0,
                totalTime: 5000,
                callback: BacktestFn.runBacktest
              }
            }
          }
        })

        return this.content(<TimedRunBacktest />)
      }
    }
    else if (!currentTest.id) {
      if (backtestRequested) {
        return this.content(this.alerts.runningBacktest())
      }

      return this.content(this.alerts.runBacktest())
    }
    else {
      let chartData = currentTest.data.chartData

      return this.content(
        <div>
          {
            !!chartData
            && chartData.equity && chartData.drawdown
            && <PerformanceOverview chartData={ currentTest.data.chartData }/>
          }
          { this.performanceStatistics() }
          <IndividualTrades/>
        </div>
      )
    }
  }

}

export let BacktestContent = connect(state => ({

  backtest: _.omit(state.Backtester.backtest, 'alerts'),
  User: state.User

}))(BacktestContentComponent)

function TimedRunBacktestComponent ({ runBacktestTimer }) {

  let time = Math.floor(
    (runBacktestTimer.totalTime - runBacktestTimer.time) / 1000)

  return (
    <div>
      <RunBacktestTimer/>
      <SocialPaymentAlert time={ time }/>
    </div>
  )

}

let TimedRunBacktest = connect(state => ({

  runBacktestTimer: state.Backtester.backtest.alerts.runBacktestTimer

}))(TimedRunBacktestComponent)
