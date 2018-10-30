import React from 'react'
import Radium from 'radium'
import {Fonts, Colors} from '../Utils/GlobalStyles.jsx'

let Styles = (percent) => {
  return {
    base: {
      display: 'flex',
      alignItems: 'center',
      height: 59,
      backgroundColor: '#fff',
    },
    content: {
      fontFamily: Fonts.openSans,
      padding: '3px 10px',
      width: '100%',
      title: {
        color: Colors.primary,
        paddingBottom: 2,
        fontSize: 11
      },
      description: {
        color: Colors.primaryLightGrey,
        letterSpacing: 0.3,
        fontSize: 11
      }
    },
    bar: {
      backgroundColor: Colors.grey,
      height: 4.5,
      borderRadius: 4,
    },
    progress: {
      backgroundColor: Colors.barColor,
      borderRadius: 4,
      width: percent.toString().concat('%'),
      height: 4.5,
    }
  }
}

let fontSizefix = {
  fontSize: 'inherit'
}

/* type: minutes, MB, etc*/
export let AmountBar = Radium(({ title, limit, amount, type, css }) => {

  let percent = amount <= limit ? (amount / limit) * 100 : 100

  let style = Styles(percent)

  return (
    <div style={[style.base, css]}>

      <div style={[style.content]}>

        <div style={[style.content.title]}>
             {title}
        </div>

        <div style={ style.content.description }>
          <span style={fontSizefix}>{amount}</span>
          <span style={fontSizefix}> / </span>
          <span style={fontSizefix}>{limit}</span>&nbsp;
          <span style={fontSizefix}>{type}</span>
        </div>

        <div style={[style.bar]}>
          <div style={[style.progress]}></div>
        </div>
      </div>
    </div>
  )
})
