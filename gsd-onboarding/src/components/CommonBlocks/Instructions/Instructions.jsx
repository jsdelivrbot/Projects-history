import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import classNames from 'classnames';

export const Instructions = ({text, children, isStep1}) => {
	const strategiesText = 'Please arrange your strategies in the following list using the guide below. Select both the user defined and dropdown options for each strategy.  If needed, please add more rows.';
  const style = {
    padding: 10,
    marginBottom: 20,
  };
  const instructionsClasses = classNames({
    'step-title': true,
    'step1-title': isStep1
  });
  return (
    <div>
			{text.length > 0 ?
			<section className={ instructionsClasses }>
				<Paper zDepth={ 1 } style={ style }>
					<h6>Instructions:</h6>
					<p>{ text }</p>
          { children }
				</Paper>
			</section> :
			<section className="step-title">
				<Paper zDepth={ 1 } style={ style }>
					<h6>Instructions:</h6>
					<p>{ strategiesText }</p>
          { children }
				</Paper>
			</section>}
		</div>
  );
};

Instructions.propTypes = {
  text: PropTypes.string,
  children: PropTypes.element,
  isStep1: PropTypes.bool
};


