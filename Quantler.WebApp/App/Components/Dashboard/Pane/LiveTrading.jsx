import {Component} from 'react'
import Radium from 'radium'
import _ from 'lodash'
import ReactHighstock from 'react-highcharts/bundle/highstock'
import {Icons, Fonts, Colors} from '../../Utils/GlobalStyles.jsx'
import {Positions} from './PositionsTable.jsx'
import {highchartConfig, highchartTypes} from '../../../Functions/Utils/HighchartConfig.jsx'
import {Quotation} from '../../LiveTrading/Management/Shared.jsx'
import Utils from '../../../Functions/Utils/Utils.jsx'

let Styles = () => {
  return {
    container: {
      fontFamily: Fonts.openSans,
      color: Colors.primary,
      fontWeight: 300,
      padding: '0px 10px'
    },
    border: {
      borderRight: '2px solid rgba(0,0,0,0.05)'
    },
    header: {
      fontSize: 16,
      fontWeight: 300,
    },
    value: {
      fontSize: 25,
      fontWeight: 300,
    },
    chart: {
      height: 70,
    },
    positions: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: Colors.primaryLightGrey,
      textAlign: 'center',
      fontSize: 12,
      fontWeight: 600,
      height: 140,
      backgroundColor: Colors.grey,
    }
  }
}

let style = Styles()

@Radium
class Trading extends Component {
  //shouldComponentUpdate = () => true

  shouldComponentUpdate ({ value }) {
    let chart = this.refs.chart.getChart()
    //console.log(chart);
    chart.series[0].addPoint(value, true, true)
    //console.log(chart);
    return false
  }

  render () {
    let { title, value, chartType, data } = this.props
    //console.log(data)
    var newData = {}
    var newArray = []
    for (var i = 0; i < data.length; i++) {
      newData[data[i][0]] = data[i][1]
    }
    for (var key in newData) {
      newArray.push([key, newData[key]])
    }
    //console.log('-----------------');

    let config = highchartConfig(highchartTypes[chartType], newArray)
    //console.log(config)
    return (
      <div>
        <span style={[style.header]}>{title}</span><br />
        <span style={[style.value]} title={value}>
          {Utils.formatNumberDecimals(value, 2)}
        </span> &nbsp;

        <Quotation data={data}/>

        <div style={[style.chart]}>
          <ReactHighstock
            config={config} ref="chart"/>
        </div>
      </div>
    )
  }
}

export function liveTrading ({ charts, positions }) {
  let _charts

  if (_.size(charts) == 0) {
    _charts = (
      <p>
        <h6>No Charts Available</h6>
      </p>
    )
  } else {
    _charts = _
      .take(Object.keys(charts), 3)
      .map((key, index) => {
        let { Value, Name, ChartType } = charts[key]
        let _style = (index == 2 ? {} : style.border)
        //console.log(Value)
        return (
          <div
            key={ key }
            className={"col-md-4"}
            style={ _style }>
            <Trading
              title={ Name }
              value={ _.last(Value)[1] }
              chartType={ ChartType.toLowerCase() }
              data={ Value }/>
          </div>
        )
      })
  }

  return [
    <div className={"col-md-12"}>
      <div className={'row'}>
           { _charts }
      </div>
    </div>,
    <div className={"col-md-12"}>
      <br/>
      <div style={{ marginBottom: '10px' }}>
        Positions
      </div>
    </div>,
    <div
      className={"col-md-12"}
      id="livetrading-positions-col"
      style={{ position: 'relative' }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0',
          marginRight: '26px',
          height: '40px',
          overflow: 'hidden',
          zIndex: '1'
        }}
      >
        {/*
         There are two Positions component because one has a
         fixed header position, then when there is a scrollbar
         the header is still visible after scrolling, like the
         History table in the Management page.
         */}
        {
          (positions.length > 0) &&
          <Positions
            positions={ positions }
            headers={ ['AGENT', 'SYMBOL', 'DIRECTION', 'SIZE', 'PNL'] }
            keys={ ['AgentName', 'Symbol', 'Direction', 'Size', 'UnrealizedPnL'] }/>
        }
      </div>
      <div className="scrollbar-inner" style={{ paddingRight: '10px' }}>
        <Positions
          positions={ positions }
          headers={ ['AGENT', 'SYMBOL', 'DIRECTION', 'SIZE', 'PNL'] }
          keys={ ['AgentName', 'Symbol', 'Direction', 'Size', 'UnrealizedPnL'] }/>
      </div>
    </div>

  ]
}
