var React = require("react");

module.exports = React.createClass({
  render()
  {
    var className = "QModal modal-dialog ";
    className += (typeof this.props.className !== 'undefined')
      ? this.props.className
      : 'modal-sm';

    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className={className} role="document">
          <div className="modal-content">
               {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});
