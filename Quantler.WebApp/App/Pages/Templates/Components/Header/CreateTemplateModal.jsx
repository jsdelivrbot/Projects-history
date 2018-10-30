import * as React           from 'react'
import {default as _}       from 'lodash'
import moment               from 'moment'
import {tabr}               from '../../../../Components/Tabr/Main.jsx'
import {PubSub}             from '../../../../Services/Utils/pubsub.jsx'
import * as TemplateAPI     from '../../../../Services/API/Template/Main.jsx'
import * as TemplatesEditor from '../../Functions/Editor.jsx'
import {setCollapsrState}   from '../LeftBar/LeftBar.jsx'
import {State}            from '../../../../State.jsx'

let QModal = require('../../../../Components/QModal/Main.jsx')

let selectStyle = {
  backgroundColor: 'transparent',
  border: '1px solid #ddd',
  borderRadius: 5,
  width: '100%',
  padding: '10px 0 10px 5px',
  fontSize: 13
}

class NoteContent extends React.Component {

  shouldComponentUpdate = () => false

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
    return (
      <div>
        <br/><br/>
        <div className="row">
          <div className="col-md-10" style={{ float: 'none', margin: '0 auto' }}>
            <textarea id={this.editor} name="content"></textarea>
          </div>
        </div>
        <br/><br/>
      </div>
    )
  }

}

export function createTemplateModal () {

  let tabs = tabr({
    activeClassName: 'active',
    clickDisabled: true
  })

  return class CreateTemplateModal extends React.Component {
    state = {
      // to show loading gif on last tab
      creating: false,
      templateNameError: false
    }

    nextFinishBtn = class NextFinishBtn extends React.Component {

      props:{
        nextTab : Function
      }

      componentWillMount () {
        this.unsubscribe = tabs.controller.Subscriber(() => {
          this.setState({ '': '' })
        })
      }

      componentWillUnmount () {
        PubSub.unsubscribe(this.unsubscribe)
      }

      btnForEachTab = [
        <button type="button" className="btn btn-danger" onClick={this.props.nextTab}>Next</button>,
        <button type="button" className="btn btn-danger" onClick={this.props.nextTab}>Create</button>,
        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.reset}>Finish</button>
      ]

      render () {
        return this.btnForEachTab[tabs.controller.selectedTab() - 1]
      }

    }

    newTemplate = {
      Name: '',
      Type: 'Entry',
      Note: ''
    }

    handleTypeChange (e) {
      this.newTemplate.Type = e.target.value
      this.forceUpdate()
    }

    handleNameChange (e) {
      this.newTemplate.Name = e.target.value.replace(/\s\s+/g, ' ')

      if (this.state.templateNameError && this.newTemplate.Name.length > 0) {
        this.setState({ templateNameError: false })
      }
      else {
        this.forceUpdate()
      }
    }

    handleNoteChange (value) {
      this.newTemplate.Note = value
    }

    previousTab () {
      tabs.controller.selectedTab(tabs.controller.selectedTab() - 1)
    }

    // nextTab() has logic for checking if
    // it's 1 before last tab, for then calling
    // the API. This is literally next tab
    _nextTab () {
      tabs.controller.selectedTab(tabs.controller.selectedTab() + 1)
    }

    nextTab () {
      // Check if next tab is 'Done'/'last' tab
      if (tabs.controller.selectedTab() == tabs.controller.tabs.length - 1) {
        console.log(JSON.stringify(this.newTemplate, null, 2))

        // Check if all data is set
        // and ready to create Template
        if (!!this.newTemplate.Name && !!this.newTemplate.Type) {
          // Get code format from API then create template
          console.log('-> Getting code format')

          this.setState({ creating: true })

          this._nextTab()

          TemplateAPI
            .getTemplateFormat(this.newTemplate.Type, this.newTemplate.Name)
            .done(this.createTemplate.bind(this))
            .fail(() => console.log('Ajax error getting code format'))
        }
        // Show error messages
        else {
          tabs.controller.selectedTab(1)
          this.setState({ templateNameError: true })
          console.log('Error: Some data not set')
        }
      }
      else {
        this._nextTab()
      }
    }

    // Create template using the codeFormat
    // used in nextTab() as ajax callback
    createTemplate (codeFormat) {
      console.log('-> Creating template')

      TemplatesEditor.editorConsole.log('Creating template')

      let newTemplate = {
        "ContainsErrors": false,
        "CreatedDT": moment().format(),
        "IsPublic": false,
        "Comment": this.newTemplate.Note,
        "Name": this.newTemplate.Name,
        "IsEnabled": true,
        "Group": "Action",
        "Type": this.newTemplate.Type,
        "IsDeleted": false,
        "CodeFiles": [{
          "Name": this.newTemplate.Name,
          "Code": codeFormat,
          "IsEdited": false,
          "Parameters": [],
          "IsDeleted": false
        }]
      }

      TemplateAPI
        .saveTemplate(newTemplate)
        .done(template => {
          this.setState({ creating: false })

          if (template) {
            console.log('-> Template created')

            TemplatesEditor.EditorState({
              templates: State.getState()
                .Templates.Editor.templates.concat(template)
            })

            TemplatesEditor.setActiveTemplate({
              templateId: template.ID
            })

            if (setCollapsrState) {
              setCollapsrState(template.Type, template.ID)
            }
          }
          else {
            alert('Error creating template')
          }
        })
        .fail(() => console.log('Ajax error saving template'))
    }

    reset = () => {
      this.newTemplate = {
        Name: '',
        Type: 'Entry',
        Note: ''
      }

      tabs.controller.selectedTab(1)

      this.forceUpdate()
    }

    //              Specify how the information should be displayed
    infoboxes = [{
      type: 'Entry',
      icon: 'fa-sign-in',
      text: 'Create an entry template to develop how, when and where to enter the markets.'
    },
      {
        type: 'Exit',
        icon: 'fa-sign-out',
        text: 'Create an exit template to develop how, when and where to exit the markets.'
      },
      {
        type: 'Risk Management',
        icon: 'fa-exclamation-triangle',
        text: 'Create a Risk Management template to specify how to manage your risk.'
      },
      {
        type: 'Money Management',
        icon: 'fa-money',
        text: 'Create a Money Management template to specify position sizing and timing.'
      }];

    //  Get the templateTypeInfo from the currently selected template
    templateTypeInfo (selectedType:String) {
      let infobox = _.find(this.infoboxes, { type: selectedType });

      return (
        <div className="info-panel">
          <div>
            <i className={'fa ' + infobox.icon}/>
          </div>
                <span>
                  {infobox.text}
                </span>
        </div>);
    }

    defineTemplate () {
      return (
        <div className="row" style={{ marginBottom: 30 }}>

          <div className="col-md-12" style={{ marginBottom: 15, padding: '0 30px 0 30px' }}>
            <h6>Template name</h6>
            <input
              style={{ position: 'relative', zIndex: 1 }}
              placeholder="Define your template name"
              value={this.newTemplate.Name}
              onChange={this.handleNameChange.bind(this)}
              type="text"
            />
            <br/>
               {this.state.templateNameError &&
               <p
                 style={{ borderRadius: 0, padding: '9px 2px 3px 14px', position: 'relative', top: -7, zIndex: 0 }}
                 className="bg-danger"
               >
                 Please enter a template name
               </p>
               }
          </div>

          <div className="col-md-6">
            <div className="col-md-11">
              <h6>Template Type</h6>

              <div className="select">
                <select name="templateType"
                        defaultValue="Entry"
                        onChange={this.handleTypeChange.bind(this)}
                        style={selectStyle}>
                  <option value="Entry">Entry</option>
                  <option value="Exit">Exit</option>
                  <option value="Risk Management">Risk Management</option>
                  <option value="Money Management">Money Management</option>
                </select>
              </div>
                 {this.templateTypeInfo(this.newTemplate.Type)}
            </div>
          </div>

        </div>
      )
    }

    done () {
      return (
        <div style={{ padding: '50px 0 50px 0', textAlign: 'center' }}>
             {
               ( !this.state.creating &&
               [
                 <i key={0} className="fa fa-check-circle"
                    style={{ color: '#a0d468', fontSize: 54, verticalAlign: 'middle' }}/>,
                 <span key={1} style={{ fontSize: 25, verticalAlign: 'middle' }}>&nbsp; Your Template is ready</span>
               ])
               || ([
                 <i key={0} className="fa fa-circle-o-notch fa-spin"
                    style={{ color: '#a0d468', fontSize: 54, verticalAlign: 'middle' }}/>,
                 <span key={1} style={{ fontSize: 25, verticalAlign: 'middle' }}>&nbsp; Creating Template</span>
               ])
             }
        </div>
      )
    }

    render () {
      let headerStyle = { padding: '15px 0 0 15px', fontWeight: 300, fontSize: 16, color: '#31323e' }

      return (
        <QModal id={this.props.id} className="modal-lg createTemplateModal" style={{ textAlign: 'left' }}>
          <div className="modal-body">

            <h5 style={headerStyle}>Create Template</h5> <br/>

            <div className="row">
              <tabs.Tab>
                <div className="col-md-4 jumbotron">
                  <h6><strong>Define Template</strong></h6>
                  <span>Choose a template name, type and group before creating one.</span>
                </div>
              </tabs.Tab>

              <tabs.Tab>
                <div className="col-md-4 jumbotron">
                  <h6><strong>Note</strong></h6>
                  <span>Set your template notes.</span>
                </div>
              </tabs.Tab>

              <tabs.Tab>
                <div className="col-md-4 jumbotron">
                  <h6><strong>Done!</strong></h6>
                  <span>You are ready to start coding!</span>
                </div>
              </tabs.Tab>
            </div>

            <tabs.Panel>
              {this.defineTemplate()}
            </tabs.Panel>

            <tabs.Panel>
              <NoteContent onChange={this.handleNoteChange.bind(this)}/>
            </tabs.Panel>

            <tabs.Panel>
              {this.done()}
            </tabs.Panel>
          </div>

          <div className="modal-footer">
               {
                 !this.state.creating &&
                 [
                   <button key={0} type="button"
                           className="btn btn-danger"
                           style={{ float: 'left' }}
                           onClick={() => this.previousTab()}
                   >Previous
                   </button>,
                   <this.nextFinishBtn reset={this.reset} key={1} nextTab={this.nextTab.bind(this)}/>
                 ]
               }
          </div>
        </QModal>
      );
    }

  }

}
