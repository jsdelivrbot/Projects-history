import React from 'react';
import PropTypes from 'prop-types';

const randomColor = require('randomcolor');

class BackgroundPainter extends React.Component {
  // only repaint if something really changes
  shouldComponentUpdate(nextProps) {
    return nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
           nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
           nextProps.canvasWidth !== this.props.canvasWidth ||
           nextProps.activeItem !== this.props.activeItem ||
           nextProps.focusedItem !== this.props.focusedItem ||
           Object.values(nextProps.groupHeights).join(',') !== Object.values(this.props.groupHeights).join(',');
  }

  render() {
    const {
      groupTops,
      groupHeights,
      canvasWidth,
      groups,
    } = this.props;

    const backgrounds = [];
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].id === this.props.activeItem || groups[i].id === this.props.focusedItem) {
        backgrounds.push(
          <div
            key={i}
            style={{
              top: groupTops[i],
              height: groupHeights[i],
              left: 0,
              width: canvasWidth,
              background: '#4D4D4D',
              position: 'absolute',
              zIndex: '50',
              opacity: '0.1',
            }}
          />,
        );
      } else {
        backgrounds.push(
          <div
            key={i}
            style={{
              top: groupTops[i],
              height: groupHeights[i],
              left: 0,
              width: canvasWidth,
              background: randomColor(),
            }}
          />,
        );
      }
    }
    return (
      <div style={{ display: 'absolute' }}>
        {backgrounds}
      </div>
    );
  }
}

export default BackgroundPainter;
