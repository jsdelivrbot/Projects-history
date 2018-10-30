import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class Header extends Component {

  signout() {
    this.props.signoutUser();
  }

  renderLinks() {
    if (this.props.authenticated) {
      return <li className="nav-item">
        <Link className="nav-link" onClick={ this.signout.bind(this) }>Sign Out</Link>
      </li>
    } else {
      return [
        <li className="nav-item" key={ 1 } >
          <Link className="nav-link" to="/signin"> Sign in</Link>
        </li>,
        <li className="nav-item" key={ 2 }>
          <Link className="nav-link" to="/signup"> Sign Up </Link>
        </li>
      ];
    }
  }

  render() {
    return (
        <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand">Redux Auth</Link>
          <ul className="nav navbar-nav">
            { this.renderLinks() }
          </ul>
        </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(Header);