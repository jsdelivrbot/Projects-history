import React, {Component} from 'react'
import Radium, {Style} from 'radium'
import Modal from 'react-modal'
import QButton from '../QButtons/Main.jsx'
import {connect} from '../../State.jsx'

let modalStyle = {
  overlay: {
    zIndex: 998,
    backgroundColor: 'rgba(0, 0, 0, 0.51)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    overflow: 'hidden',
    background: '#000',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    width: 800,
    height: 450,
    padding: 0,
    zIndex: 999
  }
}

@connect(state => ({
  onBoarded: state.User.details.OnBoarded
}))
@Radium
export default class VideoButton extends Component {

  state = {
    open: false
  }

  handleToggleModal = () => {
    this.setState({ open: !this.state.open })
  }

  render () {
    let { onBoarded, videoSrc, style } = this.props

    //if (!onBoarded) return <div></div>
    
    return (
      <div style={{ float: 'right' }}>
        <QButton.Video text="HELP" onClick={ this.handleToggleModal } style={ style }/>

        <Style scopeSelector=".quantler-videoButton"
               rules={{
                 mediaQueries: {
                   '(max-width: 800px)': {
                     '.ReactModal__Content': {
                       transform: 'translate(-50%, -50%) scale(0.75) !important',
                       transition: 'transform 0.3s ease-in-out'
                     }
                   }
                 }
               }}/>
        <Modal isOpen={ this.state.open }
               style={ modalStyle }
               onRequestClose={this.handleToggleModal}
               overlayClassName="quantler-videoButton">

          <iframe id="ytplayer" type="text/html" width="800" height="450"
                  src={'https://www.youtube.com/embed/'+ videoSrc +'?controls=0&fs=1&rel=0&showinfo=0&color=white'}
                  frameBorder="0" allowFullScreen></iframe>

        </Modal>
      </div>)
  }
}
/* Default Video Source */
VideoButton.defaultProps = {
  videoSrc: '-DX3vJiqxm4',
  style: {
    height: 50
  }
};
