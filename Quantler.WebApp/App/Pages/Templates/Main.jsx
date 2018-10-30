import {Component} from 'react'
import styles from './templates.scss';
import {LeftBar, RightBar, Editor, Header} from './Components/Main.jsx';
import * as TemplatesEditor from './Functions/Editor.jsx';
import * as TemplatesUI from './Functions/UI.jsx'
import {State, connect} from '../../State.jsx'

class Content extends Component {
  render () {
    let { templatesContentHeight } = this.props.UI

    let style = {
      height: templatesContentHeight,
      overflow: 'hidden',
      position: 'relative'
    }

    return (
      <div className="interface-holder" style={style}>
        <LeftBar UI={this.props.UI}/>
        <Editor/>
        <RightBar UI={this.props.UI}/>
      </div>
    )
  }
}

TemplatesUI.initialize()

@connect(state => ({
  Templates: state.Templates,
  date: Date.now()
}))
export default class Templates extends Component {
  componentDidMount () {
    let { params, location } = this.props
    // Check if templates need to be loaded or updated
    TemplatesEditor.loadTemplates({
      callback: () => {
        // if a template id was passed in the URL open the template's files
        if (State.getState().Templates.Editor.templates.length > 0 && params.templateId) {
          TemplatesEditor.setActiveTemplate({
            templateId: Number(params.templateId)
          })
          if (location.query.updateTemplate) {
            window.toastr.success('Checking template ' + params.templateId)
            TemplatesEditor.updatePublicTemplate(Number(params.templateId))
          }
        }
      }
    })
  }

  render () {
    let { Templates } = this.props

    return (
      <div>
        <div className={`templates ${styles['page-templates']}`}>
          <Header />
          <br/>
          <Content UI={Templates.UI}/>
        </div>
      </div>
    )
  }
}
