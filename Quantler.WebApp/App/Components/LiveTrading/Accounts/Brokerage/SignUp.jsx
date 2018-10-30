import {Component}            from 'react'
import Radium                   from 'radium'
import {Header}               from './Header.jsx'
import {MainButton}           from '../../../Buttons/MainButton.jsx'
import {Icons, Fonts, Colors} from '../../../Utils/GlobalStyles.jsx'
import {connect} from '../../../../State.jsx'
import Functions from '../../../../Functions/Functions.jsx'
import * as _ from 'lodash'
import Chosen from 'react-chosen'


let Styles = () => {
  return {
    container: {
      fontFamily: Fonts.openSans,
      fontWeight: 300,
      color: Colors.primary
    },
    userDetails: {
      width: '45%',
      marginRight: '1%',
      marginTop: 50,
      borderRadius: 5,
      boxShadow: '0 1px 2px rgba(0,0,0, 0.15)',
      backgroundColor: Colors.white,
      padding: '20px 20px 40px 20px',

      title: {
        fontSize: 16,
        paddingBottom: '3%'
      },

      flexRow: {
        display: 'flex'
      },

      input: {
        color: '#3e3f4b !important',
        background: "none",
        outline: 'none',
        width: '100%',
        margin: '5px 10px 5px 0',
        height: 50,
        fontSize: 12,
        borderRadius: 5,
        border: '1px solid #C5C5C9',
        padding: '0 4%',
        ':focus': {
          boxShadow: '0 1px 4px 0 rgba(61, 62, 75, 0.1) inset'
        }
      }
    },
    confirmationBoxes: {
      width: '45%',
      marginTop: 50,
      height: 200,

      box: {
        backgroundColor: '#E0E4EA',
        border: '1px inset rgba(62, 62, 75, 0.1)',
        borderRadius: 5,
        padding: 20
      },

      text: {
        fontSize: 13,
        paddingLeft: 10,
        paddingBottom: 12
      },

      link: {
        color: Colors.orange,
        fontWeight: 500
      }
    }
  }
}

let style = Styles()
let userDetails = style.userDetails
let confirmationBoxes = style.confirmationBoxes

let {
  toggleCheck,
  updateForm,
  updateDateOfBirth
} = Functions.LiveTrading.Accounts

let option = (...lists) => {
  return lists.map(list =>
    list.content.map((item, key) => {
      let { value, text } = list.selector(item)
      return <option key={ key } value={ value }>{ text }</option>
    }))
}

@Radium
class DateOfBirth extends Component {
  element = () => $(this.refs.date)

  componentDidMount () {
    this.element().dateDropdowns({
      defaultDate: this.props.date
    })

    setTimeout(() => {
        $(() => {
          let element = this.element()

          element
            .find('.year')
            .change(e => {
              this.props.changeBorder(e)
              return updateDateOfBirth({
                property: "year",
                value: e.target.value
              })
            })

          element
            .find('.month')
            .change(e => {
              this.props.changeBorder(e)
              updateDateOfBirth({
                property: "month",
                value: e.target.value
              })
            })

          element
            .find('.day')
            .change(e => {
              this.props.changeBorder(e)
              updateDateOfBirth({
                property: "day",
                value: e.target.value
              })
            })
        })
      }
      , 1)
  }

  render () {
    return <div
      ref="date"
      style={[userDetails.flexRow, { width: '60%' }]}/>
  }
}

@connect(state => state.livetrading.accounts.signup.form)
@Radium
class UserDetails extends Component {

  changeBorder (e) {
    if (['countryofbirth', 'countryofresidence'].indexOf( e.target.name ) !== -1) {
      $("select[name="+ e.target.name +"]").siblings().children().css('border-color', '#C5C5C9')
    } else {
      e.target.style.borderColor = e.target.value === '' ? '#D9534F' : '#C5C5C9'
    }
  }

  updateForm = (property) =>
    e => {
      this.changeBorder(e)
      return updateForm({
        property, value: e.target.value
      })
    }

  render () {
    let [ titles, countries] = option(
      {
        content: this.props.selects.titles,
        selector: item => ({ value: item.toLowerCase(), text: item })
      },
      {
        content: this.props.selects.countries,
        selector: item => ({ value: item.Code, text: item.Name })
      })

    // sortBy countries
    countries = _.sortBy(countries, c => c.props.children)

    let {
      title, firstName, lastName, countryOfBirth,
      dateOfBirth, phoneNumber, countryOfResidence,
      state, city, street, zipCode
    } = this.props
    
    if (this.props.selects.countries.length == 0 ) return (<div></div>)

    return (
      <div style={[userDetails]}>
        <div style={[userDetails.title]}>User Details</div>

        {/* title, firstName, lastName */}
        <div style={[userDetails.flexRow]}>
          <select
            onChange={ this.updateForm('title') }
            name="title"
            style={[userDetails.input, { width: '50%' }]}
            value={ title || "none" }
            key={1}
          >
            <option value="none" disabled>Title</option>
            {
              titles
            }
          </select>
          <input name="firstname"
                 style={[userDetails.input]}
                 type="text"
                 placeholder="First Name"
                 key={2}
                 defaultValue={ firstName }
                 onChange={ this.updateForm('firstName') }/>

          <input name="lastname"
                 style={[userDetails.input]}
                 type="text"
                 placeholder="Last Name"
                 key={3}
                 defaultValue={ lastName }
                 onChange={ this.updateForm('lastName') }/>
        </div>

        {/* countryOfBirth */}

        <div style={{ width: '60%' }}>
          <Chosen name="countryofbirth"
                  style={[userDetails.input]}
                  defaultValue={ countryOfBirth }
                  key={4}
                  onChange={ this.updateForm('countryOfBirth') }>
            <option value="" disabled>Country of birth</option>
            {
              countries
            }
          </Chosen>
        </div>
        <div style={{ fontSize: 12, margin: '1% 0' }}>Date of birth</div>

        <DateOfBirth date={ dateOfBirth.stamp } changeBorder={ this.changeBorder }/>

        {/* phone */}
        <div style={[userDetails.flexRow, { width: '60%', marginBottom: '2%' }]}>
          <input
            key={5}
            name="phonenumber"
            style={[userDetails.input]}
            placeholder="Phone number"
            defaultValue={ phoneNumber }
            onChange={ this.updateForm('phoneNumber') }/>
        </div>

        {/* countryOfResidence */}
        <div style={{ width: '59%' }}>
          <Chosen name="countryofresidence"
                  style={[userDetails.input]}
                  defaultValue={ countryOfResidence }
                  key={9}
                  onChange={ this.updateForm('countryOfResidence') }>
            <option value="" disabled>Country of residence</option>
            {
              countries
            }
          </Chosen>
        </div>

        {/* state */}
        <div style={[userDetails.flexRow, { width: '60%' }]}>
          <input name="state"
                 style={[userDetails.input]}
                 type="text"
                 placeholder="State/Region"
                 key={10}
                 defaultValue={ state }
                 onChange={ this.updateForm('state') }/>
        </div>

        {/* city */}
        <div style={[userDetails.flexRow, { width: '60%' }]}>
          <input name="city"
                 style={[userDetails.input]}
                 type="text"
                 placeholder="City"
                 key={11}
                 defaultValue={ city }
                 onChange={ this.updateForm('city') }/>
        </div>

        {/* street */}
        <div style={[userDetails.flexRow, { width: '60%' }]}>
          <input name="street"
                 style={[userDetails.input]}
                 type="text"
                 placeholder="Street, House, Apt"
                 key={12}
                 defaultValue={ street }
                 onChange={ this.updateForm('street') }/>
        </div>

        {/* zipcode */}
        <div style={[userDetails.flexRow, { width: '60%' }]}>
          <input name="zipcode"
                 style={[userDetails.input]}
                 placeholder="Zip code"
                 key={13}
                 defaultValue={ zipCode }
                 onChange={ this.updateForm('zipCode') }/>
        </div>
      </div> )
  }
}

@connect(state => state.livetrading.accounts.signup.agreements)
@Radium
class TradingExperience extends Component {
  toggleCheck = whichCheck =>
    () => toggleCheck({
      property: 'agreements', whichCheck
    })

  render () {
    let { Losses, Experience, Suitable } = this.props

    return (
      <div style={[confirmationBoxes.box]}>
        <div style={[userDetails.title]}>Trading Experience</div>
        <div style={{ display: "table" }}>
          <div style={{ display: 'table-row' }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              <input onChange={ this.toggleCheck('Experience') }
                     checked={ Experience }
                     id="toggle-experience"
                     className="cmn-toggle cmn-toggle-round"
                     type="checkbox"/>
              <label htmlFor="toggle-experience"></label>
            </div>
            <div style={[confirmationBoxes.text, { display: 'table-cell' }]}>I have experience trading FX.</div>
          </div>
          <div style={{ display: 'table-row' }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              <input onChange={ this.toggleCheck('Losses') }
                     checked={ Losses }
                     id="toggle-losses"
                     className="cmn-toggle cmn-toggle-round"
                     type="checkbox"/>
              <label htmlFor="toggle-losses"></label>
            </div>
            <div style={[confirmationBoxes.text, { display: 'table-cell' }]}>I understand trading can result in
              significant losses and that past results are no guarantee of future performance.
            </div>
          </div>
          <div style={{ display: 'table-row' }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              <input onChange={ this.toggleCheck('Suitable') }
                     checked={ Suitable }
                     id="toggle-suitable"
                     className="cmn-toggle cmn-toggle-round"
                     type="checkbox"/>
              <label htmlFor="toggle-suitable"></label>
            </div>
            <div style={[confirmationBoxes.text, { display: 'table-cell' }]}>Algorithmic trading is suitable as part of
              my investment objectives and risk appetite and therefore I am able to assess the risk involved in trading
              algorithmically.
            </div>
          </div>
        </div>
      </div> )
  }
}

@connect(state => ({
  agreements: state.livetrading.accounts.signup.agreements,
  subscription: state.livetrading.accounts.upgrade.subscription
}))
@Radium
class Confirmation extends Component {
  toggleCheck = whichCheck =>
    () => toggleCheck({
      property: 'agreements', whichCheck
    })

  render () {
    let { agreements } = this.props

    let showResponsibility = !_.reduce
    (_.omit(agreements, [ 'Agreements', 'Warning' ]),
      (result, value) => (!result ? result : value), true)

    return (
      <div style={[style.confirmationBoxes.box, { marginTop: '2%' }]}>
        <div style={[userDetails.title]}>Confirmation</div>
        <div style={{ display: "table" }}>
          <div style={{ display: 'table-row' }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              <input onChange={ this.toggleCheck('Agreements') }
                     checked={ agreements.Agreements }
                     id="toggle-agreements"
                     className="cmn-toggle cmn-toggle-round"
                     type="checkbox"/>
              <label htmlFor="toggle-agreements"></label>
            </div>
            <div style={[confirmationBoxes.text, { display: 'table-cell' }]}>
              I declare that I have carefully read and understand the entire text of the <a target="_blank"
                                                                                            href="/Files/Client Service Agreement.pdf"
                                                                                            style={[confirmationBoxes.link]}>Client
              Service Agreement</a> and <a target="_blank" href="/Files/Risk Disclosure Statement.pdf"
                                           style={[confirmationBoxes.link]}>Risk Disclosure Statement</a>, <a
              target="_blank" href="/Files/Privacy Policy.pdf" style={[confirmationBoxes.link]}>Privacy Policy</a>,
              which I fully understand, accept and agree with.
            </div>
          </div>
          <br />
          {
            showResponsibility &&
            <div style={{ display: 'table-row' }}>
              <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                <input onChange={ this.toggleCheck('Warning') }
                       checked={ agreements.Warning }
                       id="toggle-warning"
                       className="cmn-toggle cmn-toggle-round"
                       type="checkbox"/>
                <label htmlFor="toggle-warning"></label>
              </div>
              <div style={[confirmationBoxes.text, { display: 'table-cell', verticalAlign: 'middle' }]}>
                Quantler Trading ltd (the "Company") would like to warn you that on the basis of the information you
                provided us, you do not seem to possess the appropriate experience and knowledge for trading
                leveraged products and/or trading algorithmically. Nevertheless, should you wish to proceed you
                hereby acknowledge our advice and wish to proceed on sole responsibility.
              </div>

            </div>
          }
        </div>
        <div style={[{ marginTop: '5%', textAlign: 'center' }]}>
          <Proceed/>
        </div>
      </div> )
  }
}

@connect(state => state.livetrading.accounts.signup)
class Proceed extends Component {
  // validate that all form
  // inputs have a value
  reduceValidate = (formValues) => {
    // try-catch for performance
    // exiting the _.each loop
    try {
      return _.each(formValues, (value, key) => {
        let result = _.isPlainObject(value)
          ? this.reduceValidate(value)
          : !!value

        if (!result) throw { value, key }
      })
    }
    catch (e) {
      // Change border color and set focus to the first forgotten input field
      this.forgottenInput(e)
      return false
    }
  }

  omits = [
    'selects',
    'channelId',
    'chargifyId',
    'subscription',
    'agreements',
    'autoDiscoveryOn',
    'newsletterOn',
    'onBoarded',
    'userId'
  ]

  forgottenInput (e) {
    let key = e.key
    let type = $("input[name=" + key.toLowerCase() + "]")
    if (_.includes([ 'day', 'month', 'year'], key)) {
      type = $("select[name='date_[" + key.toLowerCase() + "]']")
    }
    if (['countryOfBirth', 'countryOfResidence'].indexOf(key) !== -1) {
      type = $("select[name=" + key.toLowerCase() + "]").siblings().children()
    }
    if (key === 'title') {
      type = $("select[name=" + key.toLowerCase() + "]")
    }
    type.css('border-color', '#D9534F').focus()
  }

  validate = ({ form }) => {
    return (
    this.reduceValidate(_.omit(form, this.omits))
    && this.validateAgreements(this.props))
  }

  validateAgreements = ({ agreements }) => {
    return agreements.Agreements && ((agreements.Losses && agreements.Experience && agreements.Suitable) || agreements.Warning)
  }

  proceedButton () {
    if (this.validate(this.props)) {
      Functions.LiveTrading.Accounts.Signup.proceed()
    }
  }

  render () {
    let { proceedLoading } = this.props

    return (
      <MainButton
        onClick={ () => this.proceedButton() }
        disabled={ proceedLoading || !this.validateAgreements(this.props) }
        value={ proceedLoading ? "LOADING..." : "PROCEED" }
        icon={Icons.arrowRight}
        type={"secondary"}/>
    )
  }
}

@connect(state => state.livetrading.accounts.signup)
@Radium
export class SignUp extends Component {
  componentWillMount () {
    Functions.LiveTrading.Accounts.signupLoad()
  }

  render () {
    return (
      <div style={ style.container }>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center' }}>

          <UserDetails/>

          {/* CONFIRMATION BOXES */}
          <div style={[confirmationBoxes]}>

            <TradingExperience/>

            <Confirmation/>

          </div>
        </div>
      </div>
    )
  }
}
