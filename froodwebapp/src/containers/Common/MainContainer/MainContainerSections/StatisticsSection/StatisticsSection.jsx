import React from 'react';
import PropTypes from 'prop-types';
import {
  statistics,
  statisticsItem
} from './StatisticsSection.scss';

const checkColor = value => (
  value > 0 ? 'green' : 'red'
);

const simpleSection = (column, key) => (
  <div key={ key } className={ statisticsItem }>
    <div>{ column.dollarSign ? `$${column.value || 0}` : column.value }</div>
    <div>{ column.description }</div>
  </div>
);

const dynamicSection = (column, key) => (
  <div key={ key } className={ statisticsItem }>
    <div style={ { color: checkColor(column.value) } }>
      {
        column.value > 0 ? `+${column.value}` : `-${column.value}`
      }
    </div>
    <div>{ column.description }</div>
  </div>
);

const Statistics = ({ stats }) => (
  <div className={ statistics }>
    { stats && stats.map((column, index) => (
      column.isDynamic
        ? dynamicSection(column, index)
        : simpleSection(column, index)
    ))}
  </div>
);

Statistics.propTypes = {
  stats: PropTypes.array,
};

export default Statistics;

