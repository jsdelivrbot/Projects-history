import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  bundleAssembliesGetRequest
} from 'redux-base/actions';
import { Table, Spin } from 'antd';
import { table } from 'styles/common.scss';
import ConnectedAssemblyForm from './AssemblyForm';
import columns from './assemblyTabHelpers';

const mapStateToProps = state => ({
  loadingPage: state.bundle.loadingPage,
  needReloadAssemblies: state.bundle.needReloadAssemblies,
  bundleAssembliesDetails: state.bundle.bundleAssemblies.details,
});

const mapDispatchToProps = {
  bundleAssembliesGetRequest
};

export class AssemblyTab extends Component {

  componentWillReceiveProps(nextProps) {
    // when we update bundle assemblies
    if (nextProps.needReloadAssemblies) {
      this.props.bundleAssembliesGetRequest({
        id: this.props.bundleId
      });
    }
  }

  render() {
    const {
      bundleAssembliesDetails,
      loadingPage,
      bundleId
    } = this.props;

    return (
      <div>
        <Spin spinning={ loadingPage }>
          <ConnectedAssemblyForm
            bundleId={ bundleId }
          />
          <Table
            className={ table }
            rowKey="id"
            size="small"
            columns={ columns }
            dataSource={ bundleAssembliesDetails }
          />
        </Spin>
      </div>
    );
  }
}

AssemblyTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadAssemblies: PropTypes.bool.isRequired,
  // data
  bundleId: PropTypes.string.isRequired,
  bundleAssembliesDetails: PropTypes.array.isRequired,
  // redux-base
  bundleAssembliesGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssemblyTab);
