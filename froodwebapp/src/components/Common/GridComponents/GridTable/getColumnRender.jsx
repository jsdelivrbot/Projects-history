import React from 'react';
import {
  GridInput,
  GridInputNumber,
  GridCheckbox,
  GridButton,
  GridSelect,
  GridTags,
  GridDatePicker,
  ConnectedGridSkuAutoComplete
} from 'components';
import { getMenuItems } from 'utils';

const getColumnRender = (
  isExpandable,
  column,
  columnIndex,
  handleChange,
  handleChangeHeaderCheckBoxCell,
  handleChangeExpandedCell,
  handleFillSkuData,
  handleAddTag,
  handleDeleteTag,
  handleDeleteRow,
  handleModalButtonClick
) => (value, record, index) => {

  let component;

  switch (column.type) {
    case 'skuAutoComplete':
      component = (
        <ConnectedGridSkuAutoComplete
          index={ index }
          value={ value }
          vendorId={ column.vendorId }
          propName={ column.dataIndex }
          disabled={ column.disabled }
          onChange={ handleChange }
          handleFillSkuData={ handleFillSkuData }
        />
      );
      break;
    case 'number':
      // expanded row - show input
      if (isExpandable && !record.children) {
        component = (
          <GridInputNumber
            index={ index }
            value={ value }
            min={ column.min }
            max={ column.max }
            parser={ column.parser }
            formatter={ column.formatter }
            autoFocus={ column.autoFocus }
            disabled={ column.disabled }
            propName={ column.dataIndex }
            onChange={ handleChangeExpandedCell }
          />
        );
      // header row - show only value
      } else if (isExpandable && record.children) {
        component = value;
      } else {
        component = (
          <GridInputNumber
            index={ index }
            value={ value }
            min={ column.min }
            max={ column.max }
            parser={ column.parser }
            formatter={ column.formatter }
            autoFocus={ column.autoFocus }
            disabled={ column.disabled }
            propName={ column.dataIndex }
            onChange={ handleChange }
          />
        );
      }
      break;
    case 'text':
      if (isExpandable && !record.children) {
        component = (
          <GridInput
            index={ index }
            value={ value }
            autoFocus={ column.autoFocus }
            propName={ column.dataIndex }
            onChange={ handleChangeExpandedCell }
            disabled={ column.disabled }
          />
        );
      } else if (isExpandable && record.children) {
        component = value;
      } else {
        component = (
          <GridInput
            index={ index }
            value={ value }
            autoFocus={ column.autoFocus }
            propName={ column.dataIndex }
            onChange={ handleChange }
            disabled={ column.disabled }
          />
        );
      }
      break;
    case 'select':
      if (isExpandable && !record.children) {
        component = (
          <GridSelect
            index={ index }
            value={ value }
            propName={ column.dataIndex }
            onChange={ handleChangeExpandedCell }
            menuItems={ getMenuItems(column.menuItems) }
            disabled={ column.disabled }
          />);
      } else if (isExpandable && record.children) {
        component = value;
      } else {
        component = (
          <GridSelect
            index={ index }
            value={ value }
            propName={ column.dataIndex }
            onChange={ handleChange }
            menuItems={ getMenuItems(column.menuItems) }
            disabled={ column.disabled }
          />
        );
      }
      break;
    case 'tags':
      component = (
        <GridTags
          index={ index }
          tags={ value }
          propName={ column.dataIndex }
          handleAddTag={ handleAddTag }
          handleDeleteTag={ handleDeleteTag }
          disabled={ column.disabled }
        />
      );
      break;
    case 'checkbox':
      if (isExpandable && !record.children) {
        component = (
          <GridCheckbox
            index={ index }
            parentId={ record.parentId }
            value={ value }
            propName={ column.dataIndex }
            onChange={ handleChangeExpandedCell }
            disabled={ column.disabled }
          />
        );
      } else if (isExpandable && record.children) {
        component = (
          <GridCheckbox
            index={ index }
            value={ value }
            propName={ column.dataIndex }
            onChange={ handleChangeHeaderCheckBoxCell }
            disabled={ column.disabled }
          />
        );
      } else {
        component = (
          <GridCheckbox
            index={ index }
            value={ value }
            propName={ column.dataIndex }
            onChange={ handleChange }
            disabled={ column.disabled }
          />
        );
      }
      break;
    case 'modalButton':
      component = (
        <GridButton
          text={ column.text }
          index={ index }
          propName={ column.dataIndex }
          handleClick={ handleModalButtonClick }
        />
      );
      break;
    case 'date':
      component = (
        <GridDatePicker
          value={ value }
          index={ index }
          onChange={ handleChange }
          propName={ column.dataIndex }
          defaultValue={ column.defaultValue }
          disabled={ column.disabled }
          activeBeforeToday={ column.activeBeforeToday }
          activeFromToday={ column.activeFromToday }
          firstActiveDate={ column.firstActiveDate }
          lastActiveDate={ column.lastActiveDate }
        />
      );
      break;
    default:
      component = value;
  }
  return component;
};

export default getColumnRender;
