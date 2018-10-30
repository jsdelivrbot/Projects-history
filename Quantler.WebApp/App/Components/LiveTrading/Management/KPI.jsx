import {Component} from 'react'
import Radium from 'radium'
import ReactHighstock from 'react-highcharts/bundle/highstock'
import {Fonts, Colors} from '../../Utils/GlobalStyles.jsx'
import {Quotation} from './Shared.jsx'
import {highchartConfig, highchartTypes} from '../../../Functions/Utils/HighchartConfig.jsx'
import Utils from '../../../Functions/Utils/Utils.jsx'
import _ from 'lodash'

let Styles = () => {
  return {
    container: {
      float: 'left',
      marginRight: '10px !important',
      marginTop: 10,
      cursor: 'default',
      userSelect: 'none',
      fontFamily: Fonts.openSans,
      color: Colors.primary,
      fontSize: 12,
      width: 300,
      height: 135,
      backgroundColor: Colors.white,
      borderRadius: 4,
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.15)',
      padding: 10,
      position: 'relative',
    },
    title: {
      fontWeight: 700,
      letterSpacing: 0.5
    },
    value: {
      fontSize: 25,
      letterSpacing: 1.6,
      fontWeight: 700,
    },
    valueHolder: {
      width: 'auto !important',
      lineHeight: '15px',
      position: 'absolute',
      padding: '15px',
      bottom: 0
    },
    chartContainer: {
      position: 'absolute',
      bottom: 15,
      right: 0
    }
  }
}

let style = Styles()

let props = {
  title: 'WEEK PIZZA PERFORMANCE',
  tradingAgent: 'Tradingagent',
  value: '11.71',
  chartConfig: {
    type: 'column',
    color: Colors.orange,
    data: [[1220832000000, 25.56], [1220918400000, 25.67], [1221004800000, 21.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 18.05], [1221523200000, 16.98], [1221609600000, 22.26], [1221696000000, 19.16], [1221782400000, 28.13], [1222041600000, 25.72], [1222128000000, 18.12], [1222214400000, 18.39], [1222300800000, 18.85], [1222387200000, 18.32], [1222646400000, 20.04], [1222732800000, 25.24], [1222819200000, 30.59], [1222905600000, 35.3]]
  }
}

let typeMatch = {
  'bar': 'column'
}

class ChartComponent extends Component {
  shouldComponentUpdate ({ value }) {
    let chart = this.refs.chart.getChart()
    chart.series[0].addPoint(_.last(value), true, true)
    return false
  }

  render () {

    //console.log(this.props.config);
    return <ReactHighstock
      config={this.props.config}
      ref="chart"/>
  }
}

export let KPI = Radium(({ chart }) => {
  let { Name, AgentName, Value, ChartType } = chart

  let config = highchartConfig(highchartTypes[ChartType.toLowerCase()], Value)

  let value = _.last(Value)[1]

  return (
    <div className="row" style={style.container}>
      <div className="col-md-5" style={{ padding: '0', height: '100%' }}>
        <div className="row" style={style.title}>
             { Name }
        </div>
        <div className="row">
             { AgentName }
        </div>
        <div className="row" style={style.valueHolder}>
          <span style={style.value} title={value}>
            { Utils.formatNumberDecimals(value, 2) }
          </span>
          <br/>
          <span style={{ float: 'left' }}>
            <Quotation data={Value}/>
          </span>
        </div>
      </div>
      <div className="col-md-7" style={style.chartContainer}>
        <ChartComponent config={config} value={Value}/>
      </div>
    </div>
  )
})
