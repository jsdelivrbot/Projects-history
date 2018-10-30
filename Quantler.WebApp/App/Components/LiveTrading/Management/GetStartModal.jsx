import React from 'react'
import Radium from 'radium'
import Modal from 'react-modal'
import {Fonts, Colors} from '../../Utils/GlobalStyles.jsx'
import {LoginService} from '../../../Services/API/Login/Main.jsx'

let modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(62, 62, 75, 0.85)',
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

let Styles = () => {

  return {
    container: {
      fontFamily: Fonts.openSans,
      cursor: 'default',
      fontWeight: 300,
      color: Colors.white,
      textAlign: 'center'
    },

    title: {
      fontSize: 40
    },

    subTitle: {
      fontSize: 18,
      letterSpacing: 0.7,
      fontWeight: 700
    },

    buttons: {
      marginTop: 68,
      display: 'inline-block',
      container: {
        margin: '0 32px',
        float: 'left'
      }
    },

    message: {
      fontSize: 12,
      lineHeight: 2.5,
      color: 'rgba(255, 255, 255, 0.9)'
    }
  }
}

let style = Styles()

@Radium
export class GetStartModal extends React.Component {
  render () {
    let { getStarted } = this.props

    return (
      <div style={{ display: 'inline' }}>
        <Modal isOpen={ true } style={ modalStyle }>
          <div style={[style.container]}>

            <div style={[style.title]}>LIVE TRADING MANAGEMENT</div>
            <div style={[style.subTitle]}>MANAGE YOUR LIVE TRADING</div>

            <div style={[style.buttons]}>

              <div style={[style.buttons.container]}>
                <Button value="NO NOT YET" onClick={ getStarted(false) }/>
                <div style={[style.message]}>( Get back to previous screen )</div>
              </div>

              <div style={[style.buttons.container]}>
                <Button value="GET STARTED" onClick={ getStarted(true) } type='orange'/>
                <div style={[style.message]}>( Create your first account )</div>
              </div>

            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

/*
 - This Modal will be used temporarily
 */
@Radium
export class PresentationModal extends React.Component {

  handleLogout () {
    LoginService.logout(() => {
      console.log('Failed to logout.')
    })
  }

  render () {
    return (
      <div style={{ display: 'inline' }}>
        <Modal isOpen={ true } style={ modalStyle }>
          <div style={[style.container]}>

            <div style={[style.title]}>WELCOME TO QUANTLER</div>
            <div style={[style.subTitle]}>WHOOPS, WE ARE NOT READY YET</div>

            <div style={[style.buttons]}>

              <div style={[style.buttons.container]}>
                <Button value="LOGOUT" onClick={ () => this.handleLogout() }/>
                   {/* You may delete this div (below) if you don't want the message */}
                <div style={[style.message]}>( Come back later )</div>
              </div>

              <div style={[style.buttons.container]}>
                <a href="mailto:support@quantler.com">
                  <Button value="CONTACT" type='orange'/>
                </a>
                <div style={[style.message]}>( Contact us )</div>
              </div>

            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

/*---- BUTTONS */

let Button = Radium(({ value, onClick, type }) => {
  return <button style={[buttonStyle(type)]} onClick={onClick}>{value}</button>
})

let buttonStyle = (type) => {

  return {
    height: 43,
    width: 170,

    background: type !== 'orange'
      ? 'radial-gradient(ellipse farthest-corner at 50% -50%, #5B5C66, #31323e 85%)'
      : 'radial-gradient(ellipse farthest-corner at 50% -50%, #F8792E, #EE4515 50%)',

    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
    border: 'none',
    padding: '0 25px',
    opacity: 0.8,
    ':hover': {
      opacity: 1
    },

    color: Colors.white,
    fontSize: 12,
    fontWeight: 600
  }
}
