import {Component, PropTypes} from 'react';
import {Link}                 from 'react-router';
import {Routes}               from '../../Routes.jsx';
import {Sample}               from '../../Services/API/Models.jsx';
import {SampleService}        from '../../Services/API/Sample/Main.jsx';
import {default as _}         from 'lodash';
import {default as moment}    from 'moment';
import {connect}            from '../../State.jsx'
import {Samples}            from '../../Functions/Functions.jsx'
import DeleteModal            from '../../Components/DeleteModal/DeleteModal.jsx'
import {Loading}              from '../../Components/Utils/Components.jsx'
import {Icons} from '../../Components/Utils/GlobalStyles.jsx'
import {MainButton} from '../../Components/Buttons/MainButton.jsx'

let DeleteButton = connect(state => state.samples.details.delete)(
  ({ sample, loading, modalOpen }) => {
    let onClick = () => (!loading) && Samples.toggleDeleteSampleModal()
    let disabled = (loading ? { disabled: "1" } : {})

    let deleteProps = {
      ...disabled,
      icon: Icons.trash,
      type: "secondary",
      value: ( loading ? "DELETING..." : "DELETE")
    }

    let title = `Delete Sample - ${sample.Name}`
    let description = `
        You are about to delete the sample “${sample.Name}”.
        Deleting a sample is irreversible.
        Are you sure you wish to delete the sample? `

    return (
      <div onClick={ onClick }>
        <MainButton { ...deleteProps }/>
        <DeleteModal
          title={title}
          description={description}
          modalProps={{
            isOpen: modalOpen,
            onRequestClose: Samples.toggleDeleteSampleModal
          }}
          callback={() => {
            Samples.toggleDeleteSampleModal()
            Samples.deleteSample(sample)
          }}/>
      </div>
    )
  })

class Header extends Component {

  render () {
    return (
      <header>
        <div className="container-btn-header">
          <Link to={Routes.Samples}>
            <MainButton value="BACK TO SAMPLES" icon={ Icons.left } type="primary"/>
          </Link>
          <DeleteButton sample={this.props.sample}/>
        </div>
        <h4 className="title-np">Sample: {this.props.sample.title}</h4>
      </header>
    );
  }

}

class DetailsContent extends Component {

  render () {
    var sample:Sample = this.props.sample;
    var timeformat = 'DD/MM/YYYY';

    return (
      <div className="propertie-container">
        <div className="title">Sample Details</div>
        <div className="propertie-lane">
          <div className="propertie-box">
            <div className="propertie-title">Category</div>
            <div className="propertie-value">{sample.Symbol.CategoryName}</div>
          </div>

          <div className="propertie-box">
            <div className="propertie-title">Symbol</div>
            <div className="propertie-value">{sample.Symbol.Name}</div>
          </div>

          <div className="propertie-box">
            <div className="propertie-title">Timezone</div>
            <div className="propertie-value">UTC</div>
          </div>
        </div>
        <div className="propertie-lane">
          <div className="propertie-box">
            <div className="propertie-title">Start</div>
            <div className="propertie-value">{moment(sample.StartDT).format(timeformat)}</div>
          </div>

          <div className="propertie-box">
            <div className="propertie-title">End</div>
            <div className="propertie-value">{moment(sample.EndDT).format(timeformat)}</div>
          </div>

          <div className="propertie-box">
            <div className="propertie-title">Duration</div>
            <div className="propertie-value">{moment(sample.EndDT).diff(moment(sample.StartDT), 'days')} days</div>
          </div>

        </div>

        <div className="propertie-lane">
          <div className="propertie-box">
            <div className="propertie-title">Lowest Level</div>
            <div className="propertie-value">1-Tick (Quotes)</div>
          </div>

          <div className="propertie-box">
            <div className="propertie-title">Type</div>
            <div className="propertie-value">{sample.SampleType}</div>
          </div>

          <div className="propertie-box">
            <div className="propertie-title">Order</div>
            <div className="propertie-value">{sample.Order}</div>
          </div>
        </div>
      </div>
    );
  }

}

class Chart extends Component {

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

      var timeframe = 240000;  //  currently only daily is used

      //Update data
      SampleService.sampledata(sample.ID, start, end, timeframe).then((data) => {
        chart.series[0].setData(data);
        chart.hideLoading();
      });
    };
  }

  componentDidMount () {
    //Load initial StockChart data and settings
    $(() => {
      var sample:Sample = this.props.sample;

      return SampleService.sampledata(sample.ID, sample.StartDT, sample.EndDT, 240000).then((data) => {
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

@SampleService.Subscribe()
export class Details extends Component {

  static get propTypes () {
    return {
      params: PropTypes.shape({
        sampleId: PropTypes.string
      }).isRequired
    }
  }

  constructor () {
    super();
  }

  componentDidMount () {
    SampleService.update()
  }

  loadSample () {
    return SampleService.sample(
      parseInt(this.props.params.sampleId)
    )
  }

  shouldComponentUpdate () {
    this.sample = this.loadSample();
    return true;
  }

  render () {
    var content = (this.sample)
      ? <div>
      <Header sample={this.sample}/>
      <DetailsContent sample={this.sample}/>
      <Chart sample={this.sample}/>
    </div>
      : <Loading />

    return (
      <div className="content-wrapper">
        <div className="samples container-fluid">
             {content}
        </div>
      </div>
    );
  }
}
