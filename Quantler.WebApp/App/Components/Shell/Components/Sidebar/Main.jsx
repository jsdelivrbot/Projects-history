import * as React from 'react'
import {Link} from 'react-router'
import {Routes} from '../../../../Routes.jsx'
import {connect} from '../../../../State.jsx'
import {}          from './q-side-bar.scss'
import Radium, {Style} from 'radium'
import {Icons, Fonts, Colors} from '../../../Utils/GlobalStyles.jsx'

@connect(state => ({ ui: state.ui }))
class Sidebar extends React.Component {
  isActive (route) {
    return this.props.location.pathname === route
  }

  getMenuItemPropClasses (item) {
    return (item.heading ? 'nav-heading' : '') + (this.isActive(item) ? ' active' : '')
  }

  sidebar = {
    enable: () => {
      $(() => $('.scrollbar-inner').scrollbar())
    },
    disable: () => {
      $('.scrollbar-inner').scrollbar('destroy')
    }
  }

  componentDidMount = this.sidebar.enable
  componentDidUpdate = this.sidebar.enable
  componentWillUpdate = this.sidebar.disable
  componentWillUnmount = this.sidebar.disable

  render () {
    let { ui } = this.props

    let collapsed = (ui.activeLayout !== ui.layoutTypes.expanded)

    let className =
      'scrollbar-inner no-transition-all ' +
      'aside q-side-bar unselectable-all ' +
      (collapsed ? 'q-side-bar-collapsed' : '')

    let style = { height: '100%', position: 'fixed', paddingTop: '50px', width: 1 }

    return (
      <div style={ style }>
        <aside className={ className }>
          <br/>
          <ul>
            <li className={this.isActive(Routes.Dashboard) ? 'active' : ''}>
              <Link to={Routes.Dashboard}>
                <em className='zmdi zmdi-view-dashboard'/>
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
          <header>
            <h6>Development</h6>
          </header>
          <ul>
            <li className={this.isActive(Routes.Backtester) ? 'active' : ''}>
              <Link to={Routes.Backtester}>
                <em className='fa fa-bar-chart'/>
                <span>Backtester</span>
              </Link>
            </li>
            <li className={this.isActive(Routes.Templates) ? 'active' : ''}>
              <Link to={Routes.Templates}>
                <em className='fa fa-chain-broken'/>
                <span>Templates</span>
              </Link>
            </li>
            <li className={this.isActive(Routes.Samples) ? 'active' : ''}>
              <Link to={Routes.Samples}>
                <em className='fa fa-flask'/>
                <span>Data Library</span>
              </Link>
            </li>
            <li className={this.isActive(Routes.Algorithms) ? 'active' : ''}>
              <Link to={Routes.Algorithms}>
                <em className='fa fa-code'/>
                <span>Algorithms</span>
              </Link>
            </li>
          </ul>
                    <header>
            <h6>Live Trading</h6>
          </header>
          <ul>
            <li className={this.isActive(Routes.Management) ? 'active' : ''}>
              <Link to={Routes.Management}>
                <em className='zmdi zmdi-money-box'/>
                <span>Management</span>
              </Link>
            </li>
            <li className={this.isActive(Routes.Accounts) ? 'active' : ''}>
              <Link to={Routes.Accounts}>
                <em className='zmdi zmdi-account-box-o'/>
                <span>Accounts</span>
              </Link>
            </li>
          </ul>
          <header>
            <h6>Community</h6>
          </header>
          <ul>
            <li className={this.isActive(Routes.Community) ? 'active' : ''}>
              <Link to={Routes.Community}>
                <em className='zmdi zmdi-comments'/>
                <span>Discussions</span>
              </Link>
            </li>
            <li className={this.isActive(Routes.Marketplace) ? 'active' : ''}>
              <Link to={Routes.Marketplace}>
                <em className='zmdi zmdi-widgets'/>
                <span>Trading Ideas</span>
              </Link>
            </li>
          </ul>
          <header>
            <h6>Documentation</h6>
          </header>
          <ul>
            <li className={this.isActive(Routes.Faq) ? 'active' : ''}>
              <Link to={Routes.Faq}>
                <em className='fa fa-question'/>
                <span>{'Help & FAQs'}</span>
              </Link>
            </li>
          </ul>
          <GitButton collapsed={ collapsed } colors={{ bgColor: Colors.secondary, borderColor: Colors.secondaryDarker }}/>
          <SupportButton collapsed={ collapsed } colors={{ bgColor: '#45c9c6', borderColor: '#35b2af' }}/>
        </aside>
      </div>
    )
  }
}

module.exports = Sidebar

/* -- Github and Support Button Style --- */

let styles = ({ bgColor, borderColor }) => {
  return {
    height: 40,
    margin: '0 auto',
    padding: '0 15px',
    backgroundColor: bgColor,
    borderRadius: 3,
    boxShadow: 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.5)',
    border: 'solid 1px '.concat(borderColor),

    ':active': {
      boxShadow: '0 1px 10px 0 rgba(0,0,0, 0.3) inset'
    },

    fontFamily: Fonts.openSans,
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: 0.6,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: '40px',

    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',

    icon: {
      fontSize: 22,
      position: 'relative',
      top: 3
    }
  }
}

let GitButton = Radium(({ collapsed, colors }) => {

  let style = styles(colors)

  return (
    <div
      className='btn-github'
      style={{ width: '100%', background: 'transparent' }}
    >
      <Style rules={{
        mediaQueries: {
          '(max-height: 840px)': {
            '.btn-github': {
              margin: '10px 0 10px 0'
            }
          },
          '(min-height: 840px)': {
            '.btn-github': {
              position: 'absolute',
              bottom: 90
            }
          }
        }
      }}/>

      <a style={{ display: 'flex', textDecoration: 'none' }}
         href='https://github.com/Quantler'
         target='_blank'
      >
        <div style={[style]}>
          <i style={[style.icon]} className={Icons.github}/>
             {
               !collapsed ? ' GITHUB' : ''
             }
        </div>
      </a>
    </div>
  )
})

let SupportButton = Radium(({ collapsed, colors }) => {

  let style = styles(colors)

  let openSupportPane = () => {
    $('.UR_element .UR_tabHandler').click()
  }

  return (
    <div
      className='btn-support'
      style={{ width: '100%', background: 'transparent' }}
    >
      <Style rules={{
        mediaQueries: {
          '(max-height: 840px)': {
            '.btn-support': {
              margin: '10px 0 10px 0'
            }
          },
          '(min-height: 840px)': {
            '.btn-support': {
              position: 'absolute',
              bottom: 40
            }
          }
        }
      }}/>
        <span style={{ display: 'flex' }} onClick={ openSupportPane }>
          <div style={[style]}>
            <i style={[style.icon, { fontSize: 19 }]} className={Icons.support}/>
               {
                 !collapsed ? ' SUPPORT' : ''
               }
          </div>
        </span>
    </div>
  )
})

