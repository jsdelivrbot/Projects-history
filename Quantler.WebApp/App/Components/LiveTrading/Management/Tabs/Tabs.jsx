import React from 'react'
import Radium from 'radium'
import {Fonts, Colors} from '../../../Utils/GlobalStyles.jsx'

let Styles = () => {
  return {
    row: {
      display: 'flex',
      fontFamily: Fonts.openSans,
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.9)',
      ':hover': {
        color: Colors.white
      }
    },
    tab: {
      width: 130,
      height: 32,
      cursor: 'pointer',
      userSelect: 'none',
      marginRight: 1,
      textAlign: 'center',
      lineHeight: '32px',
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      backgroundColor: Colors.primaryLightGrey
    }
  }
}

/* PROPS = { tabs: [], tabsContent: [] } */
@Radium
export class Tabs extends React.Component {
  state = {
    currentTab: 0
  }

  changeCurrentTab = (tabId) => {
    this.setState({ currentTab: tabId })
  }

  render () {
    let style = Styles()
    return (
      <div>
        <div style={[style.row]}>
             {/* Tabs name and color when active */}
             {
               this.props.tabs.map((tab, index) =>
                 <div key={index}
                      style={[style.tab, this.state.currentTab == index && { backgroundColor: Colors.primaryLight }]}
                      onClick={ () => {this.changeCurrentTab(index) }}>{tab}</div>)
             }
        </div>
        {/* Content to be shown */}
        { this.props.tabsContent[this.state.currentTab] }
      </div>
    )
  }
}
