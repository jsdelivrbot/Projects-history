import {Component, PropTypes} from 'react';
import {default as _}         from 'lodash';
import {Routes}               from '../../Routes.jsx';
import {Link}                 from 'react-router';

export class QSignIn extends Component {

  render () {
    return (
      <Link to={Routes.Login}>
        <button className="btn btn-default pull-right">
          Sign in
        </button>
      </Link>
    )
  }

}
