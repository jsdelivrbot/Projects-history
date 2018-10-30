import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  supplierNotesGetRequest,
  supplierNotesSaveRequest,
} from 'redux-base/actions';
import { Table, Spin } from 'antd';
import { ConnectedTopFormModal } from 'components';
import { table } from 'styles/common.scss';
import fields from './modalFields';
import columns from './notesTabHelpers';

const mapStateToProps = state => ({
  loadingPage: state.supplier.loadingPage,
  notes: state.supplier.notes,
  needReloadNotes: state.supplier.needReloadNotes
});

const mapDispatchToProps = {
  supplierNotesGetRequest,
  supplierNotesSaveRequest,
};

const newNote = {
  notes: ''
};

export class NotesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newNote
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      supplierId,
      needReloadNotes
    } = nextProps;

    if (needReloadNotes) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.supplierNotesGetRequest({ id: supplierId }));
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newNote
    });
  }

  handleSave = (payload) => {
    this.props.supplierNotesSaveRequest({
      id: this.props.supplierId,
      payload
    });
  }

  render() {
    const {
      modalData,
      modalVisible
    } = this.state;

    const {
      notes,
      loadingPage
    } = this.props;

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="Add Note"
          buttonText="Add Note"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields }
        />
        <Spin spinning={ loadingPage }>
          <Table
            className={ table }
            rowKey="id"
            size="middle"
            columns={ columns() }
            dataSource={ notes }
          />
        </Spin>
      </div>
    );
  }
}

NotesTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadNotes: PropTypes.bool.isRequired,
  // data
  supplierId: PropTypes.number.isRequired,
  notes: PropTypes.array.isRequired,
  // redux-base
  supplierNotesGetRequest: PropTypes.func.isRequired,
  supplierNotesSaveRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesTab);
