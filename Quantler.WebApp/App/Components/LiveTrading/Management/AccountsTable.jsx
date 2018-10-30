import React from 'react'
import Radium, {keyframes} from 'radium'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import {Icons, Fonts, Colors} from '../../Utils/GlobalStyles.jsx'
import {Table, NoAvailable} from './Table/Table.jsx'
import {valuesOrdered, _try} from '../../../Functions/Utils/Utils.jsx'
import _ from 'lodash'
import Functions from '../../../Functions/Functions.jsx'
import {UpdatePortfolioModal} from './UpdatePortfolioModal.jsx'
import {connect} from '../../../State.jsx'
import {RemoveAccountModal} from './RemoveAccountModal.jsx'
import Shared from './Shared.jsx'

let fades = {
  'positive': keyframes({
    '0%': { background: 'transparent' },
    '25%': { background: 'rgba(160, 211, 104, 0.8)' },
    '75%': { background: 'rgba(160, 211, 104, 0.8)' },
    '100%': { background: 'transparent' },
  }, 'fadepositive'),
  'negative': keyframes({
    '0%': { background: 'transparent' },
    '25%': { background: 'rgba(241, 90, 107, 0.8)' },
    '75%': { background: 'rgba(241, 90, 107, 0.8)' },
    '100%': { background: 'transparent' },
  }, 'fadenegative'),
  'neutral': ''
}

@connect(state => ({
  accountUpdates: state.livetrading.management.accountUpdates,
  agents: state.livetrading.management.agents
}))
@Radium
export class AccountsTable extends React.Component {
  state = {
    modalOpen: false
  }

  headers = [
    "ID",
    "BROKER",
    "LEVERAGE",
    "BALANCE",
    "EQUITY",
    "MARGIN",
    "FREE MARGIN",
    "MARGIN LEVEL",
    "SO LEVEL",
    "FLOATING",
    "LATENCY",
    '', // delete account button
  ]

  rowKeys = [
    'AccountID',
    'BrokerName',
    'Leverage',
    'Balance',
    'Equity',
    'MarginUsed',
    'FreeMargin',
    'MarginLevel',
    'StopOutLevel',
    'UnrealizedPnL',
    'LatencyInMS'
  ]

  onRowClick (row) {
    Functions.LiveTrading.Management.Account.select({
      PortfolioID: row[0].props.account.PortfolioID,
      AccountID: row[0].props.account.AccountID
    })
  }

  // selectedAccount
  rowActive = ({ PortfolioID, AccountID }) => row => {
    return (
      row[0].props.account.AccountID == AccountID &&
      row[0].props.account.PortfolioID == PortfolioID
    )
  }

  match = {
    //
    // add the UpgradePortfolioModal
    //
    AccountID: (value, account) => {
      //
      // if the account has an update
      // available show update icon
      //
      let _update = this.props.accountUpdates[account.PortfolioID]

      let update = (!_update
        ? null
        : <UpdatePortfolioModal
        update={_update}
        account={account}/>)

      return (
        <span
          account={ account }
          key={ 'AccountID' }
          style={{ position: 'relative' }}>
          { value }
          { update }
            <AccountInfo account={ account }/>
        </span>
      )
    },
    FreeMargin: Shared.formatCurrencyCell,
    MarginUsed: Shared.formatCurrencyCell,
    UnrealizedPnL: Shared.formatCurrencyCell,
    Balance: Shared.formatCurrencyCell,
    Equity: Shared.formatCurrencyCell,
    MarginLevel: Shared.formatPercentageCell,
    StopOutLevel: Shared.formatPercentageCell,
    Leverage: (value, item, key) => {
      return Shared.cell('1:' + (value | 0), item, key)
    },
    LatencyInMS: (value, item, key) => {
      return Shared.cell(value + ' ms', item, key)
    }
  }

  transform = (_value, key, item) => {
    let value = (typeof _value == 'number'
      ? _value.toFixed(2)
      : _value)

    if (this.match[key]) {
      return this.match[key](value, item, key)
    } else {
      return Shared.cell(value, item)
    }
  }

  confirmDelete = () => {
    Functions.LiveTrading.Management
      .Account.delete(this.state.deleteAccount)
    this.closeModal()
  }

  openModal = (account) => {
    this.setState({
      modalOpen: true,
      deleteAccount: account
    })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  cellClass = _.uniqueId('_')

  cellTransform = (cell, item, items) => {
    let change = items[0].props.account.changes[item.key]

    if (change) {
      return cell({
        className: this.cellClass + change,
        style: {
          animation: 'fadeGreen 2s',
          animationName: fades[change]
        }
      })
    }

    return cell()
  }

  render () {
    let { headers, rowKeys, onRowClick, props, transform, cellTransform, cellClass } = this
    let rowActive = this.rowActive(props.selectedAccount)
    // if no accounts available
    //
    if (!_.size(props.accounts)) {
      return <NoAvailable text="NO ACCOUNTS AVAILABLE"/>
    }

    let rows = valuesOrdered(rowKeys, props.accounts, transform)
    // adding delete icon element
      .map(row => row.concat(
        <i style={{ fontSize: 20 }}
           className={ Icons.delete }
           onClick={ () => this.openModal(row[0].props.account) }/>))

    return (
      <div>
        <RemoveAccountModal
          agents={props.agents}
          account={this.state.deleteAccount}
          closeModal={this.closeModal}
          confirm={this.confirmDelete}
          modalIsOpen={this.state.modalOpen}/>
        <Table {...{ headers, rows }}
               onRowClick={ onRowClick }
               dontRowClick="last"
               cellTransform={ cellTransform }
               rowActive={ rowActive }/>
      </div>)
  }
}

// BROKER INFO ICON
let accountInfoStyle = {
  icon: {
    fontSize: 14,
    color: Colors.orange,
    paddingLeft: '10px',
    cursor: 'pointer'
  },
  tooltip: {
    table: {
      display: 'table',
      fontFamily: Fonts.openSans,
      fontSize: 12,
      color: Colors.white
    },
    tr: {
      display: 'table-row'
    },
    tdHeader: {
      display: 'table-cell',
      letterSpacing: 0.5,
      fontWeight: 600,
      padding: '5px 40px 5px 0'
    },
    tdContent: {
      display: 'table-cell',
      color: 'rgba(255, 255, 255, 0.9)'
    }
  }
}

let AccountInfo = Radium(({ account }) => {
  let { AccountType, BrokerName, AccountID } = account

  return (
    <Tooltip key={0} placement="bottom" mouseEnterDelay={0.2} overlay={
      <div style={[accountInfoStyle.tooltip]}>
        <div style={[accountInfoStyle.tooltip.table, { padding: '8px 0' }]}>
             {/* broker */}
               <div style={[accountInfoStyle.tooltip.tr,]}>
                 <div style={[accountInfoStyle.tooltip.tdHeader]}>
                   BROKER
                 </div>
                 <div style={[accountInfoStyle.tooltip.tdContent]}>
                      { BrokerName }
                 </div>
               </div>
             {/* type */}
               <div style={[accountInfoStyle.tooltip.tr]}>
                 <div style={[accountInfoStyle.tooltip.tdHeader]}>
                   TYPE
                 </div>
                 <div style={[accountInfoStyle.tooltip.tdContent]}>
                      { AccountType }
                 </div>
               </div>
             {/* account id */}
               <div style={[accountInfoStyle.tooltip.tr]}>
                 <div style={[accountInfoStyle.tooltip.tdHeader]}>ACCOUNT ID</div>
                 <div style={[accountInfoStyle.tooltip.tdContent]}>
                      { AccountID }
                 </div>
               </div>

        </div>
      </div>}
    >
      <i style={ accountInfoStyle.icon } className={ Icons.info }/>
    </Tooltip>
  )
})
