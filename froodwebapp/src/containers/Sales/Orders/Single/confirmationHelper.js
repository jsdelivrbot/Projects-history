import React from 'react';
import { startCase } from 'lodash';
import { Icon } from 'antd';
import diff from 'object-diff';
import {
  confirmItem,
  confirmNewItem,
  confirmDeleteItem
} from './confirmationHelper.scss';

export default (formValues, initialValues) => {
  // order changes
  const orderChanges = diff(formValues, initialValues);

  const modalData = Object.getOwnPropertyNames(orderChanges).map(propName =>
    propName !== 'skuDetails' &&
    <p key={ propName } className={ confirmItem }>
      <Icon type="check" />
      { `${startCase(propName)} changed from ` }
      <span>{ `${orderChanges[propName]} ` }</span>
      to
      <span>{ ` ${formValues[propName]}` }</span>
    </p>
  );

  // if added new skuDetails or changed existing skuDetails
  formValues.skuDetails.forEach((skuDetail, index) => {
    if (skuDetail.deleted) return;

    const initialSkuDetail = initialValues.skuDetails[index];

    if (initialSkuDetail) { // if its not a new item
      const differ = diff(skuDetail, initialValues.skuDetails[index]);
      Object.getOwnPropertyNames(differ).map(propName =>
        modalData.push(
          <p key={ propName } className={ confirmItem }>
            <Icon type="check" />
            { `${skuDetail.skuName} ${startCase(propName)} changed from ` }
            <span>{ `${differ[propName]} ` }</span>
            to
            <span>{ ` ${skuDetail[propName]}` }</span>
          </p>
        )
      );
    } else { // if a new item
      modalData.push(
        <p key={ skuDetail.skuName } className={ confirmNewItem }>
          <Icon type="check" />
          { `Added ${skuDetail.skuName} with Qty ` }
          <span>{ `${skuDetail.qty} ` }</span>
          { Number(skuDetail.discount) !== 0 &&
            <span>
              <span>and Discount</span>
              <span>{ ` ${skuDetail.discount}` }</span>
            </span>
          }
        </p>
      );
    }
  });

  // if removed skuDetails
  formValues.skuDetails.filter(sku => sku.deleted === true && sku.new !== true)
    .forEach(skuDetail =>
      modalData.push(
        <p key={ skuDetail.skuName } className={ confirmDeleteItem }>
          <Icon type="check" />
        Removed
          <span>{ ` ${skuDetail.skuName}` }</span>
        </p>
      )
    );

  return modalData;
};
