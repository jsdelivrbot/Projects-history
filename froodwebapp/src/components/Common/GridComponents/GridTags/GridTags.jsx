import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { FroodTag } from 'components';
import { tagClosable, tagInput } from './GridTags.scss';

class GridTags extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  handleClose = (tagId) => {
    this.props.handleDeleteTag(this.props.index, tagId, this.props.propName);
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputSave = (e) => {
    e.preventDefault(); // could create a bug when tags used inside form and enter is pressed
    if (this.state.inputValue) {
      const tag = this.state.inputValue;
      this.setState({
        inputValue: ''
      }, () => this.props.handleAddTag(tag, this.props.index, this.props.propName));
    }
  }

  render() {
    const {
      tags = [],
      maxTags,
      autoFocus = false
    } = this.props;

    const {
      inputValue
    } = this.state;

    return (
      <div>
        { tags.map((tag, index) => (
          <FroodTag
            id={ index }
            className={ tagClosable }
            key={ tag.value }
            tag={ tag }
            onClose={ this.handleClose }
          />
        ))}
        { tags.length !== maxTags &&
          <Input
            className={ tagInput }
            autoFocus={ autoFocus }
            size="small"
            value={ inputValue }
            onChange={ this.handleInputChange }
            onBlur={ this.handleInputSave }
            onPressEnter={ this.handleInputSave }
          />
        }
      </div>
    );
  }
}

GridTags.propTypes = {
  // data
  tags: PropTypes.array,
  // props
  autoFocus: PropTypes.bool,
  maxTags: PropTypes.number,
  index: PropTypes.number,
  propName: PropTypes.string,
  // handlers
  handleAddTag: PropTypes.func,
  handleDeleteTag: PropTypes.func,
};

export default GridTags;
