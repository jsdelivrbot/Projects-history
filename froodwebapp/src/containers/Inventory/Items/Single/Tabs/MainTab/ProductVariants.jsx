/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { GridTable, NewTableRow } from 'components';
import { connect } from 'react-redux';
import {
  productVariantsNewColumns,
  productVariantsEditColumns,
  productOptionsColumns
} from './productVariantsColumns';

const mapStateToProps = state => ({
  countries: state.commonData.countries,
  taxCategories: state.commonData.taxCategories,
  zoneTypes: state.commonData.zoneTypes,
  defaultLocations: state.commonData.defaultLocations,
  skuStatusTypes: state.commonData.skuStatusTypes
});

const ProductVariants = ({
  isNewSkuItem,
  hasInitialProductVariants,
  productKeyColumnDisabled,
  // data
  productOptions,
  productVariants,
  // static data
  countries,
  taxCategories,
  defaultLocations,
  zoneTypes,
  skuStatusTypes,
  // handlers
  handleUpdateProductOptionsKeys,
  handleUpdateProductOptionsValues,
  handleAddProductOptionRow,
  handleUpdateProductVariants
}) => (
  <div>
    <Row>
      <Col xs>
        <GridTable
          updateTableData={ handleUpdateProductOptionsKeys }
          updateTableTags={ handleUpdateProductOptionsValues }
          columns={ productOptionsColumns(productKeyColumnDisabled) }
          dataSource={ productOptions }
        />
        { /* Show New Row if its new sku item or existing item with no options */}
        { ((!hasInitialProductVariants && productOptions.length < 3)
        || (hasInitialProductVariants && !productKeyColumnDisabled && productOptions.length < 3))
        &&
          <NewTableRow
            hasData
            onClick={ handleAddProductOptionRow }
            addNewRowText="Add New Option"
            addOtherRowText="Add One More Option"
          />
        }
      </Col>
    </Row>
    { isNewSkuItem &&
      <Row>
        <Col xs>
          <GridTable
            updateTableData={ handleUpdateProductVariants }
            columns={ productVariantsNewColumns }
            dataSource={ productVariants }
          />
        </Col>
      </Row>
    }
    { !isNewSkuItem &&
      <Row>
        <Col xs>
          <GridTable
            updateTableData={ handleUpdateProductVariants }
            dataSource={ productVariants }
            columns={ productVariantsEditColumns(
              productOptions,
              countries,
              taxCategories,
              defaultLocations,
              zoneTypes,
              skuStatusTypes
            ) }
          />
        </Col>
      </Row>
    }
  </div>
);

ProductVariants.propTypes = {
  // props
  hasInitialProductVariants: PropTypes.bool.isRequired,
  productKeyColumnDisabled: PropTypes.bool.isRequired,
  isNewSkuItem: PropTypes.bool.isRequired,
  // data
  productOptions: PropTypes.array.isRequired,
  productVariants: PropTypes.array.isRequired,
  // handlers
  handleAddProductOptionRow: PropTypes.func.isRequired,
  handleUpdateProductOptionsKeys: PropTypes.func.isRequired,
  handleUpdateProductOptionsValues: PropTypes.func.isRequired,
  handleUpdateProductVariants: PropTypes.func.isRequired,
  // static data
  countries: PropTypes.array.isRequired,
  taxCategories: PropTypes.array.isRequired,
  defaultLocations: PropTypes.array.isRequired,
  zoneTypes: PropTypes.array.isRequired,
  skuStatusTypes: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(ProductVariants);
