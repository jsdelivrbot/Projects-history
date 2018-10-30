/*
 * Login form
 *
 */

import React from 'react';

import  {Grid, Row, Jumbotron} from 'react-bootstrap';

import styles from './Login-styles.scss';

//comment

const Login = () => (  
	<div className="wrapper">
		<form className="form-signin">       
			<h2 className="form-signin-heading">Please login</h2>
			<input type="text" className="form-control" name="username" placeholder="Username" required=""  />
			<input type="password" className="form-control" name="password" placeholder="Password" required=""/>      
			<label className="checkbox">
				<input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember me
			</label>
			<button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
		</form>
	</div>
);

export default Login;


