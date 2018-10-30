import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Instructions } from '../../components/CommonBlocks/Instructions/Instructions';
import { CompaniesItem } from '../../components/Step1/CompaniesItem';
import { TableHead } from '../../components/Step1/TableHead';
import { AddNewCompany } from '../../components/Step1/AddNewCompany';
import * as actions from '../../reduxBase/actions/actions';

export class Step1 extends Component {
  componentDidMount() {
    this.props.load();
    this.props.addPathToStore(this.props.location.pathname);
  }

  render() {
    const instructionText = 'The first building block of generating GradaData strategic analysis is selecting the companies to be analyzed. Please fill out the list below with the companies you would like us to take a look at and include any notes you believe will be relevant. These notes could include whether or not the company is a subsidiary of another, if we should take special care in analyzing it, and if it is a foreign company.';
    const paperStyle = {
      padding: 20,
      textAlign: 'center',
    };
    return (
      <div>
        <Instructions text={ instructionText } isStep1={ true } />
        <Paper zDepth={ 2 } style={ paperStyle }>
          <section className="table-instruction step1-table">
            <Table>
              <TableHeader>
                <TableHead />
              </TableHeader>
              <TableBody>
                {
                  this.props.companiesList.map((item, index) => 
                  (
                    <CompaniesItem displayBorder={ false } key={ index } company={ item } />
                  ))
                }
              </TableBody>
            </Table>
          </section> 
          <AddNewCompany 
            companiesList={ this.props.companiesList }
            addNewCompany={ this.props.addNewCompany }
          />
        </Paper>
      </div>
    );
  }
}

Step1.propTypes = {
  companiesList: PropTypes.array,
  addNewCompany: PropTypes.func,
  location: PropTypes.object,
  addPathToStore: PropTypes.func,
  load: PropTypes.func,
};

export default withRouter(connect(
  state => ({
     companiesList: state.companiesListReducer
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Step1));

