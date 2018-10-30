import {Image, Component} from 'react'
import Radium from 'radium'
import {Header} from './Header.jsx'
import {MainButton} from '../../../Buttons/MainButton.jsx'
import {Icons, Fonts, Colors} from '../../../Utils/GlobalStyles.jsx'
import {connect} from '../../../../State.jsx'
import Functions from '../../../../Functions/Functions.jsx'

let Styles = () => {
  return {
    container: {
      fontFamily: Fonts.openSans,
      color: Colors.primary,
      fontWeight: 300
    },
    box: {
      marginTop: '10%',
      backgroundColor: Colors.white,
      padding: 20,
      borderRadius: 5,
      boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
      minWidth: 260,

      title: {
        fontSize: 16
      },
      content: {
        marginTop: '10%',
        textAlign: 'center',

        text: {
          textAlign: 'justify',
          fontSize: 12
        },
        price: {
          marginTop: '10%',
          color: Colors.primaryLight,

          marginBottom: -20,
          value: {
            fontSize: 36,
            fontWeight: 700,

            sup: {
              position: 'relative',
              fontSize: 24,
              top: -10

            }
          },
          oldValue: {
            position: 'relative',
            fontSize: 18,
            fontWeight: 700,
            textDecoration: 'line-through',
            color: 'rgba(62, 63, 75, 0.3)',
            left: 85,
            top: -40,

            sup: {
              position: 'relative',
              fontSize: 12,
              fontWeight: 700,
              textDecoration: 'line-through',
              top: -44,
              left: 85,
              color: 'rgba(62, 63, 75, 0.3)'
            }
          },
          text: {
            position: 'relative',
            top: -30,
            color: Colors.primaryLight,
            fontWeight: 300,
            fontSize: 12
          }

        },
        info: {
          margin: 'auto',
          fontSize: 12,
          color: Colors.primaryLightGrey,
          padding: '2% 15% 0 15%'
        }
      }
    }
  }
}

let splitPrice = (price = '00.00') => {
  if (!price.toString().includes('.')) price += '.00'

  return price.split('.')
}

let props = {
  price: 24.95,
  oldPrice: 49.95
}
let style = Styles()
let box = style.box

@connect(state => state.livetrading.accounts.upgrade.subscription)
@Radium
export class NewAccountPremium extends Component {
  componentWillMount () {
    Functions.LiveTrading.Accounts.NewAccountPremium.load()
  }

  render () {
    let { Premium } = this.props

    if (!Premium) return null

    let _price = splitPrice(Premium.PriceEUR * Premium.DiscountPercentage)
    let _oldPrice = splitPrice(Premium.PriceEUR)

    return (
      <div style={ style.container }>
        <Header />
        <div className="row">
          <div style={[box]} className="col-md-3 col-md-offset-4">
            <div style={[box.title]}>
              Premium Account: Trade any broker
            </div>
            <div style={[box.content]}>
              <div style={[box.content.text]}>
                Using a premium account you can trade with any MT4 brokers in the world. You will have access to low
                latency hosting for faster execution and lower trading costs. Subscriptions are monthly based and prices
                shown includes EU VAT/taxes. Subscriptions can be cancelled anytime by the user.
              </div>
              <div style={[box.content.price]}>
                <div>
                  <span style={[box.content.price.value]}>
                      { '€ ' + _price[0] }
                  </span>
                  <span style={[box.content.price.value.sup]}>
                      { ',' + _price[1] }
                  </span>
                </div>
                <div style={[box.content.price.line]}></div>
                <div>
                  <span style={[box.content.price.oldValue]}>
                      { '€ ' + _oldPrice[0] }
                  </span>
                  <span style={[box.content.price.oldValue.sup]}>
                      { ',' + _oldPrice[1] }
                  </span>
                </div>
                <div style={[box.content.price.text]}>
                  per month (Incl. EU VAT/taxes)
                </div>
              </div>
              <a href={ Premium.ChargifyURL }>
                <MainButton
                  value="PROCEED"
                  type="secondary"
                  icon={Icons.arrowRight}
                  css={{ marginTop: '5%' }}/>
              </a>
              <div style={[box.content.info]}>
                Clicking the button above will open a seperate window for payment details
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
