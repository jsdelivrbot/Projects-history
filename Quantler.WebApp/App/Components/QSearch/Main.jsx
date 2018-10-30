/*global module, require*/
import {Component, PropTypes} from 'react';

export class QSearch extends Component {

  render () {
    let extras = (this.props.value) ? { value: this.props.value } : {}

    return (
      <div className="container-search">
        <div className="search-icon">
          <i className="fa fa-search"></i>
        </div>
        <div className="search-sample">
          <input
            type="text"
            onChange={(syntheticEvent) => this.props.searchFunc(syntheticEvent.target.value)}
            className="form-control form-control-rounded pull-left form-control-rounded"
            placeholder={this.props.placeholder}
            {...extras}/>
        </div>
      </div>
    );
  }
}
