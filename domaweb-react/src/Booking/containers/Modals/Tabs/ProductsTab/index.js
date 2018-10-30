import React from 'react';
import PropTypes from 'prop-types';
import { Row, Checkbox } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/icomoon/plus';
import { minus } from 'react-icons-kit/icomoon/minus';

import Search from '../../../../components/Search';
import { priceFormat } from '../../../../../utils/dateUtil';
import styles from '../../../TimelineCalendar/DomaBooking-styles.scss';

export default function ProductsTab(props) {
  return (
    <Row className={styles.modal_tab_product_wrapper}>
      <div className={styles.typeservices_warning}>
        <div className={styles.search_products_wrapper}>
          <Search classname={styles.search_products} onClick={props.handleSearchButton} />
        </div>
        <span>NOTE: &nbsp;the services coming from type cannot be deselected.</span>
      </div>
      <div className={styles.product_table}>
        <div className={`${styles.product_row_header} row`}>
          <div className={`${styles.product_col_header} ${styles.product_col_header_name} col-xs-4`}>Name</div>
          <div className={`${styles.product_col_header} col-xs-5`}>
            <div className={`${styles.product_col_header} col-xs-4`}>Price (€)</div>
            <div className={`${styles.product_col_header} col-xs-4`}>Quantity</div>
            <div className={`${styles.product_col_header} col-xs-4`}>Total (€)</div>
          </div>
          <div className={`${styles.product_col_header} ${styles.product_col_header_invoice}  col-xs-3`}>Invoice legend</div>
        </div>
        <div>
          {props.availableservices.map((service, index) =>
            <div
              key={`service_${index}`}
              className={`${styles.product_row} row ${service.active && styles.product_row_active}
               ${service.active && !service.canChange && styles.product_row_disable}
               ${service.hide && styles.product_row_hide}
               `}
              onClick={e => props.handlecheckboxvalue(service, e)}
            >
              <div className={service.active && !service.canChange ? 'col-xs-3' : 'col-xs-4'}>
                <div className={styles.product_col_cutText}>
                  <Checkbox
                    checked={service.active}
                    onChange={e => props.handlecheckboxvalue(service, e)}
                    className={styles.product__chkbox}
                    disabled={service.active && !service.canChange}
                    bsClass={styles.service_checkbox}
                  />
                  {service.name}
                </div>
              </div>
              {service.active && !service.canChange &&
                <div className="col-xs-1">
                  <div className={styles.type_service_label}>
                    <span>(type)</span>
                  </div>
                </div>
              }
              <div className="col-xs-5">
                <div className={`${styles.product_col} col-xs-4`}>{priceFormat(service.price)}</div>
                <div className={`${styles.product_col} col-xs-4`}>
                  <div className={styles.products_count_input}>
                    <input
                      onChange={e => props.handlenumberinput(e, service.serviceId)}
                      onClick={e => e.stopPropagation()}
                      type="number"
                      name={`countOfService_${index}`}
                      value={service.count}
                      className={styles.no_spinners}
                      disabled={!service.active || service.timeService}
                    />
                  </div>
                  <div className={styles.products_count_icons}>
                    <Icon
                      size={10}
                      icon={plus}
                      className={`
                      ${styles.product__add__icon} ${
                        (service.active &&
                        service.timeService &&
                        styles.disable_icon &&
                        styles.disable_add) || (!service.active && styles.disable_add)}
                      `}
                      onClick={e => props.handlecount('increase', service, e)}
                    />
                    &nbsp;&nbsp;
                    <Icon
                      size={10}
                      icon={minus}
                      className={`
                        ${styles.product__minus__icon} ${
                        (service.active &&
                        service.timeService &&
                        styles.disable_icon &&
                        styles.disable_minus) || (!service.active && styles.disable_minus)}
                        `}
                      onClick={e => props.handlecount('decrease', service, e)}
                    />
                  </div>
                </div>
                <div className={`${styles.product_col} col-xs-4`}>{priceFormat(service.price * service.count)}</div>
              </div>
              <div className={`${styles.product_col_cutText} col-xs-3`}>
                <span className={styles.invoice__legend}>{service.legend}</span>
              </div>
            </div>,
          ) }
          {/*<div className={`${styles.product_row_footer} row`}>*/}
            {/*<div className="col-xs-4">*/}
              {/*<strong>Total: </strong>{props.total} euros*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
    </Row>
  );
}

ProductsTab.propTypes = {
  availableservices: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
};
