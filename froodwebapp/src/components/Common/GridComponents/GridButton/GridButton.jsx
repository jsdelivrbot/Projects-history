import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './GridButton.scss';

class GridButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      index: props.index
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text,
      index: nextProps.index
    });
  }

  handleClick = () => {
    this.props.handleClick(this.state.index);
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <Button
          className={ styles.button }
          onClick={ this.handleClick }
        >
          { text }
        </Button>
      </div>
    );
  }
}

GridButton.propTypes = {
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default GridButton;
