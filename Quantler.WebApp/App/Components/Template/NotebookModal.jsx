import Modal from '../Modal/Modal.jsx'
import {Component} from 'react'

export class NotebookModalButton extends Component {
  state = {
    modalOpen: false
  }

  openModal = (e) => {
    e.stopPropagation()
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  render () {
    let { template } = this.props

    return (
      <a onClick={ this.openModal }>
        <span>
          <i className="fa fa-book pull-right"/>
        </span>

        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this.closeModal }
        >
          <div>
            <div className="modal-body">
                  <span>
                    <div className="note-editor"
                         dangerouslySetInnerHTML={{
                           __html: (template.Comment
                             ? template.Comment
                             : 'No Comment')
                         }}>
                    </div>
                  </span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={ this.closeModal }
              >Close
              </button>
            </div>
          </div>
        </Modal>
      </a>
    )
  }
}
