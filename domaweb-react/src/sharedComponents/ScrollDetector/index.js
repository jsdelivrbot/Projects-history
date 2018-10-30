/**
*
* ScrollDetector
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class ScrollDetector extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      message:'Lataa lisää'
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom === docHeight) {
      this.setState({
        message:'Ladataan lisää...'
      });
      this.props.loadMore();
    } else {
      this.setState({
        message:'Lataa lisää'
      });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div>
        <a onClick={this.props.loadMore}><div className="">{this.state.message}</div></a>
        <div className=""></div>
      </div>
    );
  }
}

ScrollDetector.propTypes = {
}

ScrollDetector.defaultProps = {
}

ScrollDetector.propTypes = {

};

export default ScrollDetector;
