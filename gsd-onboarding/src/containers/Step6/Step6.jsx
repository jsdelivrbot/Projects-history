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

import { TableHead } from '../../components/Step6/TableHead';
import { DropdownItem } from '../../components/Step6/DropdownItem';
import { AddNewRelationship } from '../../components/Step6/AddNewRelationship';
import * as actions from '../../reduxBase/actions/actions';

export class Step6 extends Component {
  componentDidMount() {
    this.props.addPathToStore(this.props.location.pathname);
  }

  render() {
    const { 
      dropdowns, 
      dropdownValues 
    } = this.props.relationshipItems;
    const hintHeader = 'Key Relationship';
    const hintMainContent = 'Please select the type of relationship and then write in the name of the customer or partner';
    const paperStyle = {
      padding: 20,
      textAlign: 'center',
    };

    return (
      <div>
        <Instructions text="">
          <Hint
              header={hintHeader}
              main={hintMainContent}
          />
        </Instructions>
        {/*<Key />*/}
        <section className="step-content">
          <Paper zDepth={2} style={paperStyle}>
            <div className="table-instruction">
              <Table>
                <TableHeader>
                  <TableHead />
                </TableHeader>
                <TableBody>
                  {
                  dropdowns.map((item, index) => 
                  (
                    <DropdownItem key={index} item={item} dropdownValues={dropdownValues} />  
                  ))
                }
                </TableBody>
              </Table>
            </div>
            <AddNewRelationship 
              dropdowns={dropdowns}
              addNewRelationship={this.props.addNewRelationship} 
            />
          </Paper>
        </section> 
      </div>
    );
  }
}


Step6.propTypes = {
  location: PropTypes.object,
  addPathToStore: PropTypes.func,
  addNewRelationship: PropTypes.func,
  relationshipItems: PropTypes.object,
};


export default withRouter(connect(
  state => ({
    relationshipItems: state.relationshipReducer
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Step6));