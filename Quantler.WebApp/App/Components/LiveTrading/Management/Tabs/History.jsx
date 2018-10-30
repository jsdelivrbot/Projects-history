import React from 'react'
import Radium from 'radium'
import {Table, NoAvailable} from '../Table/Table.jsx'
import {tabsHeaders} from './Shared.jsx'
import Shared from '../Shared.jsx'
import {valuesOrdered, _try} from '../../../../Functions/Utils/Utils.jsx'
import Utils from '../../../../Functions/Utils/Utils.jsx'

@Radium
export class History extends React.Component {
  headers = tabsHeaders.concat
  (["STATUS"])

  keys = [
    'ID',
    'AgentName',
    'Direction',
    'ModifiedDateTimeUTC',
    'Symbol',
    'Size',
    'LimitPrice',
    'StopPrice',
    'Type',
    'Valid',
    'Status'
  ]

  match = {
    ModifiedDateTimeUTC: _ => Utils.formatTime(_),
    Valid: _ => _ ? 'Yes' : 'No',
    Status: _ => (_ == 'OK') ? '✔' : '⚠',
    Size: _ => Utils.formatK(_)
  }

  render () {
    let { headers, props, keys, transform } = this
    let rows = valuesOrdered(keys, props.history, Shared.transformer(this.match))

    if (!rows.length) {
      return <NoAvailable text="NO HISTORY AVAILABLE"/>
    } else {
      return <Table {...{ headers, rows }} stickyHeader={true}/>
    }
  }
}
