import React from 'react'
import Radium from 'radium'
import Modal from 'react-modal'
import {Icons, Fonts, Colors} from '../../../Components/Utils/GlobalStyles.jsx'
import Functions from '../../../Functions/Functions.jsx'
import {connect} from '../../../State.jsx'

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

  popup: {
    width: 22,
    height: 22,
    borderRadius: 2,
    backgroundColor: Colors.secondary,
    boxShadow: '0 2px 0 0 '.concat(Colors.secondaryDarker),

    userSelect: 'none',
    cursor: 'pointer',

    color: Colors.white,
    fontSize: 15,
    fontWeight: 300,
    textAlign: 'center',
    paddingTop: 3

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
    fontSize: 16,
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
    lineHeight: 1.8
  },

  versions: {
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
};

let currentVersion = 1.102;
let updatedVersion = 1.204;

@connect(state => ({
  accountUpdating: state.livetrading.management.accountUpdating
}))
@Radium
export class UpdatePortfolioModal extends React.Component {

  state = {
    modalIsOpen: false,
    input: ''
  }

  openModal = (e) => {
    e.stopPropagation()
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  input = ({ target }) => {
    this.setState({
      input: target.value
    })
  }

  confirm = () => {
    if (this.state.input.toLowerCase() === 'confirm') {
      Functions.LiveTrading.Management
        .Account.update(this.props.account.PortfolioID)

      this.closeModal()
    }
  }

  render () {
    let { accountUpdating } = this.props

    //
    // if there is an account being
    // updated disabled onClick ("locks")
    //
    let onClick = (!!accountUpdating.length
      ? null
      : this.openModal)

    let { CurrentVersion, NewVersion } = this.props.update

    let accountUpdatingStyle = (accountUpdating.length
      ? { opacity: '0.5' }
      : {})

    return (
      <div style={{ position: 'absolute', top: -4, left: -25 }}>
        <i
          className={Icons.refresh}
          style={[style.popup, accountUpdatingStyle]}
          onClick={ onClick }/>
        <Modal isOpen={ this.state.modalIsOpen } onRequestClose={ this.closeModal } style={modalStyle}>
          <div style={[style.container]}>

            <div style={[style.header]}>
              <i className={ Icons.refresh }
                 style={ style.header.icon }/>
              <span style={{ fontSize: 16 }}>
                Confirm Update
              </span>
            </div>

            <p style={[style.paragraph] }>
              You are about to update your account. This means your trading agents will not be able to trade
              with this account for the duration of the update (+/- 5 minutes). Are you sure you want to update?
              NOTE: Updating your account will unsync any pending orders and positions with your account. You will have to manage these manually at your broker.
            </p>

            <div style={[style.versions]}>
              Current version: {
                   CurrentVersion.Major + '.' +
                   CurrentVersion.Minor + '.' +
                   CurrentVersion.Patch
                 }
              <i className={ Icons.rightArrow } style={ [style.icon] }/>
              <span style={ [style.versionBold]}>
                Updated version: {
                      NewVersion.Major + '.' +
                      NewVersion.Minor + '.' +
                      NewVersion.Patch
                    }
              </span>
            </div>

            <p style={ [style.paragraph] }>Type the word ‘CONFIRM’ in the form below if you really want to update this
              account.</p>
            <input
              key='1'
              style={ [style.input] }
              placeholder="Type CONFIRM to confirm"
              onChange={ this.input }/>

          </div>

               {/* Footer */}
          <div style={[style.footer]}>
            <div style={[style.button, { float: 'left' }]} onClick={ this.closeModal }>
              CANCEL
            </div>
            <div style={[style.button, { float: 'right' }]} onClick={ this.confirm }>
              CONFIRM
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
