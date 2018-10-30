import * as React            from 'react'
import {connect}           from '../../../../State.jsx'
import {handleToggleModal} from '../../Functions/UI.jsx'
let Modal = require('react-modal')

let modalStyle = {
  overlay: {
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.51)'
  },
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    padding: 0
  }
}

export default class AddNewFileModalOld extends React.Component {

  state = {
    fileName: '',
    loading: false,
    done: false
  }

  // passed to the props.handleAdd()
  // to update modal state when API call
  // for adding file is called and finished
  update = (state) => {
    this.setState(state)
  }

  handleAdd () {
    if (this.state.fileName.length > 0) {
      this.props.handleAdd(this.state.fileName, this.update)
    }
  }

  componentDidUpdate () {
    if (this.state.done) {
      this.state = {
        fileName: '',
        loading: false,
        done: false
      }

      handleToggleModal('addNewFile')
    }
  }

  render () {
    let { open } = this.props

    let headerStyle = {
      padding: '15px 0 0 20px',
      fontWeight: 300,
      fontSize: 16,
      color: '#31323e',
      textAlign: 'left'
    }

    return (
      <Modal className="Modal__Bootstrap modal-dialog"
             isOpen={ open }
             onRequestClose={ handleToggleModal('addNewFile') }
             style={ modalStyle }
      >
        <div className="QModal">

          <div>
            <div className="modal-body" style={{ position: 'relative' }}>

              <i onClick={ handleToggleModal('addNewFile') }
                 className="fa fa-close"
                 style={{ position: 'absolute', top: 10, right: 20, cursor: 'pointer' }}/>

              <h5 style={headerStyle}>Add a new file</h5> <br/>

                 { !this.state.loading && !this.state.done &&
                 <div style={{ padding: '0 40px 20px 40px', width: '100%' }}>
                   <h6>File name</h6>
                   <input type="text"
                          className="q-input"
                          placeholder="Define your file name"
                          value={this.state.fileName}
                          onChange={(e) => this.setState({ fileName: e.target.value })}/>
                 </div>
                 }

                 { this.state.loading && !this.state.done &&
                 <center>
                   <br/>
                   <i key={0} className="fa fa-circle-o-notch fa-spin"
                      style={{ color: '#a0d468', fontSize: 54, verticalAlign: 'middle' }}/>
                   <br/><br/>
                 </center>
                 }

                 { this.state.done &&
                 <center>
                   <h3>Done!</h3>
                   <br/>
                 </center>
                 }

            </div>

            <div className="modal-footer">
                 { !this.state.loading && !this.state.done &&
                 <button type="button"
                         className="btn btn-danger"
                         style={{ float: 'right' }}
                         onClick={this.handleAdd.bind(this)}>Add</button>
                 }
                 { this.state.done &&
                 <button type="button"
                         className="btn btn-danger"
                         style={{ float: 'right' }}
                         onClick={ handleToggleModal('addNewFile') }>Close</button>
                 }
            </div>
          </div>
        </div>
      </Modal>
    )
  }

}

export let AddNewFileModal = connect(state =>
  ({
    open: state.Templates.UI.modals.addNewFile
  })
)(AddNewFileModalOld)
