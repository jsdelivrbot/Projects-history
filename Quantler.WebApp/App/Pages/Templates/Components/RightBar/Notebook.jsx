import {Component, PropTypes} from 'react'
import * as TemplatesEditor     from '../../Functions/Editor.jsx'
import _                        from 'lodash'
import Modal                    from 'react-modal'

let QButton = require('../../../../Components/QButtons/Main.jsx')

class NotebookModal extends Component {
  editor = _.uniqueId('editor')

  componentDidMount () {
    $(() => {
      window.CKEDITOR.replace(this.editor, {
        removePlugins: 'about',
        extraPlugins: 'codesnippet',
        skin: 'office2013,/Files/office2013/'
      })

      window.CKEDITOR.instances[this.editor].on("change", (event) => {
        this.props.onChange(event.editor.getData())
      })
    })
  }

  componentWillUnmount () {
    window.CKEDITOR.instances[this.editor].destroy()
  }

  render () {
    let { template, onOk, onCancel } = this.props

    return (
      <div className="QModal">
        <div className="modal-body" style={{ padding: 15 }}>
          <h4>
            <span>{ template.Name }</span> &nbsp;
            <span style={{ fontWeight: 'normal' }}>Notebook</span>
          </h4>
          <br/>
          <textarea defaultValue={ template.Comment } id={this.editor} name="content"/>
        </div>
        <div className="modal-footer">
          <button onClick={ onCancel }
                  className="btn btn-default pull-left"
          > Cancel
          </button>
          <button onClick={ onOk }
                  className="btn btn-primary"
          > &nbsp; Ok &nbsp;
          </button>
        </div>
      </div>
    );
  }
}

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
    width: '740px',
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export class NotebookBtn extends Component {
  template = {}
  notebookContent = ""
  state = { open: false }

  openModal = () => this.setState({ open: true })
  hideModal = () => this.setState({ open: false })

  handleCancel = () => {
    this.hideModal()
  }

  handleOk = () => {
    if (this.template.Comment != this.notebookContent) {
      TemplatesEditor.updateTemplate
      ({
        templateId: this.template.ID,
        content: { Comment: this.notebookContent }
      })
    }

    this.hideModal()
  }

  handleChange = (editorHTML) => {
    this.notebookContent = editorHTML
  }

  render () {
    let { templates, activeTemplateId } = this.props

    this.template = _.find(templates, { ID: activeTemplateId })

    this.notebookContent = this.template ? this.template.Comment : ''

    return (
      <div>
        <a onClick={this.openModal}>
          <button className="btn" style={{ padding: '10px 25px' }}>
            <span>Notebook</span>
                        <span>
                            &nbsp;&nbsp;&nbsp;
                          <i className="fa icon-notebook fa-align-right"/>
                        </span>
          </button>
        </a>
        <Modal isOpen={this.state.open} style={modalStyles}>
          <NotebookModal
            template={this.template}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            onChange={this.handleChange}
          />
        </Modal>
      </div>
    )
  }
}
