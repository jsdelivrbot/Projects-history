/* eslint-disable react/no-array-index-key, react/sort-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import elementResizeEvent from 'element-resize-event';
import { Table, Row } from './TableComponents';
import styles from './StickyTable.scss';

const getColRowCount = rows => ({
  rowCount: rows.length,
  columnCount: (rows[0] && React.Children.toArray(rows[0].props.children).length) || 0
});

class StickyTable extends Component {
  constructor(props) {
    super(props);
    const rc = getColRowCount(props.children);

    this.suppressScroll = false;

    this.state = {
      rowCount: rc.rowCount,
      columnCount: rc.columnCount,
      stickyColumnCount: props.stickyColumnCount === 0 ? 0 : (props.stickyColumnCount || 1),
      stickyHeaderCount: props.stickyHeaderCount === 0 ? 0 : (props.stickyHeaderCount || 1)
    };
    this.maxHeight = this.getNodeSize(document.getElementById('main')).height * 0.65; // set max height at 83% of main container
  }

  componentDidMount() {
    this.table = document.getElementById('frood-sticky-table');

    if (this.table) {
      this.realTable = this.table.querySelector('#sticky-table-x-wrapper').firstChild;
      this.xWrapper = this.table.querySelector('#sticky-table-x-wrapper');
      this.yWrapper = this.table.querySelector('#sticky-table-y-wrapper');
      this.xScrollbar = this.table.querySelector('#x-scrollbar');
      this.yScrollbar = this.table.querySelector('#y-scrollbar');
      this.stickyHeader = this.table.querySelector('#sticky-header');
      this.stickyColumn = this.table.querySelector('#sticky-column');
      this.stickyCorner = this.table.querySelector('#sticky-corner');
      this.rightBottomCorner = this.table.querySelector('#right-bottom-corner');

      elementResizeEvent(this.realTable, this.onResize);
      elementResizeEvent(document.body, this.onResizeBody);

      this.xWrapper.addEventListener('scroll', this.onScrollX);

      this.onResize();
      setTimeout(this.onResize);
      this.addScrollBarEventHandlers();
    }
  }

  componentWillReceiveProps(nextProps) {
    const rc = getColRowCount(nextProps.children);

    this.setState({
      rowCount: rc.rowCount,
      columnCount: rc.columnCount
    });
  }

  componentDidUpdate() {
    this.onResize();
  }

  componentWillUnmount() {
    if (this.table) {
      this.xWrapper.removeEventListener('scroll', this.onScrollX);
    }
  }

  onResizeBody = () => {
    this.yWrapper.style.maxHeight = `${this.getNodeSize(document.getElementById('main')).height * 0.65}px`;
  }

  onResize = () => {
    this.setCornersVisibility();
    this.setRowHeights();
    this.setStickyCellsHeight();
    this.setColumnWidths();
    this.setScrollBarDims();
    this.setScrollBarWrapperDims();
  }

  onScrollX = () => {
    const scrollLeft = Math.max(this.xWrapper.scrollLeft, 0); // Can't have it being less than 0...
    this.stickyHeader.style.transform = `translate3d(${-1 * scrollLeft}px, 0, 0)`;
  }

  setCornersVisibility = () => {
    const tableWidth = this.table.offsetWidth;
    const tableHeight = this.table.offsetHeight;
    const contentWidth = this.xScrollbar.firstChild.offsetWidth;
    const contentHeight = this.yScrollbar.firstChild.offsetHeight;

    if (tableWidth >= contentWidth && tableHeight >= contentHeight) {
      this.rightBottomCorner.style.display = 'none';
      this.table.style.paddingBottom = '0';
      this.xWrapperMargin = 0;
      this.yWrapperMargin = 0;
    }

    if (tableWidth <= contentWidth && tableHeight <= contentHeight) {
      this.rightBottomCorner.style.display = 'block';
      this.table.style.paddingBottom = '13px';
      this.xWrapperMargin = 14;
      this.yWrapperMargin = 14;
    }

    if (tableWidth >= contentWidth && tableHeight <= contentHeight) {
      this.rightBottomCorner.style.display = 'none';
      this.table.style.paddingBottom = '0';
      this.xWrapperMargin = 0;
      this.yWrapperMargin = 0;
    }

    if (tableWidth <= contentWidth && tableHeight >= contentHeight) {
      this.rightBottomCorner.style.display = 'none';
      this.table.style.paddingBottom = '13px';
      this.xWrapperMargin = 0;
      this.yWrapperMargin = 0;
    }
  }

  setScrollBarDims = () => {
    this.xScrollbar.firstChild.style.width = `${this.getNodeSize(this.realTable.firstChild).width - this.stickyColumn.offsetWidth - this.xWrapperMargin}px`;
    this.yScrollbar.firstChild.style.height = `${this.getNodeSize(this.realTable).height - this.stickyHeader.offsetHeight - this.yWrapperMargin}px`;
  }

  setScrollBarWrapperDims = () => {
    this.xScrollbar.style.width = `calc(100% - ${this.stickyColumn.offsetWidth + this.xWrapperMargin}px)`;
    this.xScrollbar.style.left = `${this.stickyColumn.offsetWidth}px`;

    this.yScrollbar.style.height = `calc(100% - ${this.stickyHeader.offsetHeight + this.yWrapperMargin}px)`;
    this.yScrollbar.style.top = `${this.stickyHeader.offsetHeight}px`;
  }

  getNodeSize = (node) => {
    const nodeStyle = this.getStyle(node);
    const width = node.offsetWidth
      - parseFloat(nodeStyle.paddingLeft)
      - parseFloat(nodeStyle.paddingRight)
      - parseInt(nodeStyle.borderLeftWidth, 10)
      - parseInt(nodeStyle.borderRightWidth, 10);

    const height = node.offsetHeight
      - parseFloat(nodeStyle.paddingTop)
      - parseFloat(nodeStyle.paddingBottom)
      - parseInt(nodeStyle.borderTopWidth, 10)
      - parseInt(nodeStyle.borderBottomWidth, 10);

    return { width, height };
  }

  getStyle = (node) => {
    const browserSupportsComputedStyle = typeof getComputedStyle !== 'undefined';

    return browserSupportsComputedStyle ? getComputedStyle(node, null) : node.currentStyle;
  }

  getStickyCorner = (rows) => {
    const stickyCorner = [];
    const cell = React.Children.toArray(rows[0].props.children)[0];

    stickyCorner.push(
      <Row key="stickyCornerCell">
        {cell}
      </Row>
    );

    return stickyCorner;
  }

  getStickyHeader = (rows) => {
    const row = rows[0];
    const cells = [];

    React.Children.toArray(row.props.children).forEach((cell, c) => {
      cells.push(React.cloneElement(cell, { id: `sticky-header-cell-${c}`, key: `${c}stickyHeaderCol` }));
    });

    return (
      <Row id="sticky-header-row">
        {cells}
      </Row>
    );
  }

  getStickyColumn = (rows) => {
    let cells;
    const stickyRows = [];

    rows.forEach((row, r) => {
      cells = React.Children.toArray(row.props.children);

      stickyRows.push(
        <Row key={ `${r}stickyColRow` }>
          { cells[0] }
        </Row>
      );
    });

    return stickyRows;
  }

  setRowHeights = () => {
    let r;
    let cellToCopy;

    if (this.stickyColumnCount) {
      for (r = 0; r < this.rowCount; r += 1) {
        cellToCopy = this.realTable.childNodes[r].firstChild;

        if (cellToCopy) {
          const { height } = this.getNodeSize(cellToCopy);

          this.stickyColumn.firstChild.childNodes[r].firstChild.style.height = `${height}px`;

          if (r === 0 && this.stickyCorner.firstChild.firstChild) {
            this.stickyCorner.firstChild.firstChild.firstChild.style.height = `${height}px`;
          }
        }
      }
    }
  }

  setColumnWidths = () => {
    if (this.state.stickyHeaderCount) {
      for (let c = 0; c < this.state.columnCount; c += 1) {
        const cellToCopy = this.realTable.firstChild.childNodes[c];

        if (cellToCopy) {
          const { width } = this.getNodeSize(cellToCopy);
          let cell = this.table.querySelector(`#sticky-header-cell-${c}`);

          cell.style.width = `${width}px`;
          cell.style.minWidth = `${width}px`;
          cell.style.boxSizing = 'content-box';

          if (c === 0 && this.stickyCorner.firstChild.firstChild) {
            cell = this.stickyCorner.firstChild.firstChild.firstChild;

            cell.style.width = `${width}px`;
            cell.style.minWidth = `${width}px`;
          }
        }
      }
    }
  }

  setStickyCellsHeight = () => {
    const secondRow = this.realTable.firstChild.nextSibling;
    if (secondRow) {
      const rowHeight = secondRow.firstChild && secondRow.firstChild.offsetHeight;
      if (rowHeight) {
        for (let c = 0; c < this.state.rowCount; c += 1) {
          const cell = this.stickyColumn.firstChild.childNodes[c];

          if (c !== 0) { // skip header cell
            cell.style.height = `${rowHeight}px`;
          }
        }
      }
    }
  }

  addScrollBarEventHandlers = () => {
    // X Scrollbars
    this.xWrapper.addEventListener('scroll', this.scrollXScrollbar);
    this.xScrollbar.addEventListener('scroll', () => {
      if (!this.suppressScroll) {
        this.xWrapper.scrollLeft = this.xScrollbar.scrollLeft;
        this.suppressScroll = true;
      } else {
        this.suppressScroll = false;
      }
    });

    // Y Scrollbars
    this.yWrapper.addEventListener('scroll', this.scrollYScrollbar);
    this.yScrollbar.addEventListener('scroll', () => {
      if (!this.suppressScroll) {
        this.yWrapper.scrollTop = this.yScrollbar.scrollTop;
        this.suppressScroll = true;
      } else {
        this.suppressScroll = false;
      }
    });
  }

  scrollXScrollbar = () => {
    if (!this.suppressScroll) {
      this.xScrollbar.scrollLeft = this.xWrapper.scrollLeft;
      this.suppressScroll = true;
    } else {
      this.suppressScroll = false;
    }
  }

  scrollYScrollbar = () => {
    if (!this.suppressScroll) {
      this.yScrollbar.scrollTop = this.yWrapper.scrollTop;
      this.suppressScroll = true;
    } else {
      this.suppressScroll = false;
    }
  }

  render() {
    const { children } = this.props;
    const { stickyColumnCount, stickyHeaderCount } = this.state;
    const rows = React.Children.toArray(children);

    let stickyColumn;
    let stickyHeader;
    let stickyCorner;

    if (rows.length) {
      if (stickyColumnCount > 0 && stickyHeaderCount > 0) {
        stickyCorner = this.getStickyCorner(rows);
      }
      if (stickyColumnCount > 0) {
        stickyColumn = this.getStickyColumn(rows);
      }
      if (stickyHeaderCount > 0) {
        stickyHeader = this.getStickyHeader(rows);
      }
    }

    return (
      <div className={ styles.stickyTable } id="frood-sticky-table">
        <div className={ styles.xScrollbar } id="x-scrollbar"><div /></div>
        <div className={ styles.rightBottomCorner } id="right-bottom-corner" />
        <div className={ styles.leftBottomCorner } id="left-bottom-corner" />
        <div className={ styles.yScrollbar } id="y-scrollbar"><div /></div>
        <div className={ styles.stickyCorner } id="sticky-corner">
          <Table>{stickyCorner}</Table>
        </div>
        <div className={ styles.stickyHeader } id="sticky-header">
          <Table>{stickyHeader}</Table>
        </div>
        <div className={ styles.stickyTableYWrapper } style={ { maxHeight: this.maxHeight } } id="sticky-table-y-wrapper">
          <div className={ styles.stickyColumn } id="sticky-column">
            <Table>{stickyColumn}</Table>
          </div>
          <div className={ styles.stickyTableXWrapper } id="sticky-table-x-wrapper">
            <Table>{rows}</Table>
          </div>
        </div>
      </div>
    );
  }
}

StickyTable.propTypes = {
  stickyColumnCount: PropTypes.number,
  stickyHeaderCount: PropTypes.number,
  children: PropTypes.array,
};

export default StickyTable;

