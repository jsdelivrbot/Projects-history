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
import { TableHead } from '../../components/Step3/TableHead';

import { ServicesItem } from '../../components/Step3/ServicesItem';
import { AddNewService } from '../../components/Step3/AddNewService';
import * as actions from '../../reduxBase/actions/actions';

export class Step3 extends Component {
	componentDidMount() {
    this.props.addPathToStore(this.props.location.pathname);
  }

  render() {
    const hintHeader = 'Offering';
    const hintMainContent = 'Please list the products and services offered in this market (e.g., cryogenic freezer)';
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
                    this.props.servicesList.map((item, index) => 
                    (
                      <ServicesItem key={index} service={item} />  
                    ))
                  }
                </TableBody>
              </Table>
            </div>
            <AddNewService 
              servicesList={this.props.servicesList} 
              addNewService={this.props.addNewService} 
            />
          </Paper>
        </section> 
      </div>
    );
  }
}

Step3.propTypes = {
	location: PropTypes.object,
  addPathToStore: PropTypes.func,
  addNewService: PropTypes.func,
  servicesList: PropTypes.array,
};


export default withRouter(connect(
	state => ({
     servicesList: state.productsServicesReducer
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Step3));