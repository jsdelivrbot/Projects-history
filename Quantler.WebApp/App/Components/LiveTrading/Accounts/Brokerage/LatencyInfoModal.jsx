import {Component} from 'react'
import Radium, {Style} from 'radium'
import {Icons, Colors} from '../../../Utils/GlobalStyles.jsx'
import _ from 'lodash'
import Modal from '../../../Modal/Modal.jsx'
import BrokersLatencyJSON from './brokers_latency.json'

/* Forex Brokers Info JSON */
let brokersInfo = BrokersLatencyJSON

let tableStyle = {
  'th': {
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    boxShadow: '0px 2px 0px rgba(0,0,0,0.1)'
  },
  'th span': {
    fontSize: 14,
    color: Colors.primaryLight
  },
  'th:hover span': {
    color: Colors.primary
  },
  'th i': {
    position: 'absolute',
    color: Colors.primaryLightGrey,
    fontSize: 14,
    bottom: 5,
    right: 12
  },
  'th:hover i': {
    color: Colors.primaryLight
  },
  'td': {
    textAlign: 'center',
    cursor: 'default'
  },
  'td span': {
    color: Colors.primaryLight
  }
}

@Radium
export default class LatencyInfoModal extends Component {

  state = {
    isOpen: false,
    sortMethod: 'asc'
  }

  icons = {
    broker: Icons.sort,
    london: Icons.sort,
    eua: Icons.sort
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  sortBy = (type, name) => {
    this.icons = _.mapValues(this.icons, () => Icons.sort)
    this.icons[ name ] = this.state.sortMethod === 'asc' ? Icons.sortAmountAsc : Icons.sortAmountDesc
    brokersInfo = _.orderBy(brokersInfo, [ type ], [ this.state.sortMethod ])
    this.setState({
      sortMethod: this.state.sortMethod === 'asc' ? 'desc' : 'asc'
    })
  }

  componentDidMount () {
    this.sortBy('name', 'broker')
  }

  render () {
    return (
      <span style={{ color: 'rgb(238, 68, 21)', fontSize: 12, fontWeight: 'bold', cursor: 'pointer' }} onClick={ this.toggleModal }>
        <span style={{ fontSize: 12 }}>See Latency overview.</span>

        <Modal isOpen={ this.state.isOpen } onRequestClose={ this.toggleModal }
               style={{ content: { height: '80%', maxWidth: '50%', minWidth: 600, overflow: 'initial' }}}>

          <Table sortBy={ this.sortBy } icons={ this.icons }/>

        </Modal>

      </span>
    )
  }
}

class Table extends Component {

  componentDidMount () {
    $('.scrollbar-inner').scrollbar('destroy')
    $(() => $('.scrollbar-inner').scrollbar())
  }

  render () {
    return (
      <div className="scrollbar-inner">
        <Style scopeSelector=".latency-table" rules={ tableStyle }/>

        <table className="table table-striped table-bordered table-condensed latency-table" style={{paddingRight: 10}}>
          <TableHeader sortBy={ this.props.sortBy } icons={ this.props.icons }/>
          <TableBody />
        </table>
      </div>
    )
  }
}

class TableHeader extends Component {
  render () {
    let { broker, london, eua } = this.props.icons
    return (
      <thead>
      <tr>

        <th className="header">
          <span className="sort-indicator"></span>
        </th>

        <th onClick={ this.props.sortBy.bind(this, 'name', 'broker') }>
          <i className={ broker }/>
          <span>Broker</span>
        </th>

        <th onClick={ this.props.sortBy.bind(this, 'latency.london', 'london') }>
          <div>
            <img src="Art/Images/brokers/uk_flag.png"/>
          </div>
          <i className={ london }/>
          <span>London, UK</span>
        </th>

        <th onClick={ this.props.sortBy.bind(this, 'latency.eua', 'eua') }>
          <div>
            <img src="Art/Images/brokers/us_flag.png"/>
          </div>
          <i className={ eua }/>
          <span>New York, USA</span>
        </th>

      </tr>
      </thead>
    )
  }
}

class TableBody extends Component {
  render () {
    return (
      <tbody>
      {
        brokersInfo.map((broker, index) =>
          <tr key={index}>
            <td style={{ textAlign: 'center' }}>
              <img src={ broker.image } style={{ maxHeight: 80 }}/>
            </td>
            <td>
              <span>{ broker.name }</span>
            </td>
            <td>
              <span>Contact Support</span>
            </td>
            <td>
              <span>{ broker.latency.eua } ms</span>
            </td>
          </tr>)
      }
      </tbody>)
  }
}