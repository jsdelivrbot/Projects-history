import {Component} from 'react'
import Radium from 'radium'
import {Icons, Fonts, Colors} from '../../Utils/GlobalStyles.jsx'
import {Price} from './Price.jsx'
import {ImportButton} from '../../../Pages/Marketplace/TemplateItem.jsx'
import {defaultStyle as _MarketplaceStyles} from '../../../Pages/Marketplace/Styles.jsx'

let Styles = (type, importType) => {
  return {
    wrapper: {
      borderTop: '3px solid '.concat(type.color)
    },
    base: {
      fontFamily: Fonts.openSans,
      fontWeight: 300,
      width: '100%',
      height: 43,
      backgroundColor: Colors.white,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.15)',
      marginBottom: 5
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 43,
      fontSize: 16,
      padding: '0 20px',

      icon: {
        color: type.color,
        fontSize: 14,
        padding: '0 5px 0 20px'
      },

      type: {
        fontSize: 12
      }
    },

    rightContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: '100%'
    },
    shareInfo: {
      width: 46,
      height: 43,
      borderLeft: '1px solid rgba(0,0,0,0.1)',
      marginLeft: 10,
      textAlign: 'center',
      color: Colors.primaryLight,
      fontSize: 12,
      letterSpacing: 0.4,
      fontWeight: 700,

      icon: {
        position: 'relative',
        paddingTop: 3,
        top: 2,
        fontSize: 18
      }
    },
    marketplaceButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      height: 43,
      width: 52,
      backgroundColor: importType.color,
      textAlign: 'center',
      opacity: 0.9,
      ':hover': {
        opacity: 1
      },

      icon: {
        color: Colors.white,
        fontSize: 16
      }
    }

  }

}

let types = {
  'Entry': {
    color: Colors.yellow,
    icon: Icons.entry,
    text: 'Entry'
  },
  'Exit': {
    color: Colors.blue,
    icon: Icons.exit,
    text: 'Exit'
  },
  'Risk Management': {
    color: Colors.guava,
    icon: Icons.risk,
    text: 'Risk Management'
  },
  'Money Management': {
    color: Colors.green,
    icon: Icons.money,
    text: 'Money Management'
  }
}

let importTypes = {
  'import': {
    color: Colors.orange,
    icon: Icons.import,
    message: 'Import this template'
  },
  'imported': {
    color: Colors.green,
    icon: Icons.imported,
    message: 'Already imported'
  },
  'outOfDate': {
    color: Colors.guava,
    icon: Icons.refresh,
    message: 'Current version is out of date'
  }
}

let MarketplaceStyles = Object.deepExtend(_MarketplaceStyles, {
  footer: {
    import: {
      base: {
        padding: 12
      }
    }
  }
})

delete MarketplaceStyles.footer.import.base.paddingTop

@Radium
export class Template extends Component {
  render () {
    let { template } = this.props
    let { Name, PriceEUR, TimesShared, Type, Owner, ID } = template

    let _type = types [Type]
    let importType = (template.needsUpdate ? "outOfDate" : (template.imported ? "imported" : "import"))
    let _importType = importTypes [importType]
    let style = Styles(_type, _importType)

    return (
      <div style={[style.wrapper]}>
        <div style={[style.base]}>
          <div className={"row"}>

               {/* HEADER */}
                 <div className={"col-md-7"}>
                   <div style={[style.header]}>
                     <a href={ `#/marketplace/?ownerId=${ Owner.UserID }&templateId=${ ID }` }>
                        { Name }
                     </a>
                     <i style={[style.header.icon]} className={_type.icon}/>
                     <span style={[style.header.type]}>{_type.text}</span>
                   </div>
                 </div>

               {/* RIGHT CONTAINER */}
                 <div className={"col-md-5"}>
                   <div style={[style.rightContainer]}>
                     <Price value={ PriceEUR }/>
                     <div style={[style.shareInfo]}>
                       <i style={[style.shareInfo.icon]} className={Icons.share}/><br />
                  <span>
                      { TimesShared }
                  </span>
                     </div>
                     <ImportButton
                       template={template}
                       right={true}
                       style={MarketplaceStyles}/>
                   </div>
                 </div>

          </div>
        </div>
      </div>
    )
  }
}
