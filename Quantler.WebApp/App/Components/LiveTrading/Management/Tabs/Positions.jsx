import React from 'react'
import Radium from 'radium'
import {Table, NoAvailable} from '../Table/Table.jsx'
import {valuesOrdered, _try} from '../../../../Functions/Utils/Utils.jsx'
import Utils from '../../../../Functions/Utils/Utils'
import Shared from '../Shared.jsx'

@Radium
export class Positions extends React.Component {
  headers = [
    'AGENT',
    'DIRECTION',
    'MODIFIED',
    'SYMBOL',
    'SIZE',
    'QUANTITY',
    'AVG PRICE',
    'PNL',
    'COMMISSION',
    'SWAP',
    'TRADES'
  ]

  keys = [
    'AgentName',
    'Direction',
    'LastModifiedDateTimeUTC',
    'Symbol',
    'Size',
    'Quantity',
    'AvgPrice',
    'UnrealizedPnL',
    'Commission',
    'Swap',
    'Trades'
  ]

  match = {
    AgentName: Shared.cell,
    LastModifiedDateTimeUTC: _ => Utils.formatTime(_),
    UnrealizedPnL: Shared.formatCurrencyCell,
    Commission: Shared.formatCurrencyCell,
    Swap: Shared.formatCurrencyCell,
    Size: _ => Utils.formatK(_),
  }

  render () {
    let { props, keys } = this
    let headers = props.headers || this.headers

    let rows = valuesOrdered(props.keys ||
      keys, props.positions, Shared.transformer(this.match))

    if (!rows.length) {
      return <NoAvailable text="NO POSITIONS AVAILABLE"/>
    } else {
      return <Table
        {...{ headers, rows }}
        cellTransform={ Shared.cellColorTransform }/>
    }
  }
}
