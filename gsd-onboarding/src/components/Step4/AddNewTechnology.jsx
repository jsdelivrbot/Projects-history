import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export class AddNewTechnology extends Component {
  constructor(props) {
    super(props);

    this.addNewTechnology = this.addNewTechnology.bind(this);
  }

  addNewTechnology() {
    const technology = {
      id: this.props.dropdowns.length + this.props.inputs.length + 1,
    }
    this.props.addNewTechnology(technology);
  }

  render() {
    return (
      <FloatingActionButton mini={true} onClick={this.addNewTechnology}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

AddNewTechnology.propTypes = {
  dropdowns: PropTypes.array,
  inputs: PropTypes.array,
  companiesList: PropTypes.array,
  addNewTechnology: PropTypes.func,
};