import React from 'react'
import Radium from 'radium'
import Modal from 'react-modal'
import {Icons, Fonts, Colors} from '../../../Components/Utils/GlobalStyles.jsx'
import {connect} from '../../../State.jsx'
import {startLiveTradingValue} from '../Functions/Backtest.jsx'
import Functions from '../../../Functions/Functions.jsx'
import _ from 'lodash'

let modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(62, 62, 75, 0.8)',
    zIndex: 99
  },
  content: {
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    backgroundColor: 'transparent'
  }
}

let style = {

  /* - Container, Inputs, Label - */

  container: {
    width: 680,
    height: 220,

    backgroundColor: '#ffffff',

    fontFamily: Fonts.openSans,
    fontSize: 14,
    color: Colors.primary,

    padding: 20,
  },

  header: {
    fontSize: 16,
    fontWeight: 300,
    letterSpacing: 0.9,

    marginBottom: 10
  },

  label: {
    fontSize: 12,
    fontWeight: 400,

    userSelect: 'none'
  },

  input: {
    outline: 'none',
    width: '100%',
    fontSize: 12,
    paddingLeft: 10,
    height: 50,
    borderRadius: 5,
    border: '1px solid rgba(61, 62, 75, 0.3)',
    marginBottom: 20,
    ':focus': {
      border: '1px solid '.concat(Colors.orange)
    }
  },

  /* - Checkbox - */

  checkbox: {
    height: 20,
    width: 20,

    position: 'relative',
    top: 10,

    marginLeft: 10
  },

  /* - Footer & Buttons - */

  footer: {
    height: 50,
    backgroundColor: Colors.primary,
    overflow: 'hidden'
  },

  button: ({ disabled }) => ({
    width: 133,
    height: 50,
    backgroundColor: Colors.secondary,
    border: 'none',
    fontFamily: Fonts.openSans,
    fontSize: 12,
    color: '#fff',
    fontWeight: 600,
    letterSpacing: 0.5,
    lineHeight: '50px',
    textAlign: 'center',
    opacity: disabled ? '0.5' : '1',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',

    float: 'left'
  }),

  /* - Message Error - */

  messageContainer: {
    paddingBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
  },

  message: (type) => ({
    height: 50,
    margin: '0 20px 0 20px ',
    opacity: 0.7,
    backgroundColor: (type == 'error'
      ? '#ed5565'
      : '#ffce54'),

    fontFamily: Fonts.openSans,
    fontSize: 12,
    lineHeight: '50px',
    color: (type == 'error'
      ? '#fff'
      : Colors.primary)
  }),

  icon: {
    fontSize: 18,
    marginRight: 5,
    marginLeft: 10,
    position: 'relative',
    top: 2
  }

}

let accounts = ['option1', 'option2', 'option3']

@connect(state => ({
  startLiveTrading: state.Backtester.startLiveTrading
}))
@Radium
export class StartLiveTradingModal extends React.Component {

  updateValue = (property, value) => ({ target }) => {
    // if (property == 'AccountID') {
    //   let {account} = this.refs['_' + target.value].props
    //   startLiveTradingValue(property, account.Username)
    //   startLiveTradingValue('PortfolioID', account.ID)
    // } else {
    //   startLiveTradingValue(property, _.isUndefined(value) ? target.value : value)
    // }
    startLiveTradingValue(property, _.isUndefined(value) ? target.value : value)
  }

  render () {
    let { updateValue, props } = this
    let { startLiveTrading, closeModal, modalIsOpen } = props
    let { selects, messages, value, processing } = startLiveTrading
    let { AgentName, Start, AccountID } = value
    let { accounts } = selects

    let _accounts = (accounts) && accounts.map((account) =>
      <option ref={'_' + account.ID} key={account.ID} value={account.ID} account={account}>
        { account.Broker.Name + ' - ' + account.Username }
      </option>)

    return (
      <div>
        <Modal isOpen={ modalIsOpen } onRequestClose={ closeModal } style={modalStyle}>
          <div style={[style.container]}>

            <div style={[style.header]}>Livetrading</div>

               {/* Agent Name input */}
            <label style={[style.label]} htmlFor='agentName'>Agent Name</label><br />
            <input style={[style.input]} value={ AgentName }
                   onChange={ updateValue('AgentName') } placeholder='Define your agent name'
            />

            {/* Select an account */}
            <select key='1' name="broker" className="setting-form form-control"
              style={[style.input, { float: 'left', width: '50%' }]}
              value={ AccountID } onChange={ updateValue('AccountID') }
            >
              <option value="none" disabled>
                Select an account
              </option>
              {_accounts}
            </select>

               {/* Checkbox */}
            <div className="checkbox-styled">
              <input
                id='directly'
                type='checkbox'
                checked={ Start }
                onClick={ updateValue('Start', !Start) }
              />
              <label htmlFor='directly'>
                Start Directly
              </label>
            </div>

          </div>

           {/* Error message */}
           {
             (!!messages.length) &&
             <div ref='errorMessage' style={[style.messageContainer]}>
               {
                 messages.map(({type, message}, key) =>
                   <div key={key} style={[style.message(type)]}>
                     <i style={[style.icon]} className='zmdi zmdi-alert-circle-o'></i>
                        {message}
                   </div>)
               }
             </div>
           }

           {/* Footer buttons */}
          <div style={[style.footer]}>
            <button
              style={[style.button({ disabled: processing })]}
              onClick={ closeModal }
              disabled={processing}
            >
              CANCEL
            </button>
            <button
              style={[style.button({ disabled: processing }), { float: 'right' }]}
              onClick={ () => Functions.LiveTrading.Management.Agent.checkAgent() }
              disabled={processing}
            >
              CONFIRM
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}
