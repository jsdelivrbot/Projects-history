import React         from 'react'
import Radium        from 'radium'
import Modal         from 'react-modal'
import {Icons, Colors, Fonts} from '../Utils/GlobalStyles.jsx'

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

  input: {
    height: 40,
    width: '40%',

    paddingLeft: 10,
    borderRadius: 5,
    border: '1px solid rgba(61, 62, 75, 0.3) !important',

    outline: 'none'
  },

  /* - Footer & Buttons - */

  footer: {
    height: 50,
    backgroundColor: Colors.primary,
    border: 'none'
  },

  button: {
    width: 133,
    height: 50,
    backgroundColor: Colors.secondary,

    fontFamily: Fonts.openSans,
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.5,
    lineHeight: '50px',
    textAlign: 'center',

    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',

    float: 'right'
  }
}

@Radium
export default class DeleteModal extends React.Component {
  state = {
    input: ""
  }

  handleDeleteConfirm = () => {
    if (this.state.input.toLowerCase() == "delete") {
      this.props.callback()
      this.setState({ input: "" })
    }
  }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  render () {
    let { modalProps, title, description } = this.props

    return (
      <Modal {...modalProps} style={ modalStyle }>
        <div style={[style.container]}>
          <div style={ style.header }>
            <i className={ Icons.trash } style={ style.header.icon }/>
            <span style={{ fontSize: 16 }}>{ title }</span>
          </div>
          <span style={{ fontSize: 12 }}>{ description }</span>
          <br/><br/>
          <span style={{ fontSize: 12 }}>Type the word ‘DELETE’ in the form below if you really want to delete.</span>
          <br/><br/>
          <input type="text" placeholder='Type ‘DELETE’ to confirm' style={[style.input]}
                 onChange={this.handleInputChange}/>
        </div>

        <div style={ style.footer }>
          <div
            style={[style.button, { float: 'left' }]}
            onClick={ () => modalProps.onRequestClose() }
          >
            CANCEL
          </div>
          <div style={[style.button]} onClick={this.handleDeleteConfirm}>
            CONFIRM
          </div>
        </div>
      </Modal>
    )
  }
}
