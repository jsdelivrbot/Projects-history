import React, { Component } from 'react';
import Menu from '../../containers/Menu/menu';

export default class App extends Component {
  render() {
    return (
        <div className="app-container">

            <div className="app-menu">
                <Menu />
            </div>

            <div className="app-children-container">

                <div className="app-children">
                {this.props.children}
                </div>

           </div>

       </div>
    );
  };
}

