import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export const SideNav = (props) => {
  const userID = props.userId;
  return (
    <Drawer open>
      <h6 className="progress-header">Progress</h6>
      <Link className={props.currentRoute === `/onboarding/${userID}/step1` ? "active side-link" : "side-link"} to={`/onboarding/${userID}/step1`}><MenuItem>Step 1</MenuItem></Link>
      <Link className={props.currentRoute === `/onboarding/${userID}/step2` ? "side-link active" : "side-link"} to={`/onboarding/${userID}/step2`}><MenuItem>Step 2</MenuItem></Link>
      <Link className={props.currentRoute === `/onboarding/${userID}/step3` ? "side-link active" : "side-link"} to={`/onboarding/${userID}/step3`}><MenuItem>Step 3</MenuItem></Link>
      <Link className={props.currentRoute === `/onboarding/${userID}/step4` ? "side-link active" : "side-link"} to={`/onboarding/${userID}/step4`}><MenuItem>Step 4</MenuItem></Link>
      <Link className={props.currentRoute === `/onboarding/${userID}/step5` ? "side-link active" : "side-link"} to={`/onboarding/${userID}/step5`}><MenuItem>Step 5</MenuItem></Link>
      <Link className={props.currentRoute === `/onboarding/${userID}/step6` ? "side-link active" : "side-link"} to={`/onboarding/${userID}/step6`}><MenuItem>Step 6</MenuItem></Link>
      <Link className={props.currentRoute === `/onboarding/${userID}/step7` ? "side-link active" : "side-link"} to={`/onboarding/${userID}/step7`}><MenuItem>Step 7</MenuItem></Link>
      <Link className={props.currentRoute === `/onboarding/${userID}/complete` ? "side-link active" : "side-link"} to={`/onboarding/${userID}/complete`}><MenuItem>Complete</MenuItem></Link>
    </Drawer>
  );
};

SideNav.propTypes = {
  userId: PropTypes.string,
  currentRoute: PropTypes.string,
};



