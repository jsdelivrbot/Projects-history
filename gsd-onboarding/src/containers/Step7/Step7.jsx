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
import { DropdownItem } from '../../components/Step7/DropdownItem';
import { TableHead } from '../../components/Step7/TableHead';
import { AddNewGeographicArea } from '../../components/Step7/AddNewGeographicArea';
import * as actions from '../../reduxBase/actions/actions';

export class Step7 extends Component {
  componentDidMount() {
    this.props.addPathToStore(this.props.location.pathname);
  }

  render() {
    const { dropdowns, dropdownValues } = this.props.geographicItem;
    const hintHeader = 'Geography';
    const hintMainContent = 'Please select the geographic area you would like us to analyze based on the above strategies and companies';
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
              <Table>
                <TableHeader>
                  <TableHead />
                </TableHeader>
                <TableBody>
                  {
                    dropdowns.map((item, index) => 
                    (
                      <DropdownItem key={ index } item={ item } dropdownValues={ dropdownValues } />
                    ))
                  }
                </TableBody>
              </Table>
            </div>
            <AddNewGeographicArea
              dropdowns={ dropdowns }
              addNewGeographicArea={ this.props.addNewGeographicArea }
            />
          </Paper>
        </section>
      </div>
    );
  }
}

Step7.propTypes = {
  location: PropTypes.object,
  addPathToStore: PropTypes.func,
  addNewGeographicArea: PropTypes.func,
  geographicItem: PropTypes.object,
};

export default withRouter(connect(
  state => ({
    geographicItem: state.geographicAreaReducer
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Step7));
