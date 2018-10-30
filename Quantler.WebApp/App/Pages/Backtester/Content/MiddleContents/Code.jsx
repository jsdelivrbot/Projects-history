import {Component}   from 'react'
import {AceEditor}   from '../../../Templates/Components/Editor/AceEditor.jsx'
import {connect}     from '../../../../State.jsx'
import * as StrategyFn from '../../Functions/Strategy.jsx'
import * as Utils      from '../../Functions/Utils.jsx'

@connect(state => {
  let { templates, activeTemplateId, activeCodeFileName } = state.Backtester
  return { templates, activeTemplateId, activeCodeFileName, date: Date.now() }
}, state => {
  let code = (Utils.activeCodeFile() || {}).Code
  return { code }
})
export class CodeContent extends Component {
  editorInstance = null;

  componentDidUpdate () {
    if (this.editorInstance) {
      let session = this.editorInstance.getSession()
      session.setUseWrapMode(false)
      session.setUseWrapMode(true)
    }
  }

  render () {
    let { id, code } = this.props
    return (
      <div key={ id }>
        <div
          className={( code == null ? '' : 'hide' )}
          style={{ padding: '70px 20px', color: '#aaa', fontSize: 15 }}
        >
          <span>
              // Open a file from the left menu
          </span>
        </div>
        <div className={( code != null ? '' : 'hide' )}>
          <AceEditor
            code={ code }
            onLoad={(editor) => {
              this.editorInstance = editor
              editor.setOptions({ maxLines: Infinity })
              editor.getSession().setUseWrapMode(true)
            }}
            onChange={ code => StrategyFn.updateActiveFileCode({ code }) }/>
        </div>
      </div>
    )
  }
}
