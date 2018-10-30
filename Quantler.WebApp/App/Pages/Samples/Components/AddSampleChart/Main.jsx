import {Component, PropTypes} from 'react';
import {Sample, Symbol}       from '../../../../Services/API/Models.jsx';
import {SymbolService}        from '../../../../Services/API/Symbol/Main.jsx';
import {default as _}         from 'lodash';
import {default as moment}    from 'moment';

export default class Chart extends Component {



  // Typing for props, dev
  // help, no runtime effect
  props:{
    Symbol   : Symbol,
    onUpdate : Function,
    // Dates in UNIX TimeStamp
    StartDT  : Number,
    EndDT    : Number
  }

  // Get the time frame from start and end dates
  getTimeFrame = (StartDT:Number, EndDT:Number) => 240000

  //                                            Load Data Snapshot

  // Load new data depending on
  // the selected min and max dates
  afterSetExtremes () {
    return (e) => {
      var symbol:Symbol = this.props.Symbol

      // (date / 1000) because of time format
      // differences between the highchart
      // selection and API and datepicker
      let StartDT = Math.floor(e.min / 1000),
        EndDT = Math.floor(e.max / 1000)

      // Get the data
      this.loadSnapshot(symbol.ID, StartDT, EndDT)

      // Notify other Components (onUpdate)
      this.props.onUpdate('StartDT', StartDT)
      this.props.onUpdate('EndDT', EndDT)
    }
  }

  loadSnapshot (SymbolID, StartDT, EndDT) {
    let $chartObject = $(this.refs['highstock']).highcharts()

    $chartObject.showLoading('Loading data from server...')

    // Load new data and update graph
    SymbolService
      .getData(SymbolID, StartDT, EndDT, this.getTimeFrame(StartDT, EndDT))
      .then((data) => {
        $chartObject.series[0].setData(data)
        $chartObject.hideLoading()
      })
      .fail(() => console.log('FAIL LOADING SNAPSHOT'))
  }

  //                                        Load Chart / Highstock

  // Load initial StockChart data/settings
  // and initializes highstock graph
  setChartObject () {
    $(() => {
      return SymbolService
        .getData(this.props.Symbol.ID, this.props.StartDT, this.props.EndDT, 240000)
        .then((data) => {
          $(this.refs['highstock'])
            .highcharts('StockChart', {
              chart: {
                type: 'candlestick',
                zoomType: 'x'
              },

              navigator: {
                adaptToUpdatedData: false,
                series: {
                  data: data
                }
              },

              scrollbar: {
                liveRedraw: false
              },

              title: {
                text: this.props.Symbol.Name
              },

              subtitle: {
                text: this.props.Symbol.CategoryName + ' / ' + this.props.Symbol.Name
              },

              credits: {
                enabled: true,
                text: 'Quantler.com',
                href: 'https://Quantler.com'
              },

              rangeSelector: {
                buttons: [{
                  type: 'month',
                  count: 1,
                  text: '1m'
                }, {
                  type: 'year',
                  count: 1,
                  text: '1y'
                }, {
                  type: 'all',
                  text: 'All'
                }],
                inputEnabled: false, // it supports only days
                selected: 4 // all
              },

              xAxis: {
                events: {
                  afterSetExtremes: this.afterSetExtremes()
                },
                minRange: 3600 * 1000 // one hour
              },

              yAxis: {
                floor: 0
              },

              series: [{
                data: data,
                dataGrouping: {
                  enabled: false
                },
                name: this.props.Symbol.Name
              }]
            })
        })
    })
  }

  //                                             Lifecycle Methods

  // Replace current chart with a new
  // chart on symbol change event
  shouldComponentUpdate (nextProps) {
    if (!_.isEqual(_.extend({}, nextProps.Symbol), _.extend({}, this.props.Symbol))) {
      this.props = nextProps
      this.setChartObject()
    }
    else if (nextProps.StartDT !== this.props.StartDT
      || nextProps.EndDT !== this.props.EndDT) {
      this.props = nextProps
      this.loadSnapshot(this.props.Symbol.ID, this.props.StartDT, this.props.EndDT)
    }

    return false
  }

  componentDidMount = this.setChartObject

  render () {
    return (
      <section>
        <div className="graph-container">
          <div ref="highstock" style={{ height: 400, minWidth: 310 }}></div>
        </div>
      </section>
    );
  }

}
