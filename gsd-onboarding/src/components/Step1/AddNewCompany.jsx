import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export class AddNewCompany extends Component {
  constructor(props) {
    super(props);

    this.addNewCompany = this.addNewCompany.bind(this);
  }

  addNewCompany() {
    const company = {
      id: this.props.companiesList.length + 1,
    }
    this.props.addNewCompany(company);
  }

  render() {
    return (
      <FloatingActionButton mini={true} onClick={this.addNewCompany}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

AddNewCompany.propTypes = {
  companiesList: PropTypes.array,
  addNewCompany: PropTypes.func,
};