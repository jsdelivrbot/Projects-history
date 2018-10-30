import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

export const NextButton = (props) => {
	const current = props.currentRoute;
  let next;
  if (current) {
    const str = current[current.length - 1];
    const uid = current.match(/\/\d+\//)[0];
    const routeNum = Number(str.match(/\d/g));
    if(current === `/onboarding${uid}step7`) {
      next = `/onboarding${uid}complete`;
    } else {
      next = `/onboarding${uid}step${routeNum + 1}`;
    }   
  }
  return (
    <div className="d-flex justify-content-center bottom-button">
      <Link to={current ? next : '/onboarding'}>
        <RaisedButton label={props.text}  primary={true} />
      </Link> 
    </div>
  );
};

NextButton.propTypes = {
  currentRoute: PropTypes.string,
  text: PropTypes.string,
};
