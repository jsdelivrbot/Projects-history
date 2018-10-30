import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ConnectedTopFormModal } from 'components';
import { Table, Spin } from 'antd';
import {
  customerCreditsGetRequest,
  customerCreditsSaveRequest,
} from 'redux-base/actions';
import { table } from 'styles/common.scss';
import columns from './columns';
import fields from './modalFields';


const mapStateToProps = state => ({
  credits: state.customerProfile.credits,
  loadingPage: state.customerProfile.loadingPage,
});

const mapDispatchToProps = {
  customerCreditsGetRequest,
  customerCreditsSaveRequest
};

const newCredit = {
  creditAmount: '',
  description: '',
  customerName: ''
};

export class CreditsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newCredit,
    };
  }

  componentWillMount() {
    this.props.customerCreditsGetRequest({
      id: this.props.customerId
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.credits.length !== this.props.credits.length) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: {
        ...newCredit,
        customerName: this.props.customerName,
      }
    });
  }

  handleSave = (formData) => {
    this.props.customerCreditsSaveRequest({
      id: this.props.customerId,
      payload: {
        creditAmount: formData.creditAmount,
        description: formData.description,
      }
    });
  }

  render() {
    const {
      modalVisible,
      modalData,
    } = this.state;

    const {
      credits,
      loadingPage
    } = this.props;

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="Add Credit"
          buttonText="New"
          buttonVisible
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields }
        />
        <Spin spinning={ loadingPage }>
          <Row>
            <Col xs md lg>
              <Table
                className={ table }
                columns={ columns }
                dataSource={ credits }
                size="small"
                pagination={ {
                  showSizeChanger: true,
                  size: 'default',
                  total: credits.length,
                  showTotal: total => `Total ${total} records`
                } }
              />
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

CreditsTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // data
  credits: PropTypes.array.isRequired,
  customerId: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  // redux-base
  customerCreditsGetRequest: PropTypes.func.isRequired,
  customerCreditsSaveRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditsTab);
