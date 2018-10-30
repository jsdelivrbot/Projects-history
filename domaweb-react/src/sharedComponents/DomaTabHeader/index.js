/**
*
* DomaTabHeader
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './DomaTabHeader-styles.scss';

const NO_DISPLAY_NAME_TEXT = 'Unnamed item';

class DomaTabHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      singleItemView: this.isMobileView(),
      currentActiveValue: this.props.items[0][this.props.valueProp],
      activeItemIndex: 0,
      currentPageIndex: 0,
    };
  }

  componentDidMount() {
    // Listen to resize event to determine which kind of view to show
    window.addEventListener('resize', (event) => {
      if (this.isMobileView()) {
        this.state.singleItemView || this.setState({ singleItemView: true });
      } else {
        !this.state.singleItemView || this.setState({ singleItemView: false });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.activeItemValue !== 'undefined') {
      this.onActiveItemChanged(nextProps.activeItemValue);
    }
  }

  isMobileView = () => window.matchMedia('(max-width: 767px)').matches;

  nextItem = () => {
    this.changeItem(this.props.items[this.state.activeItemIndex + 1][this.props.valueProp]);
  }

  prevItem = () => {
    this.changeItem(this.props.items[this.state.activeItemIndex - 1][this.props.valueProp]);
  }

  nextPage = () => {
    this.setState({
      currentPageIndex: this.state.currentPageIndex + 1,
    });
  }

  prevPage = () => {
    this.setState({
      currentPageIndex: this.state.currentPageIndex - 1,
    });
  }

  onActiveItemChanged = (activeItemValue) => {
    for (let i = 0; i < this.props.items.length; i++) {
      const item = this.props.items[i];
      if (item[this.props.valueProp] === activeItemValue) {
        this.setState({
          currentActiveValue: activeItemValue,
          activeItemIndex: i,
          currentPageIndex: Math.ceil((i + 1) / 3) - 1,
        });
      }
    }
  }

  changeItem = (itemValue) => {
    if (typeof this.props.activeItemValue !== 'undefined') {
      this.props.onChangeItem(itemValue);
    } else {
      this.props.onChangeItem(itemValue);
      this.onActiveItemChanged(itemValue);
    }
  }

  render() {
    // Assign items to a constant
    const items = this.props.items;
    // Extract item based on current page index
    let page = [];
    items.forEach((item, index) => {
      Math.ceil((index + 1) / 3) - 1 === this.state.currentPageIndex &&
        page.push(item);
    });

    // Find the active item
    const activeItem =
      items.find(item => item[this.props.valueProp] === this.state.currentActiveValue);

    // Check conditions to show/hide next - previous buttons
    // Previous button
    const canGoPrevMobile =
      this.state.activeItemIndex === 0 ?
      styles.DomaTabHeader__BtnSlider_MobileDisabled : '';
    const canGoPrevDesktop =
      this.state.currentPageIndex === 0 ?
      styles.DomaTabHeader__BtnSlider_DesktopDisabled : '';
    // Next button
    const canGoNextMobile =
      this.state.activeItemIndex === items.length - 1 ?
      styles.DomaTabHeader__BtnSlider_MobileDisabled : '';
    const canGoNextDesktop =
      (this.state.currentPageIndex === Math.ceil(items.length / 3) - 1) ?
      styles.DomaTabHeader__BtnSlider_DesktopDisabled : '';

    // List of accounts view based upon browser width
    const itemList = this.state.singleItemView ?
    (
      <li className={`${styles.DomaTabHeader__ItemWrapper} ${styles.DomaTabHeader__ItemWrapper_Single}`}>
        <span className={`${styles.DomaTabHeader__ItemWrapper__Item} ${styles.DomaTabHeader__ItemWrapper__Item_Active}`}>
          {activeItem[this.props.displayProp] || this.props.noDisplayNameText || NO_DISPLAY_NAME_TEXT}
        </span>
      </li>
    ) :
      page.map(item =>
        (
          <li key={item.id} className={styles.DomaTabHeader__ItemWrapper}>
            <span
              className={`${styles.DomaTabHeader__ItemWrapper__Item} ${item[this.props.valueProp] === this.state.currentActiveValue ? styles.DomaTabHeader__ItemWrapper__Item_Active : ''}`}
              onClick={() => item[this.props.valueProp] !== this.state.currentActiveValue && this.changeItem(item[this.props.valueProp])}
            >
              {item[this.props.displayProp] || this.props.noDisplayNameText || NO_DISPLAY_NAME_TEXT}
            </span>
          </li>
        ),
      );

    return (
      <Row className={this.props.className ? `${styles.DomaTabHeader__MainWrapper} ${this.props.className}` : styles.DomaTabHeader__MainWrapper}>

        <span className={`${styles.DomaTabHeader__BtnSlider} ${canGoPrevMobile} ${canGoPrevDesktop}`}>
          <span 
            className={styles.DomaTabHeader__BtnSlider__Icon}
            onClick={() => this.state.singleItemView ? this.prevItem() : this.prevPage()}
          >
            {'<'}
          </span>
        </span>

        <ul className={styles.DomaTabHeader__Items}>
          {itemList}
        </ul>

        <span className={`${styles.DomaTabHeader__BtnSlider} ${styles.DomaTabHeader__BtnSlider_right} ${canGoNextMobile} ${canGoNextDesktop}`}>
          <span
            className={styles.DomaTabHeader__BtnSlider__Icon}
            onClick={() => this.state.singleItemView ? this.nextItem() : this.nextPage()}
          >
            {'>'}
          </span>
        </span>

      </Row>
    );
  }
}

DomaTabHeader.propTypes = {
  /**
   * Array of objects to display in the DomaTabHeader.
   */
  items: PropTypes.array.isRequired,
  /**
   * Callback handler for onChangeItem event.
   */
  onChangeItem: PropTypes.func.isRequired,
  /**
   * Name of the property within the object to be displayed in DomaTabHeader.
   */
  displayProp: PropTypes.string.isRequired,
  /**
   * Text to be displayed in case no name is found (e.g. null or empty string)
   */
  noDisplayNameText: PropTypes.string,
  /**
   * Name of the property within the object to be emitted when active item changes.
   */
  valueProp: PropTypes.string.isRequired,
  /**
   * Active value to be kept track by parent component or state,
   * otherwise it will be managed internally and first object will be activated at first by default.
   */
  activeItemValue: PropTypes.any,
  /**
   * Custom class name
   */
  className: PropTypes.string,
  /**
   * Custom styles object
   */
  styles: PropTypes.object,
};

DomaTabHeader.defaultProps = {
  noDisplayNameText: NO_DISPLAY_NAME_TEXT,
};

export default DomaTabHeader;
