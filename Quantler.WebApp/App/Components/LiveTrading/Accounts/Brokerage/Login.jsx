import {Component} from 'react'
import Radium from 'radium'
import {Header} from './Header.jsx'
import {MainButton} from '../../../Buttons/MainButton.jsx'
import {Icons, Fonts, Colors} from '../../../Utils/GlobalStyles.jsx'
import {LiveTrading} from '../../../../Functions/Functions.jsx'
import {connect} from '../../../../State.jsx'
import Functions from '../../../../Functions/Functions.jsx'
import {Routes} from '../../../../Routes.jsx'
import {Link} from 'react-router'
import Chosen from 'react-chosen'

let Styles = () => {
  return {
    common: {
      fontFamily: Fonts.openSans,
      fontWeight: 300
    },
    container: {
      marginTop: '10%',
      padding: 20,
      backgroundColor: Colors.white,
      borderRadius: 5,
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.15)'

    },
    header: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      title: {
        fontSize: 16,
      },
      link: {
        color: Colors.primaryLightGrey,
        textDecoration: 'none',
        fontSize: 12,
        ':hover': {
          color: Colors.secondary
        }
      }
    },
    form: {
      marginTop: 20,

      input: {
        outline: 'none',
        width: '100%',
        fontSize: 12,
        paddingLeft: '5%',
        height: 50,
        borderRadius: 5,
        border: '1px solid rgba(61, 62, 75, 0.3)',
        ':focus': {
          border: '1px solid '.concat(Colors.orange)
        }
      }
    },
    button: {
      display: 'flex',
      justifyContent: 'center'
    },
    bottomBox: {
      marginTop: 20,
      padding: 20,
      borderRadius: 5,
      backgroundColor: '#E0E4EA',
      border: '1px inset rgba(62, 62, 75, 0.1)',

      title: {
        fontSize: 16,
        marginBottom: 15
      },
      text: {
        fontSize: 12
      }
    }
  }
}

let style = Styles()
let header = style.header
let form = style.form
let bottomBox = style.bottomBox

@connect(state => state.livetrading.accounts.login)
@Radium
export class Login extends Component {
  // Enable add button only if a server is selected
  isBrokerSelected = false
  isServerSelected = false

  // Enable add button only if username and password is set
  isUserSet = false

  // waiting for the pusher
  isRunning = false

  update = property => e => {
    if (property === 'broker') {
      //this.refs['server'].options.selectedIndex = 0
      this.isBrokerSelected = true
    }

    if (property === 'server') {
      //this.isServerSelected = this.refs['server'].options.selectedIndex !== 0
      this.isServerSelected = true
    }

    if (property === 'username' || property === 'password') {
      this.isUserSet = this.refs[ 'username' ].value.length > 0 && this.refs[ 'password' ].value.length > 0
    }

    LiveTrading.Accounts.Login.updateForm({
      property, value: e.target.value
    })
  }

  option (type, values) {
    return values.map((value, key) => {
      return (
        <option
          key={ key }
          value={ value }
        >
          { value }
        </option>
      )
    })
  }

  componentDidMount () {
    Functions.LiveTrading.Accounts.Login.load()
  }

  addButtonHandler = () => {
    this.isRunning = true
    Functions.LiveTrading.Accounts.Login.login()
  }

  render () {
    let { selects, broker, server, logging, brokerlogin, brokerloginok } = this.props

    let brokers = this.option('broker', selects.brokers.map(broker => broker.Name))
    let servers = this.option('server', selects.servers.map(server => server.Name))

    let isBrokerloginokBoolean = typeof brokerloginok === 'boolean'

    if (isBrokerloginokBoolean) {
      this.isRunning = false
    }

    return (
      <div style={ style.common }>

        <Header />

        <div style={{ position: 'absolute', width: '50%', left: '50%', marginLeft: '-20%' }}>
          <div style={[style.container]}>

            {/* HEADER */}
            <div style={[header]}>
              <span style={ header.title }>Broker Login</span>
              <a style={ header.link } href={'mailto:support@quantler.com?subject=Missing%20broker:%20'}>
                Can’t find your broker?
              </a>
            </div>

            {/* INPUTS */}

            <div style={[form]} className="row">
              <div className="col-sm-6">
                <Chosen name="broker"
                        key='1'
                        style={[form.input]}
                        defaultValue={"none"}
                        onChange={ this.update('broker') }>
                  <option value="none">
                    {
                      (!!selects.brokers.length)
                        ? "Broker" : "Loading Brokers..."
                    }
                  </option>
                  { brokers && brokers.map((b) => b) }
                </Chosen>
              </div>

              <div className="col-sm-6">
                <Chosen name="server"
                        ref="server"
                        key='2'
                        style={[form.input]}
                        defaultValue={"none"}
                        onChange={ this.update('server') }>
                  <option style={{ color: Colors.primaryLightGrey }} value="none" disabled>
                    {
                      (!broker)
                        ? "Please Select A Broker"
                        : (!!selects.servers.length)
                        ? "Server"
                        : "No Server Available"
                    }
                  </option>
                  { servers && servers.map((s) => s) }
                </Chosen>
              </div>
            </div>
            <div style={[form]} className="row">
              <div className="col-sm-6">
                <input name="username"
                       ref="username"
                       key='3'
                       style={[form.input]}
                       type={"text"}
                       placeholder={"Username"}
                       onChange={ this.update('username') }/>
              </div>
              <div className="col-sm-6">
                <input name="password"
                       ref="password"
                       key='4'
                       style={[form.input]}
                       type={"password"}
                       placeholder={"Password"}
                       onChange={ this.update('password') }/>
              </div>
            </div>

            <div style={[form, style.button]} className="row">
              {
                !(isBrokerloginokBoolean && brokerloginok === true)
                  ? <MainButton
                  onClick={ this.addButtonHandler }
                  disabled={ logging || !this.isServerSelected || !this.isUserSet || this.isRunning }
                  value={ logging || this.isRunning ? 'ADDING ACCOUNT...' : 'ADD ACCOUNT' }
                  type={ 'secondary' }
                  icon={ Icons.import }/>

                  : (<Link to={Routes.Backtester}>
                  <MainButton
                    value="START TRADING"
                    css={{ backgroundColor: '#45c9c6', border: '1px solid #33a9a7' }}/>
                </Link>)
              }
            </div>
          </div>

          {/* Process & results */}
          {
            !brokerlogin.length
              ? null
              : <div style={[bottomBox]}>
              <div style={[bottomBox.title]}>
                Process & results
              </div>
                <span style={[bottomBox.text]}>
                  {
                    brokerlogin.map((message, index) => {

                      let lastLine = brokerlogin.length - 1 === index

                      if (isBrokerloginokBoolean && !brokerloginok && lastLine) {
                        return <div key={ index }
                                    style={{ color: '#f75d55', fontWeight: lastLine ? 400 : 300 }}>
                          { '✗ ' + message }
                        </div>
                      } else {
                        return <div key={ index }
                                    style={{ color: '#45c9c6', fontWeight: lastLine ? 400 : 300 }}>
                          { '✓ ' + message }
                        </div>
                      }
                    })
                  }
                </span>
            </div>
          }
        </div>
      </div>
    )
  }
}
