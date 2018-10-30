import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag as AntdTag } from 'antd';

class Tag extends Component {
  handleRemoveTag = () => {
    this.props.onClose(this.props.id);
  }

  render() {
    const {
      id,
      children,
      color
    } = this.props;

    return (
      <AntdTag
        style={ {
          display: 'block',
          margin: '0.5rem 0'
        } }
        color={ color }
        id={ id }
        key={ id }
        onClose={ this.handleRemoveTag }
        closable
      >
        { children }
      </AntdTag>
    );
  }
}

Tag.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.string,
  onClose: PropTypes.func,
};

export default Tag;
