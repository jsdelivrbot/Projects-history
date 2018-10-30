import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

export const NavButtons = (props) => {
	const previous = props.path[props.path.length - 2];
  const current = props.path[props.path.length - 1];
  let next;
  let uid = null;
  if (current) {
    const str = current[current.length - 1];
    uid = current.match(/\/\d+\//)[0];
    const routeNum = Number(str.match(/\d/g));
    if(current === `/onboarding${ uid }step7`) {
      next = `/onboarding${ uid }complete`;
    } else {
      next = `/onboarding${ uid }step${ routeNum + 1 }`;
    }   
  }
  function createTitle(paths) {
    const n = paths[paths.length-1] && paths[paths.length-1].split('/');
    const b = n && n[n.length - 1];
    return b && (b.charAt(0).toUpperCase() + b.slice(1)).replace(/(\d+)/g, ' $1');
  }
  return (
      <div className="container">
    <div className="row">
      <div className="col align-self-start">
        { current !== `/onboarding${ uid }step1` &&
        <Link to={ previous ? previous : '/onboarding' }>
          <RaisedButton label="Back" primary={ true } />
        </Link>
        }
      </div>
      <div className="col align-self-center titleText">
        <p>{ createTitle(props.path) }</p>
      </div>
      <div className="col align-self-end">
        { current !== `/onboarding${ uid }complete` &&
          <Link className="nextBtn" to={ current ? next : '/onboarding' }>
            <RaisedButton label="Next" primary={ true }/>
        </Link>
        }
      </div>
    </div>
      </div>
  );
};

NavButtons.propTypes = {
  path: PropTypes.array,
};
