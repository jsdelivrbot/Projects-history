import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Instructions } from '../../components/CommonBlocks/Instructions/Instructions';
import { TaxonomyInstructions } from '../../components/Step2/TaxonomyInstructions';
import { TaxonomyTable } from '../../components/Step2/TaxonomyTable';

import * as actions from '../../reduxBase/actions/actions';

export class Step2 extends Component {
  componentDidMount() {
    this.props.addPathToStore(this.props.location.pathname);
  }
  render() {
    const instructionText = 'The next step of our analysis involves creating the strategies you would like each company to be analyzed against. These strategies include 5 distinct strategy groups with their own subgroups. Take a look and familiarize yourself with our strategy taxonomy and groupings below. These will be used to create and populate strategies on the next page.';
    const tableData = [
      {
        group: 'Offering',
        subgroup: 'Offering',
        description: 'Specs or offerings'
      },
      {
        group: '',
        subgroup: 'Methodology',
        description: 'How a product or service is implemented, non-technical process-oriented approach',
        border: true,
      },
      {
        group: 'Technology',
        subgroup: 'Technology',
        description: 'R&D, advanced capability behind a product',
        border: true,
      },
      {
        group: 'Target Markets',
        subgroup: 'Vertical',
        description: 'The industry targeted'
      },
      {
        group: '',
        subgroup: 'Sub-vertical',
        description: 'The sub-industry targeted',
        border: true,
      },
      {
        group: 'Key Relationship',
        subgroup: 'Partner',
        description: 'Business relationship, no investment involved'
      },
      {
        group: '',
        subgroup: 'Customer',
        description: 'Person or organization that buys goods or services',
        border: true,
      },
      {
        group: 'Geographic Footprint',
        subgroup: 'State',
        description: 'US State '
      },
      {
        group: '',
        subgroup: 'US Region',
        description: 'US Census region '
      },
      {
        group: '',
        subgroup: 'Country',
        description: 'Country'
      },
      {
        group: '',
        subgroup: 'Global Region',
        description: 'Continent or global region encompassing multiple countries',
        border: true,
      },
    ];
    return (
      <div>
        <Instructions text={instructionText}>
          <TaxonomyInstructions />
        </Instructions>
        <section className="table-instruction">
          <TaxonomyTable tableData={tableData} />
        </section>
      </div>
    );
  }
}

Step2.propTypes = {
  location: PropTypes.object,
  addPathToStore: PropTypes.func,
};

export default withRouter(connect(state => ({}), dispatch => bindActionCreators(actions, dispatch))(Step2));
