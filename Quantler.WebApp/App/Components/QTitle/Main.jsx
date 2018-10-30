import {Component, PropTypes} from 'react';

export class QTitle extends Component {

  render () {
    return (
      <h3 style={this.props.style || {}}>
          {this.props.heading}
            <small>{this.props.description}</small>
      </h3>
    );
  }

}
