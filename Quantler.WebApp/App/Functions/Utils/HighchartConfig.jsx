import {Colors, Fonts} from '../../Components/Utils/GlobalStyles.jsx'

export let highchartConfig = (type, data) => ({
  chart: {
    height: 70,
    margin: 0,
    style: {
      fontFamily: Fonts.openSans
    }
  },
  credits: {
    enabled: false
  },
  xAxis: {
    visible: false,
    crosshair: false,
    labels: {
      enabled: false
    }
  },
  yAxis: {
    visible: false,
    crosshair: false,
    labels: {
      enabled: false
    }
  },
  rangeSelector: {
    enabled: false
  },
  navigator: {
    enabled: false
  },
  scrollbar: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  tooltip: {
    enabled: true,
    backgroundColor: Colors.primaryLight,
    borderWidth: 0,
    borderRadius: 10,
    headerFormat: '',
    pointFormat: '<b>{point.y}</b>',
    style: {
      color: Colors.white,
      padding: 6
    },
    valueDecimals: 5
  },
  series: [
    {
      ...type,
      data: data
    }
  ]
})

export let highchartTypes = {
  bar: {
    type: 'column',
    color: Colors.orange
  },
  step: {
    type: 'line',
    step: true,
    lineWidth: 1,
    lineColor: Colors.orange
  },
  area: {
    type: 'area',
    lineWidth: 0,
    fillColor: Colors.orange
  },
  line: {
    type: 'line',
    lineWidth: 2,
    lineColor: Colors.orange
  },
  spline: {
    type: 'spline',
    lineWidth: 1,
    lineColor: Colors.orange,
    marker: {
      fillColor: Colors.orange,
      enabled: true,
      radius: 1.5
    }
  }
}
