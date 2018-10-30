import {Component} from 'react'
import Modal         from 'react-modal'
import Radium, {Style} from 'radium'
import {
  Title,
  Navigation,
  Content
}  from './Components/Components.jsx'

let modalStyle = {
  overlay: {
    zIndex: 998,
    backgroundColor: 'rgba(0, 0, 0, 0.51)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    overflow: 'hidden',
    background: 'radial-gradient(#53556c, #31323e)',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    width: 1085,
    height: 750,
    padding: 0,
    zIndex: 999
  }
}

function Slide ({ closeFunc, setFunc, slides, slide }) {
  return (
    <div>

      <Title step={ slides[slide].id }
             title={ slides[slide].title }/>

      <Navigation position={ slides[slide].id }
                  positions={ slides.length }
                  setFunc={ setFunc }
                  closeFunc={ closeFunc }/>

      <Content leftNote={ slides[slide].leftNote }
               rightNote={ slides[slide].rightNote }
               image={ slides[slide].image }/>
    </div>
  )
}

let slides = [
  {
    id: 0,
    title: 'Welcome to Quantler, the platform with a modulair approach for developing trading algorithms in the cloud. Check our introduction video below to get an overview on our interface and general functionalities.',
    leftNote: {
      text: '',
      height: 0,
      padding: 0
    },
    rightNote: {
      text: '',
      height: 0, // The height of the message
      padding: 0 // and distance from the edge
    },
    /* Change the video source below */
    image: 'ZfAnJkR7DZg'
  },
  {
    id: 1,
    title: "The first step is to design your strategy. Use the strategy designer to choose your templates with which you want build your trading algorithm. Check the notebooks for more template information. Edit global settings to define on which symbol, sample and default timeframe this strategy should be backtested on.",
    leftNote: {
      text: "Choose your templates",
      height: 210,
      padding: 191
    },
    rightNote: {
      text: "Edit initial settings, set your timeframe",
      height: 112,
      padding: 30
    },
    image: "Art/Images/onboarding/2.png"
  },
  {
    id: 2,
    title: "Out of ideas for new trading algorithms, or just looking for that one entry setup? Head out to the marketplace and check out all available templates created and shared by other users."
    ,
    leftNote: {
      text: "Filter by template type",
      height: 380,
      padding: 120
    },
    rightNote: {
      text: "Check any details before importing",
      height: 180,
      padding: 30
    },
    image: "Art/Images/onboarding/3.png"
  },
  {
    id: 3,
    title: "Press the run backtest button and let the cloud backtest your strategy. Analyze the results and compare your current results with any previous tests performed. Use this to see how stable your strategy is between samples.",

    leftNote: {
      text: "Analyze results such as equity and drawdown",
      height: 180,
      padding: 30
    },
    rightNote: {
      text: "Compare results between samples",
      height: 180,
      padding: 30
    },
    image: "Art/Images/onboarding/4.png"
  },
  {
    id: 4,
    title: "Create whole new templates or edit your templates in the online template editor, compile and check for errors.",
    leftNote: {
      text: "Change existing templates or create new ones",
      height: 180,
      padding: 30
    },
    rightNote: {
      text: "Check for any compilation errors",
      height: 180,
      padding: 30
    },
    image: "Art/Images/onboarding/5.png"
  },
  {
    id: 5,
    title: "Define samples on which you want to test your trading ideas. Create IN and OUT samples, where IN samples are used by Quantler’s auto discovery service to find new algorithms for you.",
    leftNote: {
      text: "Setup your new sample",
      height: 340,
      padding: 140
    },
    rightNote: {
      text: "Select your timeperiod",
      height: 180,
      padding: 30
    },
    image: "Art/Images/onboarding/6.png"
  },
  {
    id: 6,
    title: "Ready to start trading? Connect to 250+ brokers worldwide. Use Quantler to run your trading algorithms in the cloud, you are up and running in minutes. Host your strategies near your broker, for lower latency. Dynamically add and remove strategies when needed.",
    leftNote: {
      text: "Dynamically set dashboard charts",
      height: 380,
      padding: 80
    },
    rightNote: {
      text: "Manage your trading online",
      height: 180,
      padding: 70
    },
    image: "Art/Images/onboarding/7.png"
  }
]

@Radium
export class OnboardingModal extends Component {
  state = {
    open: true,
    slide: 0
  }

  setSlide = (slideNumber) => {
    if (slideNumber >= 0 && slideNumber < slides.length) {
      this.setState({
        slide: slideNumber
      })
    }
  }

  handleToggleModal = () => {
    this.setState({
      open: false
    })

    this.props.onClose()
    window.location.replace('#/backtester/')
  }

  render () {
    let open = this.state.open

    return (
      <div>
        <Style scopeSelector=".quantler-onboarding"
               rules={{
                 mediaQueries: {
                   '(max-width: 1085px)': {
                     '.ReactModal__Content': {
                       transform: 'translate(-50%, -50%) scale(0.75) !important',
                       transition: 'transform 0.3s ease-in-out'
                     }
                   }
                 }
               }}/>
        <Modal isOpen={ open }
               style={ modalStyle }
               overlayClassName="quantler-onboarding">
          <Slide closeFunc={ this.handleToggleModal }
                 slide={ this.state.slide }
                 slides={ slides }
                 setFunc={ this.setSlide }/>
        </Modal>

      </div>
    )
  }
}
