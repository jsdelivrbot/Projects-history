import {Component, PropTypes} from 'react'
import Modal                  from 'react-modal'

let QButton = require('../../../../Components/QButtons/Main.jsx')

let modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 99
  },
  content: {
    width: '562px',
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export class DeleteTemplateBtn extends Component {
  confirmInputText = ""
  state = { open: false }

  handleDeleteConfirm = () => {
    if (this.confirmInputText.toLowerCase() == "delete") {
      this.setState({ open: false })
      this.props.onClick()
    }
    else {
      alert("Please confirm by typing 'delete'")
    }
  }

  handleInputChange = (event) => {
    this.confirmInputText = event.target.value
  }

  handleToggleModal = () => {
    this.setState({ open: !this.state.open })
  }

  render () {
    
    return (
      <div>
        <QButton.Delete
          style={this.props.style || {}}
          className={" btn-danger " + this.props.className}
          text={this.props.title}
          onClick={this.handleToggleModal}/>

        <Modal
          style={modalStyles}
          isOpen={this.state.open}
          onRequestClose={this.handleToggleModal}
        >
          <div className="QModal modal-content" style={{ border: 'none', borderRadius: 5 }}>
            <div className='modal-body' style={{ padding: '10px 20px 10px 20px' }}>
              <h4><i className="fa fa-trash"/> &nbsp;&nbsp;&nbsp; {this.props.title}</h4>
              <br/>
              You are about to delete the template “{this.props.templateName}”. Deleting a template is irreversible. Are you sure
              you wish to delete the template?
              <br/><br/>
              Type the word ‘DELETE’ in the form below if you really want to delete the template.
              <br/><br/>
              <input type="text" defaultValue="" style={{ width: '100%', height: 45, padding: '0 12px' }}
                     onChange={this.handleInputChange}/>
            </div>

            <div className="modal-footer" style={{ outline: 'none', border: 'none' }}>
              <button type="button" className="btn btn-default pull-left" onClick={this.handleToggleModal}>
                Cancel
              </button>
              <button type="button"
                      className="btn btn-primary"
                      onClick={this.handleDeleteConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
