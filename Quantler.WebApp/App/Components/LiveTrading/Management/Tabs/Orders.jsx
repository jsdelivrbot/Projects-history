import React from 'react'
import Radium from 'radium'
import {Table, NoAvailable} from '../Table/Table.jsx'
import {tabsHeaders} from './Shared.jsx'
import Shared from '../Shared.jsx'
import {valuesOrdered, _try} from '../../../../Functions/Utils/Utils.jsx'
import Utils from '../../../../Functions/Utils/Utils'

@Radium
export class Orders extends React.Component {
  headers = tabsHeaders.concat(["DISTANCE"])

  keys = [
    'ID',
    'AgentName',
    'Direction',
    'LastModifiedUTC',
    'Symbol',
    'Size',
    'LimitPrice',
    'StopPrice',
    'Type',
    'Valid',
    'Distance'
  ]

  match = {
    Size: (value, item, key) =>
      Shared.cell(Utils.formatK(value), item, key),

    AccountID: Shared.cell,

    LastModifiedUTC: (value, item, key) =>
      Shared.cell(Utils.formatTime(value), item, key),

    Valid: (value, item, key) =>
      Shared.cell(_ ? 'Yes' : 'No', item, key),

    Distance: Shared.cell,
  }

  render () {
    let { headers, props, keys, transform } = this

    let rows = valuesOrdered(
      keys, props.orders, Shared.transformer(this.match, Shared.cell))

    if (!rows.length) {
      return <NoAvailable text="NO PENDING ORDERS AVAILABLE"/>
    } else {
      return <Table
        {...{ headers, rows }}
        cellTransform={ Shared.cellColorTransform }/>
    }
  }
}
