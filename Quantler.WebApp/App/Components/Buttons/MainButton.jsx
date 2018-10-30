import React from 'react'
import Radium from 'radium'
import {Fonts, Colors} from '../Utils/GlobalStyles.jsx'

let Styles = (iconSize) => {
  return {
    button: (disabled) => ({
      fontFamily: Fonts.openSans,
      fontSize: 12,
      fontWeight: 600,
      color: Colors.white,
      lineHeight: iconSize.toString().concat('px'),

      height: 50,
      borderRadius: 3,
      boxShadow: '0 1px 1px 0 rgba(255,255,255, 0.3) inset',
      padding: '0 25px',

      outline: 'none',

      ':active': {
        boxShadow: '0 1px 10px 0 rgba(0,0,0, 0.3) inset'
      }

    }),
    icon: {
      verticalAlign: (iconSize > 14) && 'middle',
      fontSize: iconSize,
      paddingLeft: 17
    },
    iconLeft: {
      verticalAlign: 'middle',
      fontSize: 18,
      paddingRight: 5
    }
  }
}

let mainButtonTypes = {
  primary: {
    backgroundColor: Colors.primaryLight,
    border: '1px solid ' + Colors.primary,
    ':hover': {
      backgroundColor: Colors.primary
    }
  },
  secondary: {
    backgroundColor: Colors.secondary,
    border: '1px solid ' + Colors.secondaryDarker,
    ':hover': {
      backgroundColor: Colors.secondaryDark
    }
  }
}

export let MainButton = Radium(({ value, disabled, icon, type, onClick, css, iconSize, iconLeft }) => {
  /* IconSize: default: 14 */
  let _iconSize = iconSize || 14
  let style = Styles(_iconSize)
  let _type = mainButtonTypes[type || 'secondary']

  /* Show only if an icon was set */
  let _icon = (icon === undefined) || <i className={icon} style={style.icon}/>
  let _iconleft = iconLeft && <i className={iconLeft} style={style.iconLeft}/>

  let disabledStyle = !disabled ? {} : {
    opacity: 0.4,
    border: 'none'
  }

  return (
    <button style={[style.button(disabled), _type, disabledStyle, css]} onClick={onClick} disabled={disabled}>
            {_iconleft}
              <span style={{ fontSize: 'inherit' }}>{value}</span>
            {_icon}
    </button>
  )
})
