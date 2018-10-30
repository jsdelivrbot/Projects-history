import {Component} from 'react'
import Radium from 'radium'
import {Topic} from './Topic.jsx'
import {Template} from './Template.jsx'
import {Icons, Fonts, Colors} from '../../Utils/GlobalStyles.jsx'

let style = {
  base: {
    fontFamily: Fonts.openSans,
    width: '100%',
    height: '100%',
    minWidth: 350,
    backgroundColor: Colors.white,
    borderRadius: 5,
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.15)',
    paddingBottom: 17,
    overflow: 'hidden'
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 45,
    padding: '0 10px',
  },
  header: {
    fontSize: 20,
    fontWeight: 300,
  },
  rightHeader: {
    color: Colors.primary,
    float: 'right',
    fontSize: 12,

    rightTitle: {
      color: Colors.primary,
      textDecoration: 'none',
      fontSize: 12,
      letterSpacing: 0.8,
      fontWeight: 700,
      ':hover': {
        color: Colors.orange
      },
    },

    icon: {
      color: Colors.primary,
      fontSize: 22,
      verticalAlign: '-4px',
      paddingLeft: 12
    }
  }
}

@Radium
export class Pane extends Component {
  render () {
    let { title, rightTitle, rightTitleUrl, contents } = this.props

    return (
      <div style={[style.base, { minWidth: 350 }]}>
           {/* HEADER */}
             <div className={"row"} style={[style.wrapper]}>
               <div className={"col-sm-6"}>
            <span style={[style.header]}>
                {title}
            </span>
               </div>

               <div className={"col-sm-6"}>
                 <div style={[style.rightHeader]}>
                   <a style={[style.rightHeader.rightTitle]} href={rightTitleUrl}>
                <span style={{ fontSize: 'inherit' }}>
                    { rightTitle.toUpperCase() }
                </span>
                     <i style={[style.rightHeader.icon]} className={Icons.arrowRight}/>
                   </a>
                 </div>
               </div>
             </div>
           { contents }
      </div>
    )
  }
}
