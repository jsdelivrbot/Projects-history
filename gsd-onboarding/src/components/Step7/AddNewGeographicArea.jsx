import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export class AddNewGeographicArea extends Component {
  constructor(props) {
    super(props);

    this.addNewGeographicArea = this.addNewGeographicArea.bind(this);
  }

  addNewGeographicArea() {
    const area = {
      id: this.props.dropdowns.length + 1,
    }
    this.props.addNewGeographicArea(area);
  }

  render() {
    return (
      <FloatingActionButton mini={true} onClick={this.addNewGeographicArea}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

AddNewGeographicArea.propTypes = {
  dropdowns: PropTypes.array,
  companiesList: PropTypes.array,
  addNewGeographicArea: PropTypes.func,
};