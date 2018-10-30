import {Component} from 'react'
import Radium, {keyframes} from 'radium'
import {Fonts, Colors} from '../../Utils/GlobalStyles.jsx'
import * as _ from "lodash"
import Shared from '../../LiveTrading/Management/Shared.jsx'
import {valuesOrdered, _try} from '../../../Functions/Utils/Utils.jsx'

let style = {
  table: {
    display: 'flex',
    width: '100%',
    cursor: 'default',
    fontFamily: Fonts.openSans,
    color: Colors.primary,
    fontSize: 12,
    whiteSpace: 'nowrap'
  },
  th: {
    display: 'table-row',
    userSelect: 'none',
    backgroundColor: Colors.primaryLight,
    fontWeight: 600,
    letterSpacing: 0.5,
    color: Colors.white
  },
  tdHeader: {
    display: 'table-cell',
    width: '10%',
    padding: '10px 10px',
    textAlign: 'center'
  }
}

@Radium
export class Row extends Component {
  state = {
    // used below in `this.rowBackground`
    // set by `this.rowHoverOn`
    isRowHover: false
  }

  // used below in `style`
  rowBackground = (active) => {
    return (active
      ? '#FFF'
      : (this.state.isRowHover
      ? 'rgba(0, 0, 0, 0.08)'
      : 'transparent'))
  }

  style = {
    tr: active => ({
      display: 'table-row',
      cursor: 'pointer',
      backgroundColor: this.rowBackground(active)
    }),
    tdContent: {
      display: 'table-cell',
      textAlign: 'center',
      fontWeight: 300,
      padding: '10px 10px',
      borderRight: '1px solid rgba(62, 62, 75, 0.1)',
      borderBottom: '1px solid rgba(62, 62, 75, 0.1)',
    }
  }

  rowHoverOn = () => {
    this.setState({ isRowHover: true })
  }

  rowHoverOff = () => {
    this.setState({ isRowHover: false })
  }

  // used below in parseDontClick
  dontClickMatch = {
    'last': _ => [ (_.length - 1) ]
  }

  /**
   * `dontRowClick` is a prop where you can specify
   * a column that should not run the onRowClick callback.
   * you can pass an specific index number or a string that
   * will be matched with `this.dontClickMatch`. the values
   * should be in an array, where `this.itemsMap` will check
   * if it contains the item's index and not add onClick prop
   */
  parseDontClick (dontClick, rows) {
    if (dontClick) {
      return this.dontClickMatch[ dontClick ](rows)
    } else
    // if dontClick wasn't passed as a props return -1,
    // as this key will not exist in the items array
    {
      return [ -1 ]
    }
  }

  /**
   * maps over passed items array
   */
  itemsMap (items, cellTransform, dontRowClick, onRowClick) {
    return items.map((item, key) => {
      //
      // if item shouldn't have an onClick
      // or if onRowClick wasn't passed
      //
      let onClick = ((dontRowClick.includes(key) || !onRowClick)
        ? {}
        : { onClick: () => onRowClick(items) })

      //
      // the `cellTransform` function may pass additional
      // props which will be added to the element
      //
      let _props = {
        ...onClick,
        key: key + item,
        style: this.style.tdContent
      }

      let originalCell = (props) => (
        <div{ ...Object.deepExtend(_props, props)}>
          { item }
        </div>)

      //
      // if cellTransform wasn't passed,
      // return original element
      //
      return (cellTransform
        ? cellTransform(originalCell, item, items)
        : originalCell())
    })
  }

  render () {
    let { rowHoverOn, rowHoverOff, props, style } = this
    let { onRowClick, cellTransform, items, active, _hover, dontRowClick } = props

    // style is calculated here (render)
    // because the row might be active,
    // passed through props, 'active
    let rowStyle = style.tr(active)

    let rowItems = this.itemsMap(items, cellTransform,
      this.parseDontClick(dontRowClick, items), onRowClick)

    return (
      <div className="livetrading-positions-row"
           onMouseOver={ rowHoverOn }
           onMouseOut={ rowHoverOff }
           style={ rowStyle }>
        {
          rowItems
        }
      </div>
    )
  }
}

@Radium
export class Header extends Component {
  render () {
    return (
      <div id={this.props.id} style={[style.th, this.props.style]}>
        { this.props.children }
      </div>
    )
  }
}

@Radium
export class Table extends Component {
  //
  // sticky header just detects the hight of the scroll,
  // if it's bigger than the position of the header than the
  // stickyHeader (Header with position:absolute) is shown.
  //
  // because the <Header> with position:absolute loses its
  // alignment (the text columns are not aligned with the table
  // columns with position:absolute) we need a duplicate of the
  // original <Header>, that's why there are two being rendered,
  // one is to keep the correct alignment and the other is shown
  // when scrolling. then `this.resizeHeader` correctly sets the
  // width of the header columns when the window resizes
  //
  constructor ({ stickyHeader }) {
    super()

    this.fixedHeaderId = _.uniqueId('_')

    if (stickyHeader) {
      this.stickyHeaderId = _.uniqueId('_')
      //
      // resize sticky header columns width. iterates over
      // each column of the original header and sets its
      // width to the corresponding sticky header column
      //
      this.resizeHeader = () => {
        let stickyChildren = $('#' + this.stickyHeaderId).children()
        $('#' + this.fixedHeaderId).children().each((key, child) => {
          $(stickyChildren[ key ]).css({
            width: $(child).width() + 20
          })
        })
      }
      //
      // when scrolling is passed the headers position it
      // shows the sticky header and sets its top position
      //
      this.moveHeader = () => {
        let _window = $(window)
        let stickyHeader = $('#' + this.stickyHeaderId)
        let fixedHeader = $('#' + this.fixedHeaderId)

        if (fixedHeader.length) {
          let fixedHeaderTop = fixedHeader.offset().top

          if (_window.scrollTop() > fixedHeaderTop - 40) {
            stickyHeader.css('display', 'table-row')
            stickyHeader.css('top', _window.scrollTop() - fixedHeaderTop + 40)
          } else {
            stickyHeader.css('display', 'none')
          }
        }
      }
    }
  }

  componentDidMount () {
    if (this.props.stickyHeader) {
      $(() => {
        $(window).bind('resize', this.resizeHeader)
        $(window).bind('scroll', this.moveHeader)
        setTimeout(this.resizeHeader, 0)
      })
    }
  }

  componentWillUnmount () {
    if (this.props.stickyHeader) {
      $(window).unbind('resize', this.resizeHeader)
      $(window).unbind('scroll', this.moveHeader)
    }
  }

  render () {
    let {
      onRowClick,
      rowActive,
      dontRowClick,
      headers,
      rows,
      stickyHeader,
      cellTransform
    } = this.props

    //
    // function where you can check if the row is active.
    //
    let _rowActive = rowActive || () => false

    let _headers = headers.map((header, key) =>
      <div key={ key + header } style={[style.tdHeader]}>
        { header }
      </div>)

    return (
      <div style={[style.table]}>
        <div style={{
          border: '1px solid ' + Colors.primaryLight,
          display: 'table',
          position: 'relative'
        }}>

          <Header
            children={ _headers }
            id={ this.fixedHeaderId }/>

          {
            stickyHeader &&
            <Header
              style={{ display: 'none', position: 'absolute' }}
              children={ _headers }
              id={ this.stickyHeaderId }/>
          }

          <div className="Table-rows" style={{
            width: '100%',
            maxHeight: 500,
            overflowY: 'scroll',
            display: 'table-row-group'
          }}>
            {
              rows.map((rowItems, key) =>
                <Row
                  cellTransform={ cellTransform }
                  dontRowClick={ dontRowClick }
                  onRowClick={ onRowClick }
                  key={ key }
                  items={ rowItems }
                  active={ _rowActive(rowItems) }/>)
            }
          </div>
        </div>
      </div>)
  }
}

@Radium
class NoAvailable extends Component {
  render () {
    let { text } = this.props

    return <div style={{
      width: '100%',
      textAlign: 'center',
      background: 'rgba(255,255,255,0.2)',
      padding: 10,
      color: '#888'
    }}>
      <h5>{ text }</h5>
    </div>
  }
}

@Radium
export class Positions extends Component {
  match = {
    AgentName: Shared.cell,
    LastModifiedDateTimeUTC: _ => Utils.formatTime(_),
    UnrealizedPnL: Shared.formatCurrencyCell,
    Commission: Shared.formatCurrencyCell,
    Swap: Shared.formatCurrencyCell
  }

  render () {
    let { keys, positions, headers } = this.props
    let rows = valuesOrdered(keys, positions[ Object.keys(positions)[ 0 ] ] || [], Shared.transformer(this.match))

    if (!rows.length) {
      return <NoAvailable text="NO POSITIONS AVAILABLE"/>
    } else {
      return <Table {...{ headers, rows }} cellTransform={ Shared.cellColorTransform }/>
    }
  }
}
