import React from 'react';
import PropTypes from 'prop-types';

import styles from './Search-styles.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    document.getElementById('search_input')
      .addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
          document.getElementById('search_button').click();
        }
      });
  }

  handleChange = event => this.setState({ value: event.target.value });

  render() {
    return (
      <div className={styles.search__content}>
        <input
          type="text"
          id="search_input"
          className={styles.input__search}
          placeholder="Search..."
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button id="search_button" onClick={() => this.props.onClick(this.state.value)} className={styles.btn__search}>
          <div className={`${[styles.search, styles.icon].join(' ')}`} />
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  onClick: PropTypes.func,
};

export default Search;
