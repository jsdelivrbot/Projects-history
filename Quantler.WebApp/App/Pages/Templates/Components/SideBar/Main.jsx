import {}               from './qSideBar.scss';
import {Component}    from 'react';
import {default as _}   from 'lodash';
import * as TemplatesUI from '../../Functions/UI.jsx'

export class SideBar extends Component {
  componentDidMount () {
    $(() => $('.scrollbar-inner').scrollbar({ "type": "advanced" }));
  }

  handleMouseDown = (_event) => {
    let { className } = this.props

    let id = 'mousemove.' + _.uniqueId(),
      event = _.clone(_event, true),
      isRightSide = _.includes(className, 'box-right')

    $('body').addClass('unselectable-all')

    $(window).bind(id, (ME) => {
      let offset = $(event.target).offset()

      if (isRightSide) {
        if (ME.pageX > offset.left) {
          TemplatesUI.updateWidth(
            this.props.width - (ME.pageX - offset.left),
            this.props.side
          )
        }
        else if (ME.pageX < offset.left) {
          TemplatesUI.updateWidth(
            this.props.width + (offset.left - ME.pageX),
            this.props.side
          )
        }
      }
      else {
        if (ME.pageX > offset.left) {
          TemplatesUI.updateWidth(
            this.props.width - (offset.left - ME.pageX),
            this.props.side
          )
        }
        else if (ME.pageX < offset.left) {
          TemplatesUI.updateWidth(
            this.props.width + (ME.pageX - offset.left),
            this.props.side
          )
        }
      }

    }).mouseup(() => {
      $(window).unbind(id)
      $('body').removeClass('unselectable-all')
    })

  }

  title () {
    return (
      <div className="title">
        <span>{this.props.title}</span>

           {(typeof this.props.optionItems !== 'undefined') ?
             <div className="option-items pull-right">
                  {(this.props.optionItems).map((item, key) => (
                    <div key={key} {...item.props}>{item.element}</div>
                  ))}
             </div>
             : null
           }
      </div>
    )
  }

  render () {
    let isRightSide = _.includes(this.props.className, 'box-right')

    let _className = 'QSideBar '
      + this.props.className
      + ( isRightSide ? ' box-lrmenu-right' : ' box-lrmenu-left')

    return (
      <div style={{ width: this.props.width }} className={_className}>

           {this.title()}

             <div style={{ height: this.props.height - 32 }} className="content-holder">
               <div className="scrollbar-inner">
                 <div className={this.props.holderClass}
                      style={this.props.holderStyle || {}}
                 >
                      {this.props.children}
                 </div>
               </div>
             </div>

             <div onMouseDown={this.handleMouseDown}
                  className={
                    "qsidebar-puller "
                    + ( isRightSide ? 'qsidebar-puller-left' : '')
                  }
             >
               <div>.<br/>.<br/>.</div>
             </div>

      </div>
    );
  }
}
