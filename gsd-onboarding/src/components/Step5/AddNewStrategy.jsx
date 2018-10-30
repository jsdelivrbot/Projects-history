import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export class AddNewStrategy extends Component {
  constructor(props) {
    super(props);

    this.addNewStrategy = this.addNewStrategy.bind(this);
  }

  addNewStrategy() {
    const technology = {
      id: this.props.dropdowns.length + 1,
    }
    this.props.addNewStrategy(technology);
  }

  render() {
    return (
      <FloatingActionButton mini={true} onClick={this.addNewStrategy}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

AddNewStrategy.propTypes = {
  dropdowns: PropTypes.array,
  companiesList: PropTypes.array,
  addNewStrategy: PropTypes.func,
};