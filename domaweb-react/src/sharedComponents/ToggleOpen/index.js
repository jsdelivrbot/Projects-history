/**
*
* Togle Open Component
*
**/

import React from 'react';

class ToggleOpen extends React.Component {

  state = {
    isOpen: true
  };

  toggleHandler = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    console.log('Toggle Handler Running');
  };

  /*
 This resizehandler will be called when the resize rule is passed to the compomemt
 */

  resizeHandler = (resizeRule) => {
    //
    // var _this = this; // Pass the component context reference to the variable
    //
    window.addEventListener('resize', function(event) {
      if (window.matchMedia(resizeRule).matches) {
        _this.setState({isOpen: true});
      } else {
        _this.setState({isOpen: false});
      }
    });
  };

  componentDidMount() {

    //If the rule props is passed then run the resize handler
    if (this.props.resizeRule)
      this.resizeHandler(this.props.resizeRule);

    }

  render() {
    return this.props.children(this.state.isOpen, this.toggleHandler);
  }
}

export default ToggleOpen;
