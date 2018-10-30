import {Component, PropTypes} from 'react';
import {Sample}               from '../../../../Services/API/Models.jsx';

class SymbolChart extends Component {

  /*
   * Load new data depending on the selected min and max dates
   */
  afterSetExtremes ():Function {
    return (e) => {

      var sample:Sample = this.props.sample;
      var chart = $(this.refs['highstock']).highcharts();

      chart.showLoading('Loading data from server...');

      //Check range and timeframe
      var start = _.round(e.min / 1000);
      var end = _.round(e.max / 1000);
      var range = end - start;

      var timeframe = range < (1 * 24 * 3600) ? 100     //  1 day of minute data
        : range < (2 * 24 * 3600) ? 500     //  2 days of 5 minute data
        : range < (14 * 24 * 3600) ? 1500    //  14 days of 15 minuet data
        : range < (2 * 31 * 24 * 3600) ? 10000   //  2 months of 1 hour data
        : 240000; //  rest of period is daily data

      //Update data
      this.props.service.sampledata(sample.ID, start, end, timeframe).then((data) => {
        chart.series[0].setData(data);
        chart.hideLoading();
      });
    };
  }

  componentDidMount () {
    //Load initial StockChart data and settings
    $(() => {
      var sample:Sample = this.props.sample;

      return this.props.service.sampledata(sample.ID, sample.StartDT, sample.EndDT, 240000).then((data) => {
        return $(this.refs['highstock'])
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
              text: sample.Name
            },

            subtitle: {
              text: sample.Symbol.CategoryName + ' / ' + sample.Symbol.Name
            },

            credits: {
              enabled: true,
              text: 'Quantler.com',
              href: 'https://Quantler.com'
            },

            rangeSelector: {
              buttons: [{
                type: 'hour',
                count: 1,
                text: '1h'
              }, {
                type: 'day',
                count: 1,
                text: '1d'
              }, {
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
              name: sample.Symbol.Name
            }]
          })
      })
    })
  }

  render () {
    return (
      <section>
        <div className="graph-container">
          <div ref="highstock" style={{ height: 400, minWidth: 310 }}/>
        </div>
      </section>
    );
  }
}
