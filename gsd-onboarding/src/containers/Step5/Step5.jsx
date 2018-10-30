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
import { TableHead } from '../../components/Step5/TableHead';
import { DropdownItem } from '../../components/Step5/DropdownItem';
import { AddNewStrategy } from '../../components/Step5/AddNewStrategy';
import * as actions from '../../reduxBase/actions/actions';

export class Step5 extends Component {
  componentDidMount() {
    this.props.addPathToStore(this.props.location.pathname);
  }

  render() {
    const { 
      dropdowns, 
      dropdownValues 
    } = this.props.strategiesItems;
    const hintHeader = 'Vertical';
    const hintMainContent = 'Please select the vertical and then write in the name of the sub-vertical if applicable for a more detailed analysis';
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
          <section className="step-hint">

          </section>
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
            <AddNewStrategy 
              dropdowns={dropdowns}
              addNewStrategy={this.props.addNewStrategy} 
            />
          </Paper>
        </section>
      </div>
    );
  }
}

Step5.propTypes = {
  location: PropTypes.object,
  addPathToStore: PropTypes.func,
  addNewStrategy: PropTypes.func,
  strategiesItems: PropTypes.object,
};


export default withRouter(connect(
  state => ({
    strategiesItems: state.strategiesReducer
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Step5));