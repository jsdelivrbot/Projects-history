import React from 'react'
import Radium from 'radium'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import {Icons, Fonts, Colors} from '../../Utils/GlobalStyles.jsx'
import Utils from '../../../Functions/Utils/Utils.jsx'
import {Routes} from "../../../Routes";

let Styles = () => {
  return {
    main: {
      fontFamily: Fonts.openSans,
      backgroundColor: Colors.grey,
      paddingBottom: 2,
      borderBottom: '1px solid rgba(0,0,0, 0.05)',
    },
    header: {
      padding: '0px 10px 0 10px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',

      item: {
        float: 'left',
        marginRight: '20px',

        ':lastChild': {
          marginRight: 0
        },

        link: {
          color: Colors.secondary,
          fontWeight: 400,
          letterSpacing: 0.3,
        },
        inputs: {
          color: Colors.primaryLightGrey,
          letterSpacing: 0.3,
        },
        icon: {
          fontSize: 21,
          textDecoration: 'none',
          color: Colors.secondary,
          position: 'relative',
          top: '-8px'
        }

      },

    },
    content: {
      display: 'flex',
      flexWrap: 'wrap',

      frame: {
        height: 21,
        padding: '0 10px',
        margin: '0 5px 5px 0',
        borderRadius: 5,
        lineHeight: '21px',
        textAlign: 'center',
        color: Colors.white,
        fontSize: 12,
        fontWeight: 700,
      }
    }
  }
}

let style = Styles()

let frameTypes = {
  'Entry': {
    backgroundColor: Colors.yellow
  },
  'Exit': {
    backgroundColor: Colors.blue
  },
  'Risk Management': {
    backgroundColor: Colors.guava
  },
  'Money Management': {
    backgroundColor: Colors.green
  }
}

let toolTipMessage = 'FastEMA: 5 / SlowEMA: 20'

/* Frames: [ type ] */
export let Algorithms = Radium(({ algorithm, order }) => {
  let { Samples, Settings, TemplateItems, SharpeRatio, ID } = algorithm

  /* Styles */
  let item = style.header.item
  let frame = style.content.frame

  return (
    <div style={[style.main]}>
      <div className="row" style={{ padding: '8px 0' }}>
        <div className="col-md-1">
          <div style={[item, { fontWeight: 600 }]}>
               { order }
          </div>
        </div>

        <div className="col-md-10">
          <div className="row" style={{ marginBottom: 5 }}>
            <div style={[item]}>
              Sample &nbsp;
              <a href={ '#' + Routes.SampleDetails + Samples[0].ID }
                 style={ item.link }
              >
                 { Samples[0].Name }
              </a>
            </div>
            <div style={[item]}>
              Timeframe &nbsp;
                <span style={ item.inputs }>
                  { Utils.secondsToTimestamp(Settings.DefaultTimeframe) }
                </span>
            </div>
            <div style={[item]}>
              Sharpe Ratio &nbsp;
                  <span style={ item.inputs }>
                    { SharpeRatio }
                  </span>
            </div>
          </div>

          <div className="row">
            <div style={[style.content]}>
                 { TemplateItems }
            </div>
          </div>
        </div>

        <div className="col-md-1">
          <a href={ '#' + Routes.Backtester + ID  }
             style={[item.icon]}
          >
            <i className={Icons.squareRight}/>
          </a>
        </div>
      </div>
    </div>
  )
})
