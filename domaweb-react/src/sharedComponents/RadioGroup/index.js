import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { renderComponent } from 'recompose';
import styles from './radiogroup.scss';

export default class RadioGroup extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    // Bind the method to the component context
    this.state =  {
      choice: undefined,
    };
    this.renderChildren = this.renderChildren.bind(this);
    this.choose = this.choose.bind(this);
  }
  componentWillMount() {
    if (this.props.value !== undefined || this.props.value !== null) {
      this.setState({ choice: this.props.value });
    }
  }
  choose(e) {
    console.log(e);
    this.setState({ choice: e });
    this.props.onChange(e);
  }
  renderChildren() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        parentValue: this.state.choice,
        onChange: this.choose,
        color: this.props.color,
        size: this.props.size,
      });
    });
  }
  render() {
    const { text } = this.props;
    return (
      <div>
        <div className={styles.text}>
          {text}
        </div>
          {this.renderChildren()}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

RadioGroup.defaultProps = {
  color: '#87c13f',
  size: '20px',
};
