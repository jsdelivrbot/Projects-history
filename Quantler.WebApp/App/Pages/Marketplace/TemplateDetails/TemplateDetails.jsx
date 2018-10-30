import Radium from 'radium'
import {Styles} from './Styles.jsx'
import {Component} from 'react'
import {Reply} from './Reply.jsx'
import {AceEditor} from '../../Templates/Components/Editor/AceEditor.jsx'
import {Footer} from '../TemplateItem.jsx'
import {Styles as IndexStyles} from '../Styles.jsx'
import {connect} from '../../../State.jsx'
import {TypeIcon} from '../TemplateItem.jsx'
import _ from 'lodash'
import Functions from '../../../Functions/Functions.jsx'
import {Loading} from '../../../Components/Utils/Components.jsx'
import {Icons} from '../../../Components/Utils/GlobalStyles.jsx'
import Utils from '../../../Functions/Utils/Utils.jsx'

let editorId = _.uniqueId('editor')
let footerStyle = IndexStyles("#325c99")
let style = Styles()

let Note = Radium(({ template }) => {
  function toHtml () {
    return { __html: template.Comment };
  }

  return (
    <div style={[style.details.content.note]}>
      <div dangerouslySetInnerHTML={toHtml()}/>
    </div>
  )
})

@connect(state => state.marketplace.details.code)
@Radium
class Code extends Component {

  editor = false

  state = {
    height: 500
  }

  updateHeight () {
    $(() => {
      let newHeight = $('#' + editorId).find('.ace_scrollbar-inner').first().height()
      if (newHeight && newHeight != this.state.height) {
        this.setState({
          height: newHeight
        })
      }
    })
  }

  componentDidMount = this.updateHeight
  componentDidUpdate = this.updateHeight

  render () {
    let { template, codeFile } = this.props

    setTimeout(() => {
      this.editor && this.editor.resize()
    }, 11)

    return (
      <div className="row" style={[style.details.content.code.base]}>
           {/* Files Panel */}
             <div className="col-md-2" style={[style.details.content.code.filePanel.base]}>
               <center>
                 <h6>Code Files</h6>
               </center>
               <ul style={[style.details.content.code.filePanel.list]}>
                   {
                     template.CodeFiles.map((file, key) =>
                       <li
                         onClick={() => Functions.Marketplace.openCodeFile(key)}
                         style={[style.details.content.code.filePanel.listItem(codeFile == key)]}
                         key={ _.uniqueId() }>

                         <i className="fa fa-file-code-o"/> &nbsp;&nbsp;
                         <span>{ file.Name }</span>
                       </li>)
                   }
               </ul>
             </div>
           {/* Editor */}
             <div className="col-md-10" style={[
               style.details.content.code.editor(this.state.height)
             ]}>
                  {
                    <AceEditor
                      onLoad={(editor) => {
                        editor.getSession().setUseWrapMode(true)
                        this.editor = editor
                      }}
                      readOnly={ true }
                      style={{ height: this.state.height }}
                      id={editorId}
                      code={ template.CodeFiles[codeFile].Code }/>
                  }
             </div>
      </div>
    )
  }
}

let tabs = { Code, Note }

let selectTab = tab => () => Functions.Marketplace.selectTab(tab)

export let TemplateDetails = connect(state => ({
  details: state.marketplace.details,
  importing: state.marketplace.templateImport.importing
}))(
  Radium(({ details, importing }) => {
    let { loading, Template, Comments, tab } = details

    let Content = tabs[tab]
    let activeTab = tabName => (tab == tabName ? style.details.tabs.active : {})

    if (loading) return <Loading />

    return (
      <div style={[style.base]}>
           {/* Back Button */}
             <a href="#/marketplace">
               <button style={[style.backButton]}>
                 Back to Trading Ideas &nbsp;&nbsp;
                 <i className="fa fa-arrow-left"/>
               </button>
             </a>
           {/* Details */}
             <div style={[style.details.base]}>
                  {/* Header */}
                    <div style={[style.details.header.base]}>
                         {/* Title */}
                           <div style={[style.details.header.title]}>
                             <h5 style={{ float: 'left' }}>
                                 { Template.Name || "Template Item" }
                             </h5>
                        <span style={{ padding: '10px 0 0 5px', float: 'left' }}>
                            &nbsp;
                          <TypeIcon type={ Template.Type }/>
                          &nbsp;
                            <span>
                                { Template.Type }
                            </span>
                        </span>
                           </div>
                         {/* Buttons */}
                           <div style={[style.details.header.buttons]}>
                             <Footer
                               style={footerStyle}
                               right={true}
                               template={Template}
                               importing={ importing }/>
                           </div>
                    </div>
                  {/* Tabs */}
                    <div style={[style.details.tabs.base]}>
                      <div onClick={selectTab("Note")} style={[style.details.tabs.tab, activeTab("Note")]}>Note</div>
                      <div onClick={selectTab("Code")} style={[style.details.tabs.tab, activeTab("Code")]}>Code</div>
                    </div>
                  {/* Content */}
                    <div style={[style.details.content.base]}>
                      <Content template={ Template }/>
                    </div>
             </div>
           {/* Comments */}
             <div style={[style.comments.base]}>
                  {/* Posts */}
                    <div style={[style.comments.posts.base]}>
                      <h4 style={{ margin: '30px 0 20px 0', fontWeight: 'normal', fontFamily: 'Open Sans Light' }}>
                        Comments
                      </h4>
                         {
                           Comments.map(comment =>
                             <div style={[style.comments.posts.post.base]}>
                               <div style={[style.comments.posts.post.header]} className="row">
                                 <div
                                   style={[style.comments.posts.post.profileImage(comment.Owner.AvatarURL)]}
                                   className="col-md-4"/>

                                 <div style={[style.comments.posts.post.name]} className="col-md-8">
                                   <strong>{ comment.Owner.FullName }</strong> &nbsp;
                                   <i className={ Icons.clock }/> &nbsp;
                                      { Utils.timeFromNow(comment.CreatedDateUTC) }
                                 </div>
                               </div>
                               <div
                                 dangerouslySetInnerHTML={{ __html: comment.Content }}
                                 style={[style.comments.posts.post.content]}
                                 className="row">
                               </div>
                             </div>)
                         }
                    </div>
                  {/* Reply */}
                    <div style={[style.comments.reply.base]}>
                      <Reply/>
                    </div>
             </div>
      </div>
    )
  }))
