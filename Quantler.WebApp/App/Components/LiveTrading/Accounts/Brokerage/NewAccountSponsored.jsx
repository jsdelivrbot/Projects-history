import {Component} from 'react'
import Radium, {Style} from 'radium'
import {Header} from './Header.jsx'
import {MainButton} from '../../../Buttons/MainButton.jsx'
import {Icons, Fonts, Colors} from '../../../Utils/GlobalStyles.jsx'
import {Loading}  from '../../../Utils/Components'
import {connect}  from '../../../../State.jsx'
import Functions  from '../../../../Functions/Functions.jsx'
import {Routes}   from "../../../../Routes.jsx"

let Styles = () => {
  return {
    container: {
      fontFamily: Fonts.openSans,
      color: Colors.primary,
      fontWeight: 300,
      cursor: 'default',
      marginLeft: 20
    },
    box: {
      width: 350,
      backgroundColor: Colors.white,
      padding: '20px 0',
      borderRadius: 5,
      boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
    },
    title: {
      fontSize: 16,
      color: Colors.primaryLight,
      fontWeight: 400,
      textAlign: 'center'
    },
    content: {
      marginTop: 15,
      textAlign: 'center'
    },
    logo: {
      margin: '0 auto 10px auto',
      width: 162,
      height: 72
    },
    info: {
      margin: 'auto',
      fontSize: 12,
      color: Colors.primaryLightGrey,
      padding: '2% 15% 0 15%'
    }
  }
}

let style = Styles()

@Radium
class Broker extends Component {
  render () {
    // Name :string
    // Servers :WebAPI.REST Documentation.BrokerMTServer[]
    // Logo :Byte[]
    // SignupURL :string
    // IsSponsor :bit

    let { Name, SponsorInfo } = this.props
    let { SignupLiveURL, SignupDemoURL, Logo, FPALink, FPAButton } = SponsorInfo

    return (
      <div style={{ padding: 10, margin: '4px 0', float: 'left' }}>
        <div style={style.box}>
          <div style={style.content}>
            <div style={style.logo}>
              <img src={ Logo }/>
            </div>

            <a href={ FPALink} target="_blank">
              <img src={ FPAButton }/>
            </a>

            <Table data={ SponsorInfo }/>

            <a href={ SignupLiveURL } target="_blank">
              <MainButton
                value="OPEN ACCOUNT"
                type="secondary"
                icon={Icons.arrowRight}
                css={{ margin: '5px 10px' }}
              />
            </a>
            <a href={ SignupDemoURL } target="_blank">
              <MainButton
                value="REQUEST FORM"
                type="primary"
                icon={Icons.arrowRight}
                css={{ margin: '5px 10px' }}
              />
            </a>
	          <div style={style.info}>
	            Pricing shown is indicative
	          </div>
          </div>
        </div>
      </div>
    )
  }
}

let tableStyle = {
  'td': {
    textAlign: 'left',
    fontSize: 12,
    color: Colors.primary,
    fontWeight: 400,
    cursor: 'default'
  },
  'tr td:first-child': {
    fontWeight: 700,
    paddingLeft: 10
  },
  'tbody tr:nth-child(odd)': {
    backgroundColor: '#f5f7fa'
  }
}

let Table = Radium(({ data }) => {
  let {
    AccountType, ExecutionModel, PricingModel, AverageSpread,
    Commissions, TotalCosts, RoundTrip, Sponsorship } = data
  return (
    <div>
      <Style scopeSelect=".sponsorInfo-table" rules={ tableStyle }/>
      <table className="table sponsorInfo-table">
        <tbody>
        <tr>
          <td>ACCOUNT TYPE:</td>
          <td>{ AccountType }</td>
        </tr>
        <tr>
          <td>EXECUTION MODEL:</td>
          <td>{ ExecutionModel }</td>
        </tr>
        <tr>
          <td>PRICING MODEL:</td>
          <td>{ PricingModel }</td>
        </tr>
        <tr>
          <td>AVARAGE SPREAD:</td>
          <td>{ AverageSpread }</td>
        </tr>
        <tr>
          <td>COMMISSIONS:</td>
          <td>{ Commissions }</td>
        </tr>
        <tr>
          <td>TOTAL COSTS:</td>
          <td>{ TotalCosts }</td>
        </tr>
        <tr>
          <td>(ROUND-TRIP):</td>
          <td>{ RoundTrip }</td>
        </tr>
        <tr>
          <td>SPONSORSHIP:</td>
          <td>{ Sponsorship }</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
})

@connect(state => state.livetrading.accounts.newAccount.sponsored)
@Radium
export class NewAccountSponsored extends Component {
  componentDidMount () {
    Functions.LiveTrading.Accounts.NewAccountSponsored.load()
  }

  render () {
    let { brokers, loading } = this.props
    brokers = brokers.filter(broker => broker.SponsorInfo != null)

    return (
      <div style={ style.container }>
        <Header/>
        {
          loading
            ? <Loading />
            : <div className="row" style={{ paddingTop: 20 }}>
            {
              brokers.length > 0
                ? brokers.map(broker =>
                <Broker key={broker.Name} { ...broker }/>)
                : <NoBrokersBox />
            }
          </div>
        }
      </div>
    )
  }
}

let NoBrokersBox = () => (
  <div style={{
    width: 475,
    margin: '15% auto',
    padding: 20,
    border: '1px solid ' + Colors.blueLight,
    borderRadius: 5,
    textAlign: 'center',
    cursor: 'default',
    color: Colors.primaryLightGrey
    }}>
    <h5>No Brokers Found</h5>
    <span>Sorry, no brokers were found eligible with your request, please contact support</span>
  </div>)
