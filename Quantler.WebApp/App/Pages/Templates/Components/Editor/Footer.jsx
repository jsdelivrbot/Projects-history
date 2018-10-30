import {Component}      from 'react'
import _                  from 'lodash'
import * as TemplatesUI   from '../../Functions/UI.jsx'
import {State, connect} from '../../../../State.jsx'

function Console ({ content }) {
  return (
    <div className="row editor-console">
      <div className="col-md-12" style={{ lineHeight: '8px' }}>
           {
             content.map((line, key) =>
               <div key={ key }
                    className={ line.type }
               >
                 <br/>
                 <span>> { line.value }</span>
               </div>
             )}
      </div>
    </div>
  )
}

function ErrorList ({ errors }) {
  return (
    <div className="editor-errorList col-md-12">
      <table className="table table-striped table-bordered">
        <thead>
        <tr>
          <th>CodeFile</th>
          <th>Exception</th>
          <th>Level</th>
          <th>LineNumber</th>
        </tr>
        </thead>
        <tbody>
        {
          _.map(errors, (error, key) =>
            <tr key={ key }>
              <td>{ error.CodeFile }</td>
              <td>{ error.Exception }</td>
              <td>{ error.Level }</td>
              <td>{ error.LineNumber }</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

class FooterComponent extends Component {
  handleMouseDown = (_event) => {
    let id = 'mousemove.' + _.uniqueId(),
      event = _.clone(_event, true)

    $('body').addClass('unselectable-all')

    $(window)
      .bind(id, (ME) => {
        let offset = $(event.target).offset()

        let editorFooterHeight = this
          .props.UI
          .editorFooterHeight

        if (ME.pageY > offset.top) {
          TemplatesUI.editorFooterHeight(
            editorFooterHeight - (ME.pageY - offset.top)
          )
        }
        else if (ME.pageY < offset.top) {
          TemplatesUI.editorFooterHeight(
            editorFooterHeight + (offset.top - ME.pageY)
          )
        }

      })
      .mouseup(() => {
        $(window).unbind(id)
        $('body').removeClass('unselectable-all')
      })
  }

  render () {
    let { editorFooterHeight, editor } = this.props.UI
    let { compiler, compileResponse } = this.props.compiler

    let tabContent = (editor.footer.tab == 0)
      ? <Console content={( this.props.console.content )}/>
      : <ErrorList errors={( compileResponse.Exceptions )}/>

    let style = {
      height: editorFooterHeight,
      backgroundColor: (editor.footer.tab == 0 ? '#111' : '#fff')
    }

    let tabHeight = editorFooterHeight - 40

    return (
      <div className="col-sm-12 editor-footer" style={style}>
        <div className="row">

          <div className="col-md-12 box-mmenu">
            <div className="col-md-12 box-tab-menu">
              <button
                onClick={ () => TemplatesUI.handleFooterSetTab(0) }
                className={ "btn btn-primary " + TemplatesUI.footerIsActiveTab(0) }>
                <span>Console</span>
              </button>
              <button
                onClick={ () => TemplatesUI.handleFooterSetTab(1) }
                className={ "btn btn-primary " + TemplatesUI.footerIsActiveTab(1) }>
                <span>Errors</span>
              </button>
            </div>
          </div>

          <div className="col-md-12">
            <div className="row" style={{ height: tabHeight }}>
              <div className="scrollbar-inner">
                   {tabContent}
              </div>
            </div>
          </div>

          <div onMouseDown={this.handleMouseDown} className="qtop-puller">
            . . .
          </div>

        </div>
      </div>
    )
  }
}

export let Footer = connect(state =>
  ({
    UI: state.Templates.UI,
    compiler: state.Templates.Editor.compiler,
    console: state.Templates.Editor.console
  })
)(FooterComponent)
