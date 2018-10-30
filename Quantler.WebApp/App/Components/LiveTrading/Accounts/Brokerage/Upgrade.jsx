import {Component} from 'react'
import Radium from 'radium'
import {Header} from './Header.jsx'
import {InfoModal} from './InfoModal.jsx'
import {MainButton} from '../../../Buttons/MainButton.jsx'
import {Icons, Fonts, Colors} from '../../../Utils/GlobalStyles.jsx'
import Functions from '../../../../Functions/Functions.jsx'
import {connect} from '../../../../State.jsx'
import Modal from '../../../Modal/Modal.jsx'
import LatencyInfoModal from './LatencyInfoModal.jsx'

let Styles = (placesLeftPercent) => {
  return {
    common: {
      fontFamily: Fonts.openSans,
      color: Colors.primaryLight
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      padding: 20
    },
    box: {
      borderRadius: 5,
      border: '1px solid ' + Colors.blueLight,
      padding: 20,
      textAlign: 'center',

      title: {
        fontSize: 20,
        fontWeight: 300
      },
      content: {
        paddingTop: '5%',
        fontSize: 12,
        letterSpacing: 0.3
      },
      icon: {
        fontSize: 76,
        textShadow: '0 1px 0 #FFF'
      },
      textIcon: {
        fontSize: 43,
        fontWeight: 800,
        textShadow: '0 1px 0 #FFF',

        userSelect: 'none',
        cursor: 'default'
      }
    }
  }
}

let sponsorBoxStyle = placesLeftPercent => ({
  padding: 20,
  textAlign: 'center',
  backgroundColor: Colors.white,
  borderRadius: 5,
  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.15)',

  title: {
    fontSize: 16,
    fontWeight: 300,
    color: Colors.primary
  },
  content: {
    paddingTop: '2%',
    fontSize: 12,
    letterSpacing: 0.3,

    icon: {
      fontSize: 18,
      color: Colors.orange,
      cursor: 'pointer'
    }
  },
  icon: {
    fontSize: 50
  },
  price: {
    marginBottom: -20,
    value: {
      fontSize: 29,
      fontWeight: 700,

      sup: {
        position: 'relative',
        fontSize: 19,
        top: -5
      }
    },
    free: {
      paddingTop: 5,
      marginBottom: '10%'
    },
    oldValue: {
      position: 'relative',
      fontSize: 18,
      fontWeight: 700,
      textDecoration: 'line-through',
      color: 'rgba(62, 63, 75, 0.3)',
      left: 80,
      top: -32,
      sup: {
        position: 'relative',
        fontSize: 12,
        top: -4
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
  places: {
    fontSize: 16,
    fontWeight: 300,
    paddingBottom: 5,
    bar: {
      margin: '0 auto',
      height: 7,
      borderRadius: 9,
      width: 200,
      backgroundColor: Colors.grey,
      progress: {
        height: 7,
        borderRadius: 9,
        width: placesLeftPercent + '%',
        backgroundColor: Colors.orange
      }
    }
  },
  buttons: {
    marginTop: 10,
    padding: '0 40px',
    borderRadius: 100
  }
})
let style = Styles()
let box = style.box

// Split the prices
let formatPrice = (_price = '00.00') => {
  let price = _price.toString()

  if (price.length < 4) price += '.00'

  return price
}

@connect(state => ({
  upgrade: state.livetrading.accounts.upgrade,
  Subscription: state.User.details.Subscription
}))
@Radium
export class Upgrade extends Component {
  closeModal = () => {
    Functions.LiveTrading.Accounts.Upgrade.seenDiscountPopup()
  }

  componentWillMount () {
    Functions.LiveTrading.Accounts.Upgrade.load()
  }

  render () {
    let { Subscription, upgrade } = this.props
    let { subscription, seenDiscountPopup } = upgrade
    let { Premium, Sponsored } = subscription

    // to show "Link Account" button
    let isSponsored =
      (Subscription.Order == _.get(upgrade, 'subscription.Sponsored.Order', -1))

    // to show "Add account" instead "Upgrade now"
    let isPremium = (Subscription.Order === _.get(upgrade, 'subscription.Premium.Order', -1))

    let _placesLeft = _.get(Premium, 'DiscountSpotsLeft', 0)
    let _totalPlaces = _.get(Premium, 'TotalDiscountSpots', 0)

    let sponsorBox = sponsorBoxStyle
    (((_placesLeft * 100) / _totalPlaces) || 0)

    let Content = () =>
      <div style={{ textAlign: 'center', padding: 20 }}>
        <h4>Loading...</h4>
      </div>

    let PremiumContent = Content
    let SponsoredContent = Content

    if (!!Premium && !!Sponsored) {
      let _price = formatPrice
      (Premium.PriceEUR * Premium.DiscountPercentage).split('.')

      let _oldPrice = formatPrice(Premium.PriceEUR).split('.')

      PremiumContent = Radium(() =>
        <div>
          <div style={[sponsorBox.price]}>
            <div>
              <span style={[sponsorBox.price.value]}>{ '€ ' + _price[0] }</span>
              <span style={[sponsorBox.price.value.sup]}>{ ',' + _price[1] }</span>
            </div>
            <div style={[sponsorBox.price.line]}></div>
            <div style={[sponsorBox.price.oldValue]}>
              <span style={{ fontSize: 'inherit' }}>€</span>
              <span style={{ fontSize: 'inherit' }}>{_oldPrice[0]}</span>
              <span style={[sponsorBox.price.oldValue.sup]}>,{_oldPrice[1]}</span>
            </div>
            <div style={[sponsorBox.price.text]}>per month</div>
          </div>
          <div style={[sponsorBox.places]}>
               {_placesLeft} places left for the discount
          </div>
          <div style={[sponsorBox.places.bar]}>
            <div style={[sponsorBox.places.bar.progress]}></div>
          </div>
          <MainButton
            onClick={ _=> 
              {
                Functions.Shell.hitFeature('Upgrade Account')
                Functions.LiveTrading.Accounts.Upgrade.signup(Premium.Order) 
              }
            }
            value={'Upgrade now'}
            type={'primary'}
            css={[sponsorBox.buttons, { marginTop: 20 }]}/>
        </div>)

      SponsoredContent = Radium(() =>
        <div style={{ position: 'relative' }}>
          <div style={[sponsorBox.price.free]}>
            <div style={[sponsorBox.price.value]}>FREE</div>
          </div>
             { isSponsored &&
             <MainButton
               onClick={ _=> 
                 {
                  Functions.Shell.hitFeature('Link Account')
                  Functions.LiveTrading.Accounts.Upgrade.link()
                 }
                }
               value={'Link Account'}
               iconLeft={Icons.link}
               type={'primary'}
               css={[sponsorBox.buttons]}/>
             }
          <MainButton
            onClick={ _=> 
              {
                Functions.Shell.hitFeature('Sponsored SignUp') 
                Functions.LiveTrading.Accounts.Upgrade.signup(Sponsored.Order)
              } 
            }
            value={'Sponsored Brokers'}
            type={'secondary'}
            css={[sponsorBox.buttons, { marginLeft: 10 }]}/>
        </div>)
    }

    return (
      <div style={ style.common }>

        <Modal isOpen={ (!seenDiscountPopup) && (!!_placesLeft) && (!isPremium) }
               style={{ content: { width: 562, height: 408, overflow: 'hidden' } }}
               onCloseRequest={ this.closeModal }
        >
          <div className="QModal">
            <div style={{ height: 344, padding: '40px 50px' }}>
              <center>
                <img src={ "Art/" + 'Images/discount.png' }/>
                <h3 style={{ fontSize: '20px', fontWeight: 'lighter', marginBottom: 15 }}>
                  Celebrate with us, and get a
									<span style={{ color: '#ee4415' }}>
										&nbsp; 50% &nbsp;
									</span>
                  discount
                </h3>
								<span style={{ lineHeight: '23px' }}>
									We are very proud to announce our beta release for live trading. Connected to over 250 compatible brokers worldwide and determined to add more as we go, we give our users the freedom of choice. Join now and get a 50% <b>LIFETIME</b> discount on your premium account. This discount is limited to our 100 initial users. Claim your slot by upgrading today!
								</span>
              </center>
            </div>
            <div className="modal-footer">
              <button
                onClick={ this.closeModal }
                className="btn btn-primary pull-right">Okay
              </button>
            </div>
          </div>
        </Modal>

        <Header />

        <div className="row">
             {/* BOXES */}
               <div style={[style.container, { margin: '5% 5% 0 5%' }]}>
                 <div style={[box]} className="col-md-3">
                   <i style={[box.icon]} className={ Icons.storage }/>
                   <div style={[box.title]}>Hosted Trading Evironment</div>
                   <div style={[box.content]}>Dedicated hosting for all your trading strategies is always included.
                   </div>
                 </div>
                 <div style={[box, { margin: '0 1% 0 1%' }]} className="col-md-3">
                   <i style={[box.icon]} className={ Icons.flash }/>
                   <div style={[box.title]}>Low Latency</div>
                   <div style={[box.content]}>
                     <span style={{ fontSize: 12 }}>Host your trading strategies in the same datacenter as your broker.</span>
                     &nbsp;<LatencyInfoModal />
                   </div>
                 </div>
                 <div style={[box, { margin: '0 1% 0 0' }]} className="col-md-3">
                   <div style={[box.textIcon]}>MT4</div>
                   <div style={[box.title]}>Multi Broker Compatible</div>
                   <div style={[box.content]}>Compatible with over 250 brokers worldwide.
                   </div>
                 </div>
                 <div style={[box]} className="col-md-3">
                   <i style={[box.icon]} className={ Icons.lock }/>
                   <div style={[box.title]}>Secure</div>
                   <div style={[box.content]}>All data is send, processed and stored using ultra high encryption
                     methods.
                   </div>
                 </div>
               </div>
        </div>

           {/* SPONSORED BOXES */}
        <div className="row" style={{ marginTop: '-1.5%' }}>
          <div style={[style.container, { margin: '0 5%' }]}>

            <div style={[sponsorBox, { marginRight: '0.5%' }]} className="col-md-6">

              <i style={[sponsorBox.icon]} className={ Icons.cashOff }/>

              <div style={[sponsorBox.title]}>Sponsored account</div>

              <div style={[sponsorBox.content]}>

                <span style={{ fontSize: 'inherit' }}>
                Let one of our connected brokers pay for your account.
                </span>
                &nbsp;
                <InfoModal css={ sponsorBox.content.icon }/>

              </div>

              <SponsoredContent/>

            </div>

               { isPremium && isPremium
                 ? (
                 <div style={[sponsorBox, { position: 'relative', marginLeft: '0.5%' }]} className="col-md-6">

                   <i style={[sponsorBox.icon]} className={ Icons.plusCircle}/>

                   <div style={[sponsorBox.title]}>Additional account</div>

                   <div style={[sponsorBox.content]}>

                  <span style={{ fontSize: 'inherit' }}>
                    Add an additional account for other trading agents.
                  </span>
                     &nbsp;
                     <InfoModal css={ sponsorBox.content.icon }/>

                   </div>

                   <div style={{ marginBottom: '15%' }}></div>

                   <div style={{ position: 'absolute', left: 0, right: 0, bottom: 20, margin: '0 auto' }}>
                     <MainButton
                       onClick={ _=> 
                         {
                           Functions.Shell.hitFeature('Add Account')
                           Functions.LiveTrading.Accounts.Upgrade.link() 
                         }
                       }
                       value={'Add account'}
                       type={'primary'}
                       css={ sponsorBox.buttons }/>
                   </div>

                 </div>)

                 : (

                 <div style={[sponsorBox, { position: 'relative', marginRight: '0.5%' }]} className="col-md-6">

                   <i style={[sponsorBox.icon]} className={ Icons.cash }/>

                   <div style={[sponsorBox.title]}>Premium account</div>

                   <div style={[sponsorBox.content]}>

                <span style={{ fontSize: 'inherit' }}>
                  Make use of any broker that we are compatible with.
                </span>
                     &nbsp;
                     <InfoModal css={ sponsorBox.content.icon }/>

                   </div>

                   <PremiumContent/>

                 </div>)
               }
          </div>
        </div>
      </div>
    )
  }
}
