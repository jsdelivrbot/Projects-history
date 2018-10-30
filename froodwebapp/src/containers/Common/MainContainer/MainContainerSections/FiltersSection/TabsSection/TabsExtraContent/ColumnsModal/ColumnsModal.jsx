import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Transfer } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import {
  columnsModal,
  transfer
} from './ColumnsModal.scss';

class ColumnsModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTargetKeys: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const selectedTargetKeys = nextProps
      .columns
      .filter(col => col.isDefault)
      .map(col => col.id);

    this.setState({
      selectedTargetKeys
    });
  }

  handleSelectTargetKeys = (selectedTargetKeys) => {
    this.setState({ selectedTargetKeys });
  }

  handleUpdateDefaultColumns = () => {
    const { selectedTargetKeys } = this.state;
    const { columns } = this.props;

    const defaultColumns = selectedTargetKeys.map((columnId) => {
      const { id, order } = columns.find(col => col.id === columnId);

      return {
        id,
        order
      };
    });

    this.props.onUpdateDefaultColumns(defaultColumns);
  }

  handleResetDefaultColumns = () => {
    const { columns } = this.props;

    const selectedTargetKeys = columns
      .filter(col => col.isDefault)
      .map(col => col.id);

    this.setState({ selectedTargetKeys },
      () => this.props.onToggleColumnsModal()
    );
  }

  render() {
    const {
      columns,
      visible
    } = this.props;

    const {
      selectedTargetKeys
    } = this.state;

    const dataSource = columns.map(col => ({
      key: col.id,
      title: col.name
    }));

    return (
      <Modal
        className={ columnsModal }
        title="Visible Columns Configuration"
        visible={ visible }
        closable={ false }
        okText="Update"
        cancelText="Close"
        onOk={ this.handleUpdateDefaultColumns }
        onCancel={ this.handleResetDefaultColumns }
      >
        <Row>
          <Col xs>
            <Transfer
              className={ transfer }
              showSearch
              dataSource={ dataSource }
              targetKeys={ selectedTargetKeys }
              onChange={ this.handleSelectTargetKeys }
              titles={ ['available', 'visible'] }
              operations={ ['Add', 'Remove'] }
              render={ record => record.title }
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}

ColumnsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  onUpdateDefaultColumns: PropTypes.func.isRequired,
  onToggleColumnsModal: PropTypes.func.isRequired,
};

export default ColumnsModal;
