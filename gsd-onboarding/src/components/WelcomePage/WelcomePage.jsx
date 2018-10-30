import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

export class WelcomePage extends Component {
	constructor(props) {
    super(props);

    this.changeRenderComponent = this.changeRenderComponent.bind(this);
  }

  changeRenderComponent() {
  	this.props.startRedirect();
  }

  render() {
		const paperStyle = {
	    padding: 20,
	    textAlign: 'center',
      fontSize: 20,
	  };
	  const buttonStyle = {
	    width: 250,
	    height: 60,
	    fontSize: 20,
	    marginTop: 40
	  };
	  return (
	  	<div className="container">
	      <div className="row">
	        <div className="d-flex flex-column align-items-center custom-aligned">
	         	<Paper zDepth={ 2 } style={ paperStyle }>
			        <p>
			        	Welcome to the Grata Data Market Onboarding Wizard.<br /> Lorem ipsum dolor sit amet, dicam tritani
								no pri. Ei dicant mandamus sed, cu vis mutat soleat dignissim. Blandit hendrerit dissentiunt id vel.
								Iusto blandit eloquentiam quo ne.
			        </p>
			      </Paper>
						<Link to={`/onboarding/${this.props.userId}/step1`}>
			      <RaisedButton 
				      onClick={ this.changeRenderComponent }
				      label="Get Started" 
				      primary={ true }
			      	style={ buttonStyle }
			      />
						</Link>
	         </div>
	      </div>
	    </div>
  )}
}

WelcomePage.propTypes = {
  startRedirect: PropTypes.func,
  userId: PropTypes.string,
};


