/*global module, require*/
var React = require("react"),
  _ = require('lodash');
import {Icons} from '../Utils/GlobalStyles.jsx'

var QButton = React.createClass({
  render: function () {

    var dataAttrs = _.pick(this.props, (value, key) =>
      _.includes(key, 'data-') ? key : '');

    var className = "btn btn-lg "
      + ((this.props.className) ? this.props.className : 'btn-default');

    if (this.props.onClick) {
      dataAttrs.onClick = this.props.onClick;
    }

    if (this.props.disabled) {
      dataAttrs.disabled = 'disabled';
    }

    var component = (
      <button type="button" className={className}
              style={_.extend({}, (this.props.style || {}), { border: '0px' })} {...dataAttrs}>
        <span>{this.props.text}</span>
                <span>
                    &nbsp;&nbsp;&nbsp;<i className={this.props.iconClass}/>
                </span>
      </button>
    );

    return (typeof this.props.header !== 'undefined')
      ? <div className="container-btn-header">{component}</div>
      : component;
  }
});

module.exports = {
  Btn: React.createClass({
    render: function () {
      return <QButton {...this.props} />
    }
  }),
  Plus: React.createClass({
    render: function () {
      return <QButton iconClass={ Icons.plus } {...this.props} />
    }
  }),
  Right: React.createClass({
    render: function () {
      return <QButton iconClass={ Icons.circleRight } {...this.props} />
    }
  }),
  Send: React.createClass({
    render: function () {
      return <QButton iconClass={ Icons.send } {...this.props} />
    }
  }),
  Delete: React.createClass({
    render: function () {
      return <QButton iconClass={ Icons.trash } {...this.props} />
    }
  }),
  Left: React.createClass({
    render: function () {
      return <QButton iconClass={ Icons.left } {...this.props} />
    }
  }),
  Video: React.createClass({
    render: function () {
      return <QButton iconClass={ Icons.youtube } {...this.props} />
    }
  })
};
