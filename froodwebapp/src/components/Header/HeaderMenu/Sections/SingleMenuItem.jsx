import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import {
  singleItemContainer,
  iconContainer
} from '../HeaderMenu.scss';

const SingleMenuItem = ({
  text,
  url,
  plusIconVisible,
  plusIconUrl,
  activeUrl,
  handleRedirect
}) => (
  <div
    id={ url }
    key={ text }
    title={ url }
    role="button"
    tabIndex={ 0 }
    className={ singleItemContainer }
    onClick={ handleRedirect }
    style={ { backgroundColor: activeUrl === url ? 'antiquewhite' : 'initial' } }
  >
    <div>{ text }</div>
    { plusIconVisible &&
      <div
        className={ iconContainer }
      >
        <Icon
          id={ plusIconUrl }
          title={ plusIconUrl }
          type="plus"
          onClick={ handleRedirect }
        />
      </div>
    }
  </div>
);

SingleMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string,
  plusIconVisible: PropTypes.bool,
  plusIconUrl: PropTypes.string,
  activeUrl: PropTypes.string.isRequired,
  handleRedirect: PropTypes.func.isRequired,
};

export default SingleMenuItem;
