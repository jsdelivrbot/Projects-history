import {Component}         from 'react';
import _                     from 'lodash';
import {Template}          from '../../../../Services/API/Models.jsx';
import {saveTemplate}      from '../../../../Services/API/Template/Main.jsx';
import {DeleteTemplateBtn} from './DeleteTemplateBtn.jsx';
import {NotebookBtn}       from './Notebook.jsx';
import {State, connect}    from '../../../../State.jsx'
import {SideBar}           from '../SideBar/Main.jsx'
import * as TemplatesUI      from '../../Functions/UI.jsx'
import * as TemplatesEditor  from '../../Functions/Editor.jsx'
import Radium                from 'radium'
import Modal                 from '../../../../Components/Modal/Modal.jsx'
import Tooltip               from '../../../../Components/Tooltip/Tooltip.jsx'

class ParameterModal extends Component {
  state = { modalOpen: false }

  openModal = () => this.setState({ modalOpen: true })

  closeModal = () => this.setState({ modalOpen: false })

  render () {
    let { Name, Comment } = this.props.parameter
    let headerStyle = { fontSize: 16, margin: '40px 0 20px 40px' }

    return (
      <span>
        <i className="fa fa-info-circle pull-right"
           style={{ color: '#ee4415' }}
           onClick={ this.openModal }/>
          <Modal
            style={{ width: 600 }}
            onRequestClose={ this.closeModal }
            isOpen={ this.state.modalOpen }
          >
            <div ref="modalBody" className="QModal">
              <h4 className="pull-left" style={ headerStyle }>
                Parameter: { Name }
              </h4>

              <div className="row">
                <div className="col-md-12" style={{ padding: '0 40px 0 40px' }}>
                  <p style={{ textAlign: 'justify' }}>
                    { Comment }
                  </p>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={ this.closeModal }
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
      </span>
    )
  }
}

let modalStyles = {
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
    width: '600px',
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

let updateStyles = {
  button: {
    backgroundColor: '#5bc0de',
    borderColor: '#46b8da',
    marginTop: 10,
    padding: '10px 30px',
    ':hover': {
      backgroundColor: '#31b0d5',
      borderColor: '#269abc'
    }
  }
}

let freeStyle = {
  width: 60,
  backgroundColor: '#3e3f4b',
  padding: '3px 13px',
  fontSize: 14,
  color: '#FFF',
  fontWeight: 'bold',
  borderRadius: 4,
  margin: 5
}

class EnableSharing extends Component {
  state = {
    modalOpen: false,
    sharingEnabled: false
  }

  enableSharing = () => {
    this.setState({
      modalOpen: false,
      sharingEnabled: true
    })

    TemplatesEditor.enableSharing({
      templateId: this.props.template.ID
    })
  }

  cancelEnableSharing = () => {
    this.setState({
      modalOpen: false,
      sharingEnabled: false
    })
  }

  toggleEnableSharing = () => {
    if (this.state.sharingEnabled) {
      this.setState({
        sharingEnabled: false
      })

      TemplatesEditor.enableSharing({
        templateId: this.props.template.ID,
        disable: true
      })
    }
    else {
      this.setState({
        sharingEnabled: true,
        modalOpen: true
      })
    }
  }

  componentWillMount () {
    this.state.sharingEnabled = this.props.template.IsPublic
  }

  componentWillReceiveProps ({ template }) {
    if (this.props.template != template) {
      this.state.sharingEnabled = template.IsPublic
    }
  }

  render () {
    return (
      <div className="row" style={{ paddingLeft: 10 }}>

        <div style={{ float: 'left' }}>
          <input onChange={this.toggleEnableSharing}
                 checked={this.state.sharingEnabled}
                 id="cmn-toggle-2"
                 className="cmn-toggle cmn-toggle-round"
                 type="checkbox"/>
          <label htmlFor="cmn-toggle-2"></label>
        </div>

        <span style={{ float: 'left', marginLeft: 10 }}>Enable Sharing</span>

        <Tooltip overlay={`${this.state.sharingEnabled ? 'Disable' : 'Enable'} Public Sharing`}>
          <i className="fa fa-info-circle" style={{ color: '#ee4415', float: 'right' }}/>
        </Tooltip>

        <Modal
          isOpen={this.state.modalOpen}
          style={modalStyles}
          onRequestClose={this.cancelEnableSharing}>

          <div className="QModal">
            <div className="modal-body">
              <div className="row" style={{ padding: '20px 0 0 35px', marginBottom: -10 }}>
                <h5 style={{ fontSize: 16 }}><i className="fa fa-share"/> &nbsp; Are you sure you want to share?</h5>
                <br/>
              </div>
              <div className="row">
                <center>
                  <div style={{ width: 214 }}>
                    <div style={ freeStyle }>
                      Free
                    </div>
                    <div style={{ paddingBottom: 7 }}>
                      Share this template for free, we will not hide this templates source code
                    </div>
                    <div style={{ margin: '0 auto' }}>
                      <input onChange={ () => false }
                             checked="checked"
                             id="cmn-toggle-3"
                             className="cmn-toggle cmn-toggle-round"
                             type="checkbox"/>
                      <label htmlFor="cmn-toggle-3"></label>
                    </div>
                    <br/>
                  </div>
                </center>
              </div>
            </div>

            <div className="modal-footer">
              <button style={{ padding: '0 30px', fontSize: 15 }} onClick={this.cancelEnableSharing} key={0}
                      type="button" className="btn btn-danger pull-left">
                Cancel
              </button>
              <button style={{ padding: '0 30px', fontSize: 15 }} onClick={this.enableSharing} key={1} type="button"
                      className="btn btn-danger">
                Confirm
              </button>
            </div>
          </div>

        </Modal>

      </div>
    )
  }
}

class TemplateName extends Component {
  constructor (props) {
    super()
    this.state = {
      value: props.template.Name,
      template: props.template
    }
  }

  componentWillReceiveProps ({ template }) {
    if (template.ID != this.state.template.ID) {
      this.setState({ value: template.Name, template })
    }
  }

  handleNameChange = ({ target }) => {
    TemplatesEditor.updateTemplate({
      templateId: this.props.template.ID,
      content: { Name: target.value }
    })
  }

  nameChange = ({ target }) => {
    this.setState({ value: target.value })
  }

  render () {
    return <input
      value={ this.state.value }
      className="setting-form form-control"
      onChange={ this.nameChange }
      onBlur={ this.handleNameChange }/>
  }
}

@Radium
class Update extends Component {
  render () {
    let { templatesUpdating, template } = this.props

    if (!template.needsUpdate) return null

    let templateIsUpdating = (templatesUpdating[template.ID] === true)

    return (
      <div className="row selectionmenu templateSettingsBtns">
        <hr/>
        <center>
          <span>This template is out of date</span> <br/>
          <button
            disabled={ templateIsUpdating }
            className="btn btn-info"
            style={[updateStyles.button]}
            onClick={ () => TemplatesEditor.updatePublicTemplate(template) }
          >
            Update Now
          </button>
        </center>
      </div>
    )
  }
}

class TemplateSettings extends Component {
  toggleAutoDiscovery (template) {
    TemplatesEditor.updateTemplate({
      templateId: template.ID,
      content: {
        IsEnabled: !template.IsEnabled
      }
    })
  }

  render () {
    let { activeTemplateId, templates, templatesUpdating } = this.props

    if (!activeTemplateId) {
      let textStyle = {
        width: '100%',
        textAlign: 'center',
        paddingTop: 20,
        color: '#444'
      }

      return (
        <div style={ textStyle }>
          <p>Select a template on the sidebar</p>
        </div>
      )
    }

    let template = _.find(templates, { ID: activeTemplateId })

    return (
      <form onSubmit={(e) => e.preventDefault()}>

            {/* Template name */}
              <div className="row selectionmenu" style={{ padding: '0 10px 0 10px' }}>
                <div className="row" style={{ paddingLeft: 10, marginBottom: 20 }}>
                  <span className="setting-title">Name</span>
                  <TemplateName template={ template }/>
                </div>
                   {/* Toggles */}
                <div className="row" style={{ paddingLeft: 10 }}>
                  <div style={{ float: 'left' }}>
                    <input
                      id="cmn-toggle-1"
                      className="cmn-toggle cmn-toggle-round"
                      type="checkbox"
                      checked={ template.IsEnabled }
                      onChange={ () => this.toggleAutoDiscovery(template) }/>
                    <label htmlFor="cmn-toggle-1"></label>
                  </div>
                  <span style={{ float: 'left', marginLeft: 10 }}>Auto Discovery</span>
                  <Tooltip overlay={`${template.IsEnabled ? 'Disable' : 'Enable'} Auto Discovery Usage`}>
                    <i className="fa fa-info-circle" style={{ color: '#ee4415', float: 'right' }}/>
                  </Tooltip>
                </div>
                <br/>
                   { (!template.IsFromPublic) && <EnableSharing template={template}/> }
              </div>

              <Update
                template={ template }
                templatesUpdating={ templatesUpdating }/>

            {/* Buttons */}
              <div className="row selectionmenu templateSettingsBtns">

                <hr/>

                <NotebookBtn {...{ templates, activeTemplateId }}/>

                <div className="row" style={{ paddingTop: 10 }}>
                  <DeleteTemplateBtn
                    templateName={template.Name}
                    title="Delete Template"
                    onClick={() => TemplatesEditor.setTemplateForDeletion(
                      {
                        templateId: template.ID
                      })}
                    text={`You are about to delete the following template and
                            all its associated codefiles and data.`}/>
                </div>

              </div>

      </form>
    )
  }
}

function CodeSettings () {
  let { activeFileName, templates, activeTemplateId } = State
    .getState()
    .Templates.Editor

  let activeTemplate = _.find(templates, { ID: activeTemplateId })
  let activeFile = _.find(activeTemplate.CodeFiles, { Name: activeFileName })

  if (!activeFile) {
    TemplatesEditor.EditorState({
      activeFileName: null
    })

    return null
  }

  return (
    <div className="selectionmenu">
      <div className="setting-title-top">
        <div>
          { activeFile.Name }
        </div>
        <div onClick={() => State.setState(
          {
            Templates: {
              UI: {
                rightBarView: 'templateSettings'
              }
            }
          }
        )}
        >
          <i className="fa fa-times"/>
        </div>
      </div>

      <br/>

      <div className="parameters">
           {
             activeFile.Parameters.length > 0 ?
               activeFile.Parameters.map((parameter, key) =>
                 (
                   <div key={ key } style={{ position: 'relative' }}>
                     <h6 className="setting-title">{ parameter.Name }</h6>
                     <ParameterModal parameter={ parameter }/>
                     <p>Min: { parameter.Min }</p>
                     <p>Max: { parameter.Max }</p>
                     <p>Inc: { parameter.Inc }</p>
                     <br/>
                   </div>
                 ))
               : <div className="text-center vertical-align">
               No parameters detected
             </div>
           }
      </div>

      <hr/>

      <DeleteTemplateBtn
        templateName={ activeFile.Name }
        style={{ margin: '0 auto', display: 'table', height: 36, width: 152 }}
        title="Delete File"
        onClick={() => TemplatesEditor.setFileForDeletion(
          {
            templateId: activeTemplate.ID,
            fileName: activeFile.Name
          })}
        text={ `You are about to delete the following template and
                all its associated codefiles and data.`}/>

    </div>
  )
}

@connect((state) => ({
  Editor: state.Templates.Editor
}))
export class RightBar extends Component {
  render () {
    let { props } = this
    let { activeTemplateId, activeFileName, templates, templatesUpdating } = props.Editor
    let { rightSidebarWidth, rightBarView } = props.UI

    let QSideBarOptions = {
      side: 'right',
      width: rightSidebarWidth,
      title: (rightBarView == 'parameters' ? 'Code Settings' : "Template Settings"),
      optionItems: [{
        element: <i className="fa fa-minus"/>,
        props: { onClick: () => TemplatesUI.rightSidebarWidth(0) }
      }],
      holderClass: "box-content",
      className: "col-sm-2 box-lrmenu box-right no-transition-all unselectable-all"
    }

    let Settings = () =>
      (rightBarView == 'templateSettings' || activeFileName == null
        ? <TemplateSettings { ...props.Editor }/>
        : <CodeSettings />)

    return (
      <SideBar {...QSideBarOptions}>
        <div>
          <Settings/>
        </div>
      </SideBar>
    )
  }
}
