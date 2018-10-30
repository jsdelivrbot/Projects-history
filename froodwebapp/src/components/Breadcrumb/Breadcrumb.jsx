/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as AnBreadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { startCase } from 'lodash';
import { breadcrumb, brItem } from './Breadcrumb.scss';

const Breadcrumb = ({ pathnames }) => (
  <AnBreadcrumb
    separator="/"
    className={ breadcrumb }
  >
    { pathnames.slice(1, pathnames.length).filter(pn => isNaN(pn)).map((pathname, index) => (
      <AnBreadcrumb.Item key={ pathname } className={ brItem }>
        { index === 0 // first item must be inactive
          ? startCase(pathname)
          : <Link to={ pathnames.slice(0, index + 2).join('/') }>{ startCase(pathname) }</Link> }
      </AnBreadcrumb.Item>
    ))}
  </AnBreadcrumb>
);

Breadcrumb.propTypes = {
  pathnames: PropTypes.array
};

export default Breadcrumb;
