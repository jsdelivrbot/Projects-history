import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Welcome extends Component {

  renderWelcome() {
    if (this.props.authenticated) {
      return <Link to="/films">Go to main app </Link>;
    } else {
      return <p>You didn`t authenticate yet...</p>;
    }
  }

  render() {
    return ( <div> { this.renderWelcome() } </div> );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Welcome);