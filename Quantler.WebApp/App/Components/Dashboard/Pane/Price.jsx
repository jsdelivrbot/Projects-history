import React      from 'react'
import {Colors} from '../../Utils/GlobalStyles.jsx'

let Styles = () => {
  return {
    free: {
      height: 24,
      display: 'flex',
      alignItems: 'center',

      borderRadius: 4,
      backgroundColor: Colors.primaryLight,
      padding: '3px 13px',

      color: '#eee',
      fontWeight: '600',
      fontSize: 14,

      userSelect: 'none',
      cursor: 'default'

    },
    numbers: {
      color: Colors.primary,
      fontWeight: '600',
      lineHeight: '43px',
      letterSpacing: -1,

      userSelect: 'none',
      cursor: 'default'
    }
  }
}

let Free = ({ style }) => {
  return (
    <div style={style}>
      Free
    </div>
  )
}

let Numbers = ({ style, value }) => {
  let price = value.toString().split('.')
  let integer = price[ 0 ]
  let decimal = (price[ 1 ] && ('.' + price[ 1 ])) || '.00'

  return (
    <div style={style}>
      <span style={{fontSize: 18}}>{'$ ' + integer}</span>
      <sup style={{fontSize: 12}}>{decimal}</sup>
    </div>
  )
}

export let Price = ({ value }) => {
  let style = Styles()

  return ( !value || value == 0 )
    ? <Free style={ style.free }/>
    : <Numbers style={ style.numbers } value={value}/>
}
