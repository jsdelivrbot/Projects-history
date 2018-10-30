import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export class AddNewRelationship extends Component {
  constructor(props) {
    super(props);

    this.addNewRelationship = this.addNewRelationship.bind(this);
  }

  addNewRelationship() {
    const relationship = {
      id: this.props.dropdowns.length + 1,
    }
    this.props.addNewRelationship(relationship);
  }

  render() {
    return (
      <FloatingActionButton mini={true} onClick={this.addNewRelationship}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

AddNewRelationship.propTypes = {
  dropdowns: PropTypes.array,
  companiesList: PropTypes.array,
  addNewRelationship: PropTypes.func,
};