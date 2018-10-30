import React from 'react'
import Radium from 'radium'
import _ from 'lodash'
import {Fonts, Colors} from '../../Utils/GlobalStyles.jsx'
import {NoAvailable} from './Table/Table.jsx'
import {KPI} from './KPI.jsx'
import {connect} from '../../../State.jsx'

class KPIHolder extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.timestamp > this.props.timestamp
  }

  render () {
    return (
      <div>
        { this.props.kpis }
      </div>
    )
  }
}

@Radium
@connect(state => ({
  activeLayout: state.ui.activeLayout
}))
export class KPIScrollbar extends React.Component {

  props = {
    kpis: {},
    timestamp: 0
  }

  state = {
    windowWidth: 0,
    containerHeight: 0,
    containerWidth: 0
  };

  resize = _.throttle(() => {
    //
    // 220 = sidemenu width
    let width = $(window).width() - (this.props.activeLayout == 'expanded' ? 220 : 90)

    let kpisWidth = Math.ceil(_.size(this.props.kpis) / 2) * 310

    this.setState({
      windowWidth: width,
      containerWidth: (width <= kpisWidth ? kpisWidth : width)
    })

    setTimeout(() => $('.scrollbar-macosx').scrollbar(), 10)
  }, 200);

  componentDidMount () {
    $(() => {
      this.resize()
      $(window).bind("resize", this.resize)
    })
  }

  componentWillUnmount () {
    $(window).unbind("resize", this.resize)
    //$('.scrollbar-macosx')
  }

  componentDidUpdate () {
    this.resize()
  }

  mapCharts (charts) {
    // <KPI type='column' 'spline' 'line' />
    return _.map(charts, (chart, UID) =>
      <KPI key={ UID } uid={ UID } chart={ chart }/>)
  }

  render () {
    let { timestamp } = this.props

    let kpis = this.mapCharts(this.props.kpis)

    let style = {
      overflow: 'hidden',
      width: this.state.containerWidth
    }

    if (!kpis.length) {
      return <NoAvailable text="NO CHARTS AVAILABLE"/>
    }

    return (
      <div style={{ width: this.state.windowWidth }}>
        <div className="scrollbar-macosx">
          <div style={ style }>
            <KPIHolder kpis={ kpis } timestamp={timestamp}/>
          </div>
        </div>
      </div>
    )
  }
}

let style = {
  message: {
    fontFamily: Fonts.openSans,
    fontWeight: 300,
    fontSize: 14,
    color: Colors.primaryLight,

    paddingLeft: 10,

    userSelect: 'none',
    cursor: 'default',

  }
}
