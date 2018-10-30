/* eslint-disable import/prefer-default-export */
import React from 'react';
import { startCase } from 'lodash';

/**
 *
 * @param {array} params
 * @param {string} header
 */
export const renderAutocompleteItem = (params, header) => (item, isHighlighted) => (
  <div
    key={ item.id }
    style={ {
      backgroundColor: isHighlighted ? '#f7f7f7' : 'white',
      margin: '0.3rem',
      padding: '0.5rem 1rem',
      border: '3px solid #f7f7f7',
      borderRadius: '3px'
    } }
  >
    <span
      style={ {
        display: 'inline-block',
        verticalAlign: 'top',
        marginRight: '1rem'
      } }
    >
      { `${header} :` }
    </span>
    <span
      style={ {
        display: 'inline-block',
        textAlign: 'start'
      } }
    >
      <div>
        <span
          style={ {
            color: 'red',
            display: 'inline-block'
          } }
        >
          { startCase(`${params[0]}`) }
        </span>
        <span>{ ` - ${item[params[0]]}` }</span>
      </div>
      <div>
        <span
          style={ {
            color: 'blue',
            display: 'inline-block'
          } }
        >
          { startCase(`${params[1]}`) }
        </span>
        <span>{ ` - ${item[params[1]]}` }</span>
      </div>
      <div>
        <span
          style={ {
            color: 'green',
            display: 'inline-block'
          } }
        >
          { startCase(`${params[2]}`) }
        </span>
        <span>{ ` - ${item[params[2]]}` }</span>
      </div>
      { params[3] &&
        <div>
          <span
            style={ {
              color: 'brown',
              display: 'inline-block'
            } }
          >
            { startCase(`${params[3]}`) }
          </span>
          <span>{ ` - ${item[params[3]]}` }</span>
        </div>
      }
    </span>
  </div>
);
