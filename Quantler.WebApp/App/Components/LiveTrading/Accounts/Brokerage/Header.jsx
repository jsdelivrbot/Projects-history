import React        from 'react'
import Radium       from 'radium'
import {MainButton} from '../../../Buttons/MainButton.jsx'
import {Icons, 
  Fonts, 
  Colors}           from '../../../Utils/GlobalStyles.jsx'
import VideoButton  from '../../../Utils/VideoButton.jsx'
import {Link}       from 'react-router'
import {Routes}     from "../../../../Routes.jsx"

let Styles = () => {
  return {
    container: {
      padding: '20px 20px 0 20px'
    },
    button: {
      marginRight: 40
    },
    currentPage: {
      color: Colors.primary,
      fontSize: 25,
      fontWeight: 300,
      borderLeft: '3px solid '.concat(Colors.orange),
      paddingLeft: 15
    }
  }
}

export let Header = Radium(() => {

  let style = Styles()

  return (
    <div style={ style.container }>
      <Link to={ Routes.Dashboard }>
        <MainButton
          value={ 'BACK TO DASHBOARD' }
          type={ 'primary' }
          icon={ Icons.arrowLeft }
          iconSize={ 20 }
          css={ style.button }/>
      </Link>

      <span style={[style.currentPage]}>Live Trading Account</span>

      <VideoButton videoSrc="IUXSydgxjSo" />
    </div>
  )
})
