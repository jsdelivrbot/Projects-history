/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import  {Grid, Row, Col, Button, ProgressBar, Jumbotron} from 'react-bootstrap';

import messages from './messages';
// import Login from '../Login/LoginForm';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
    		<Row>
		    	<Jumbotron style={{"backgroundColor":"white"}}>
		    		<h1> <FormattedMessage {...messages.header} /></h1>
		    		<p>Welcome to Domacare 2.0. Happy coding</p>
		    		<p><Button bsStyle="primary">Learn more</Button></p>
		  		</Jumbotron>
        </Row>

    );
  }
}
