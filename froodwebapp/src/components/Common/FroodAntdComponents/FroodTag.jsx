import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

class FroodTag extends Component {
  onClose = () => {
    this.props.onClose(this.props.id);
  }

  render() {
    const {
      tag,
      className
    } = this.props;
    return (
      <Tag
        className={ className }
        key={ tag.value }
        closable={ tag.closable }
        onClose={ this.onClose }
      >
        { tag.value }
      </Tag>
    );
  }
}

FroodTag.propTypes = {
  tag: PropTypes.object.isRequired,
  className: PropTypes.string,
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func,
};

export default FroodTag;
