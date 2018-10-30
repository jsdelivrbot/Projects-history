import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Instructions } from '../../components/CommonBlocks/Instructions/Instructions';
// import { Key } from '../../components/CommonBlocks/Instructions/Key';
import { Hint } from '../../components/CommonBlocks/Instructions/Hint';
import { DropdownItem } from '../../components/Step4/DropdownItem';
import { TableHead } from '../../components/Step4/TableHead';
import { InputItem } from '../../components/Step4/InputItem';
import { AddNewTechnology } from '../../components/Step4/AddNewTechnology';
import * as actions from '../../reduxBase/actions/actions';

export class Step4 extends Component {
  componentDidMount() {
    this.props.addPathToStore(this.props.location.pathname);
  }

  render() {
    const { 
      dropdowns, 
      inputs, 
      dropdownValues 
    } = this.props.technologiesItem;
    const hintHeader = 'Technology';
    const hintMainContent = 'Please select the strategy which best aligns with the dropdown options. If one is not found please write in the technology';
    const paperStyle = {
      padding: 20,
      textAlign: 'center',
    };
    
    return (
      <div>
        <Instructions text="">
          <Hint
              header={ hintHeader }
              main={ hintMainContent }
          />
        </Instructions>
        {/*<Key />*/}
        <section className="step-content">
          <Paper zDepth={ 2 } style={ paperStyle }>
            <div className="table-instruction">
              <Table style={ { width: '1000px' } }>
                <TableHeader>
                  <TableHead />
                </TableHeader>
                <TableBody>
                  {
                    dropdowns.map((item, index) => 
                    (
                      <DropdownItem displayBorder={ false } key={ index } item={ item } dropdownValues={ dropdownValues } />
                    ))
                  }
                  {
                    inputs.map((item, index) => 
                    (
                      <InputItem displayBorder={ false } key={ index } item={ item } />
                    ))
                  }
                </TableBody>
              </Table>
            </div>
            <AddNewTechnology 
              dropdowns={ dropdowns }
              inputs={ inputs }
              addNewTechnology={ this.props.addNewTechnology }
            />
          </Paper>
        </section>
      </div>
    );
  }
}

Step4.propTypes = {
  location: PropTypes.object,
  addPathToStore: PropTypes.func,
  addNewTechnology: PropTypes.func,
  technologiesItem: PropTypes.object,
};


export default withRouter(connect(
  state => ({
    technologiesItem: state.technologiesReducer
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Step4));