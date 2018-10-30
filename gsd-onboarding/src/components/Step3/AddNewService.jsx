import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export class AddNewService extends Component {
  constructor(props) {
    super(props);

    this.addNewService = this.addNewService.bind(this);
  }

  addNewService() {
    const service = {
      id: this.props.servicesList.length + 1,
    }
    this.props.addNewService(service);
  }

  render() {
    return (
      <FloatingActionButton mini={true} onClick={this.addNewService}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

AddNewService.propTypes = {
  servicesList: PropTypes.array,
  addNewService: PropTypes.func,
};