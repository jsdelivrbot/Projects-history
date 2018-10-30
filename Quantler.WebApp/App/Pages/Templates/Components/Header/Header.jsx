import {Component}         from 'react';
import {default as _}        from 'lodash';
import {Link}                from 'react-router';
import {Routes}              from '../../../../Routes.jsx';
import {SaveBtn}             from './SaveBtn.jsx';
import {createTemplateModal} from './CreateTemplateModal.jsx';
import VideoButton from '../../../../Components/Utils/VideoButton.jsx'

export class Header extends Component {
  createTemplateModal = createTemplateModal()

  render () {
    let templateModalId = _.uniqueId('modal')

    return (
      <div style={{ margin: '15px 20px 0 20px' }}>
        <div className="btn-header">
          <this.createTemplateModal id={ templateModalId }/>

          <button data-target={ '#' + templateModalId }
                  data-toggle="modal"
                  className="btn btn-labeled btn-default">
            <span>Create Template</span>
            <span>
                &nbsp;&nbsp;&nbsp;
              <i className="fa fa-plus-circle fa-inverse fa-align-right"/>
            </span>
          </button>

          &nbsp;&nbsp;&nbsp;&nbsp;

          <SaveBtn/>

          <VideoButton videoSrc="yK5p5pAJ1CY" />
        </div>
      </div>
    )
  }

}
