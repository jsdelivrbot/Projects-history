/* eslint-disable babel/new-cap, react/no-array-index-key, react/jsx-filename-extension */
import React from 'react';
import { Checkbox } from 'antd';
import { Row, Cell } from './TableComponents';
import ConnectedDraggableHeader from './DraggableHeader';
import styles from './StickyTable.scss';

const getTableRows = (
  headers,
  data,
  selectedRows,
  handleRowClick,
  handleDownloadItem,
  handleSelectRows,
  handleSort,
  actionColumnVisible,
  moveHeader,
  saveHeaderOrder
) => {
  const rows = [];
  rows.push(
    <Row key="headers">
      <Cell>
        <Checkbox
          onClick={ e => handleSelectRows('all', e.target.checked) }
        />
      </Cell>
      { headers.map((header, headerIndex) => (
        <ConnectedDraggableHeader
          key={ header.key }
          index={ headerIndex }
          moveHeader={ moveHeader }
          saveHeaderOrder={ saveHeaderOrder }
          isSortable={ header.isSortable }
          handleSort={ handleSort }
          headerId={ header.id }
          headerText={ header.name }
          headerDataType={ header.dataType }
        />
      ))}
      { actionColumnVisible &&
        <Cell>
          Action
        </Cell>
      }
    </Row>
  );

  data.map((item, rowIndex) => (
    rows.push(
      <Row id={ item.id } key={ rowIndex } onClick={ handleRowClick }>
        <Cell>
          <Checkbox
            onClick={ () => handleSelectRows(item.id) }
            checked={ selectedRows.indexOf(item.id) !== -1 }
          />
        </Cell>
        {
          headers.map((header, headerIndex) => (
            <Cell
              key={ `${rowIndex}-${headerIndex}` }
              style={ { textAlign: header.dataType.includes('decimal') ? 'right' : 'left' } }
            >
              { (!header.isEditable
               && header.dataType.includes('decimal')
               && Number(item[header.dataAlias]).toFixed(2))
               || item[header.dataAlias]
              }
            </Cell>
          ))
        }
        { actionColumnVisible &&
          <Cell>
            <span>
              <a
                role="button"
                tabIndex="-1"
                id={ item.id }
                className={ styles.actionText }
                onClick={ handleDownloadItem }
              >
                Download
              </a>
            </span>
          </Cell>
        }
      </Row>
    )
  ));
  return rows;
};

export default getTableRows;
