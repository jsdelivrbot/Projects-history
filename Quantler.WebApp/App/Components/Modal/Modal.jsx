import Modal from 'react-modal'
import _ from 'lodash'

let style =
{
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 99
  },
  content: {
    width: '850px',
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none'
  }
}

export default props => <Modal {...(_.omit(props, ['style']))} style={ Object.deepExtend(style, (props.style || {})) }/>
