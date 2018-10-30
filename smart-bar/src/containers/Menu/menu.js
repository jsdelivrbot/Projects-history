import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import auth from 'api/auth';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {open: true};
    };

    handleSignOut = () => {
      auth.signOut();
    }

    render() {
        return (
            <div >

                <Drawer containerStyle={{backgroundColor: '#333439', color:'#ffffff'}} open={this.state.open}>

                   <MenuItem  href="/grammarly" style={{color:'#ddd'}}>
                       <i className="material-icons menu-icons">home</i>
                       My Grammarly
                   </MenuItem>

                    <MenuItem href="/profile" style={{color:'#ddd'}}>
                        <i className="material-icons menu-icons">account_circle</i>
                        Profile
                    </MenuItem>

                    <MenuItem  href="/apps" style={{color:'#ddd'}}>
                        <i className="material-icons menu-icons">favorite</i>
                        Apps
                    </MenuItem>

                    <MenuItem  href="/premium" style={{color:'#ddd'}}>
                        <i className="material-icons menu-icons">grade</i>
                        Premium
                    </MenuItem>

                    <MenuItem  href="/login" style={{color:'#ddd'}} onClick={this.handleSignOut}>
                        <i className="material-icons menu-icons">power_settings_new</i>
                        Log out
                    </MenuItem>

                </Drawer>
            </div>
        );
    };
}