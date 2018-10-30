import {Component} from 'react'
import Radium from 'radium'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import {Fonts, Colors} from '../Utils/GlobalStyles.jsx'
import _ from 'lodash'

export let Styles = {
  box: (noMargin) => ({
    display: 'table-cell',
    float: 'left',
    userSelect: 'none',
    height: 21,
    padding: '0 10px',
    margin: (noMargin ? 0 : 5),
    borderRadius: 5,
    lineHeight: '21px',
    textAlign: 'center',
    fontFamily: Fonts.openSans,
    color: Colors.white,
    fontSize: 12,
    fontWeight: 700
  })
}

export let templateTypes = {
  'Entry': {
    color: Colors.yellow
  },
  'Exit': {
    color: Colors.blue
  },
  'Risk Management': {
    color: Colors.guava
  },
  'Money Management': {
    color: Colors.green
  }
}

@Radium
export class TemplateTooltip extends Component {
  render () {

    let { type, hoverMessage, noMargin, name } = this.props

    return (
      <Tooltip placement="bottom" mouseEnterDelay={0.2} overlay={<span>{hoverMessage}</span>}>
        <div style={[Styles.box(noMargin), { backgroundColor: templateTypes[type].color }]}>
             { name }
        </div>
      </Tooltip>
    )
  }
}
