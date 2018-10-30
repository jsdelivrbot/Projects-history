/*global module, require*/
var React = require("react");

module.exports = {

  Footer: React.createClass({
    render: function () {
      return (
        <div className="modal-footer">
             {this.props.children}
        </div>
      );
    }
  }),

  Body: React.createClass({
    render: function () {
      return (
        <div className='modal-body'>
             {this.props.children}
        </div>
      );
    }
  })

};
