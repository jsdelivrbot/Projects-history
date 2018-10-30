import React from 'react'
import Radium, {Style} from 'radium'
import Modal from 'react-modal'
import Tooltip from 'rc-tooltip'
import {MainButton} from '../../../Buttons/MainButton.jsx'
import {Icons, Fonts, Colors} from '../../../Utils/GlobalStyles.jsx'

let modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(62, 62, 75, 0.8)',
    zIndex: 99
  },
  content: {
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    backgroundColor: 'transparent'
  }
}

let Styles = () => {

  return {
    container: {
      fontFamily: Fonts.openSans,
      cursor: 'default',
      display: 'flex',
      justifyContent: 'center'
    },
    box: {
      width: '280',
      margin: '0 10px',

      title: {
        height: 115,
        background: 'radial-gradient(ellipse farthest-corner at 50% -50%, #5B5C66, #31323e 85%)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        fontSize: 25,
        fontWeight: 300,
        color: Colors.white,
        textAlign: 'center',
        paddingTop: 45
      },
      price: {
        height: 50,
        paddingTop: 8,
        background: 'linear-gradient(#EE4515, #F8792E)',
        fontSize: 18,
        fontWeight: 600,
        color: Colors.white,
        textAlign: 'center',

        decimal: {
          position: 'relative',
          fontSize: 12,
          top: -4
        },
        month: {
          position: 'relative',
          color: Colors.primary,
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: 0.3,
          top: -4,
          left: 10
        }
      },
      line: {
        paddingLeft: 12,
        fontSize: 14,
        letterSpacing: 0.4,
        lineHeight: '39px'

      },
      icon: {
        float: 'right',
        lineHeight: '32px',
        color: Colors.orange,
        paddingRight: 8

      },

      contentBottom: {
        backgroundColor: Colors.white,
        height: 20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
      }
    },
    label: {
      title: {
        color: Colors.white,
        fontWeight: 600,
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 50,
        margin: '135px 0 7px 0',

        borderLeft: '3px solid '.concat(Colors.orange)
      },
      line: {
        backgroundColor: Colors.primaryLightGrey,
        width: 250,
        height: 2,
        marginBottom: 35

      }
    }

  }
}

/* Information about plans
 Ex: [ topic, info, tooltipText ] */
let premiumLines = [
  ['Strategy', 'Hosting', 'Dedicated hosting included'],
  ['Paper', 'trading', 'Demo accounts allowed'],
  ['Real-money', 'trading', 'Real accounts allowed'],
  ['Concurrent', 'Trading Agents', 'Unlimited agents'],
  ['2 Active Accounts', 'demo or real', 'Contact us for more accounts'],
  ['24 hours', 'backtesting time', 'Per month, contact us for more'],
  ['100 Discoveries', 'per week', 'Contact us for more discoveries'],
  ['Worldwide', 'coverage', 'No restrictions'],
  ['Any', 'MT broker', 'Over 250 compatible brokers']
]

let sponsoredLines = [
  ['Strategy', 'Hosting', 'Dedicated hosting included'],
  ['Paper', 'trading', 'Demo accounts allowed'],
  ['Real-money', 'trading', 'Real accounts allowed'],
  ['Concurrent', 'Trading Agents', 'Unlimited agents'],
  ['2 Active Accounts', 'demo or real', 'Contact us for more accounts'],
  ['24 hours', 'backtesting time', 'Per month, contact us for more'],
  ['100 Discoveries', 'per week', 'Contact us for more discoveries'],
  ['non-US', 'clients only', 'Restricted to non-US clients'],
  ['Partnered', 'MT broker', 'Partnered brokers only']
]

@Radium
export class InfoModal extends React.Component {

  state = {
    modalIsOpen: false
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render () {

    let style = Styles()

    return (
      <div style={{ display: 'inline' }}>
        <Tooltip placement="bottom" mouseEnterDelay={0.2} overlay={<span>Click for more details</span>}>
          <i className={Icons.info} onClick={this.openModal} style={[this.props.css]}/>
        </Tooltip>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={modalStyle}>
          <div style={[style.container]}>
            <div style={[style.label]}>
              <div style={[style.label.title]}>PLANS & PRICING</div>
              <div style={[style.label.line]}></div>
              <MainButton onClick={this.closeModal} value={'I UNDERSTAND'} icon={ Icons.check } type={'secondary'}
                          iconSize={20}/>
            </div>
            <Box title={'SPONSORED'} price={0} arrContent={sponsoredLines}/>
            <Box title={'PREMIUM'} price={25.00} arrContent={premiumLines}/>
          </div>
        </Modal>
      </div>
    )
  }
}

let Box = Radium(({ title, price, arrContent }) => {

  /* Styles */
  let style = Styles()
  let box = style.box

  /* PRICE */
  let value = price.toString().split('.')
  let integer = value[0]
  let decimal = value[1]

  let _price = price > 0
    ? <div style={[box.price]}>€<span style={{ fontSize: 18 }}>{integer}</span><span style={ box.price.decimal }>,<span
    style={{ borderBottom: '1px solid white' }}>{!decimal ? '00' : decimal}</span></span><span style={ box.price.month }>/month</span>
  </div>
    : <div style={[box.price]}>FREE</div>

  /* CONTENT */
  let Lines = arrContent.map((line, index) => {
    let bgColor = (index % 2 == 0) ? Colors.white : Colors.grey
    return (
      <div key={index} style={[box.line, { backgroundColor: bgColor }]}>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{line[0]}</span> <span>{line[1]}</span><TooltipIcon
        text={line[2]}/>
      </div>)
  })

  return (
    <div style={[box]}>

      <Style rules={{
        span: {
          fontSize: 'inherit'
        }
      }}/>

      <div style={[box.title]}>{title}</div>
      <div style={[box.price]}>{_price}</div>
      <div>
        {Lines.map((line) => line)}
        <div style={[box.contentBottom]}></div>
      </div>
    </div>
  )
})

// - Tooltip Icon   #

let iconStyle = {
  float: 'right',
  lineHeight: '32px',
  color: Colors.orange,
  paddingRight: 8
}

let TooltipIcon = Radium(({ text }) => {
  return (
    <Tooltip key={0} placement="left" mouseEnterDelay={0.1} overlay={
      <div>{text}</div>
    }>
      <i style={ iconStyle } className={Icons.info}/>
    </Tooltip>)
})
