import React from 'react'
import Radium from 'radium'
import Modal from 'react-modal'
import {Icons, Fonts, Colors} from '../../../Components/Utils/GlobalStyles.jsx'
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

  /* - Popup icon, Container, Input - */

  iconButton: {

    fontSize: 20,

    userSelect: 'none',
    cursor: 'pointer'

  },

  container: {
    width: 562,

    backgroundColor: '#ffffff',

    fontFamily: Fonts.openSans,
    fontSize: 12,
    color: Colors.primary,

    padding: 20
  },

  header: {

    fontWeight: 700,

    cursor: 'default',
    userSelect: 'none',

    marginBottom: 10,

    icon: {
      fontSize: 18,
      color: Colors.primaryLight,
      marginRight: 10
    }
  },

  paragraph: {
    fontSize: 12,
    lineHeight: 1.8
  },

  versions: {
    fontSize: 12,
    fontWeight: 600,
    color: Colors.primaryLightGrey,
    margin: '15px 0'
  },

  icon: {
    margin: '0 10px',
    color: Colors.secondary,
    fontWeight: 600
  },

  versionBold: {
    fontWeight: 700,
    color: Colors.primary
  },

  input: {
    height: 40,
    width: '40%',

    paddingLeft: 10,
    borderRadius: 5,
    border: '1px solid rgba(61, 62, 75, 0.3)',

    outline: 'none',

    ':focus': {
      border: '1px solid '.concat(Colors.orange)
    }
  },

  /* - Footer & Buttons - */

  footer: {
    height: 50,
    backgroundColor: Colors.primary
  },

  button: {
    width: 133,
    height: 50,
    backgroundColor: Colors.secondary,

    fontFamily: Fonts.openSans,
    color: '#fff',
    fontWeight: 600,
    letterSpacing: 0.5,
    lineHeight: '50px',
    textAlign: 'center',

    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',

    float: 'left'
  }
}

@Radium
export class RemoveAccountModal extends React.Component {
  state = {
    input: ''
  }

  valueUpdate = ({ target }) => {
    this.setState({ input: target.value })
  }

  confirm = () => {
    if (this.state.input.toLowerCase() == 'delete') {
      this.props.confirm()
      this.setState({ input: '' })
    }
  }

  render () {
    let { closeModal, modalIsOpen, account, agents } = this.props
    if (!account) return null
    let portfolioAgents = agents[account.PortfolioID] || []
    let connectedAgents = _.filter(portfolioAgents, (agent) =>
    agent.DefaultAccountID == account.AccountID)
      .map((agent) => agent.Name)
      .join(', ')

    return (
      <Modal isOpen={ modalIsOpen } onRequestClose={ closeModal } style={modalStyle}>
        <div style={[style.container]}>

          <div style={[style.header]}>
            <i className={ Icons.delete } style={ style.header.icon }/>
            <span style={{ fontSize: 16 }}>Delete Account</span>
          </div>

          <p style={[style.paragraph] }>
            You are about to delete an account.
            This means your trading agents will not be able to trade with this account.
            Deleting an account will not automatically close all its positions and pending orders.
            You will have to do this manually at your broker.
            Are you sure you want to delete?
          </p>

          <div style={[style.versions]}>

            Account to be deleted: &nbsp;
              <span style={ [style.versionBold]}>
                { account.AccountID }
              </span>

            <br />

            Connected agents: &nbsp;
              <span style={ [style.versionBold]}>
                { connectedAgents }
              </span>

          </div>

          <p style={ [style.paragraph] }>
            Type the word ‘DELETE’ in the form below if you really want to delete this account.
          </p>

          <input
            key='1'
            onChange={ this.valueUpdate }
            value={ this.state.input }
            style={ [style.input] }
            placeholder="Type DELETE to confirm"/>

        </div>

             {/* Footer */}
        <div style={[style.footer]}>
          <div style={[style.button, { float: 'left' }]} onClick={ closeModal }>
            CANCEL
          </div>
          <div style={[style.button, { float: 'right' }]} onClick={ this.confirm }>
            CONFIRM
          </div>
        </div>
      </Modal>
    )
  }
}
