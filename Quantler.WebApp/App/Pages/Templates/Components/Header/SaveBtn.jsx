import {Component, PropTypes, createClass} from 'react';
import * as TemplatesEditor                from '../../Functions/Editor.jsx';
import * as TemplatesUI                    from '../../Functions/UI.jsx'
import {connect}                         from '../../../../State.jsx'

@connect(state => ({
  Editor: state.Templates.Editor,
  showSaveNotification: state.Templates.UI.showSaveNotification,
  needsSaving: TemplatesEditor.needsSaving(),
  ui: state.ui
}))
export class SaveBtn extends Component {
  description () {
    let { ui } = this.props

    let popoverStyle = {
      top: '57.5px',
      left: (ui.activeLayout == ui.layoutTypes.collapsed) ? 366 : 515
    }

    return this.props.needsSaving && this.props.showSaveNotification &&
      <div className="popover fade right in" role="tooltip" style={ popoverStyle }>
        <div className="arrow"></div>

        <h3 className="popover-title">Save your changes!
          <a className='pull-right'
             style={{ color: 'White' }}
             onClick={() => TemplatesUI.hideSaveNotification()}
          > X
          </a>
        </h3>

        <div className="popover-content" style={{ width: 210 }}>
          Save all changes made to the selected files.
        </div>
      </div>
  }

  render () {
    let { saving }      = this.props.Editor
    let { needsSaving } = this.props

    let btnAttributes = ((saving || !needsSaving) ? { disabled: 'disabled' } : {}),
      text = (saving ? 'Saving ' : 'Save All')

    let icon = saving
      ? <img src={"Art/" + "Images/ajax-loader.gif"}/>
      : <i className="fa fa-check-circle fa-inverse fa-align-right"/>

    return (
      <div className="button-overlay">
        <button onClick={() => TemplatesEditor.saveAll()}
                type="button"
                className="btn btn-labeled btn-primary"
                style={{ position: 'relative' }}
                {...btnAttributes}
        >
          <span>{ text }</span>

                    <span>
                        &nbsp;&nbsp;&nbsp;
                      { icon }
                    </span>
        </button>

           { this.description() }
      </div>
    )
  }
}
