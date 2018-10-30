import Radium from 'radium'
import {Styles, defaultStyle} from './Styles.jsx'
import Tooltip from '../../Components/Tooltip/Tooltip.jsx'
import moment from 'moment'
import Functions from '../../Functions/Functions.jsx'

export let types = {
  "Entry": {
    color: "#ffce54",
    icon: "fa fa-sign-in"
  },
  "Exit": {
    color: "#4fc1e9",
    icon: "fa fa-sign-out"
  },
  "Risk Management": {
    color: "#ed5565",
    icon: "fa fa-exclamation-triangle"
  },
  "Money Management": {
    color: "#a0d468",
    icon: "fa fa-money"
  },
}

export let TypeIcon = ({ type }) => {
  return (
    types[ type ]
      ? <i className={types[type].icon}>&nbsp;</i>
      : <span/>
  )
}

let importButtonTypes = {
  imported: {
    tooltip: "Template imported",
    style: style => style.footer.import.imported,
    icon: "fa fa-check"
  },
  needsUpdate: {
    tooltip: "Current version is out of date",
    style: style => style.footer.import.needsUpdate,
    icon: "zmdi zmdi-refresh-sync-alert"
  },
  default: {
    tooltip: "Import This Template",
    style: style => style.footer.import.default,
    icon: "fa fa-plus"
  },
  importing: {
    tooltip: "Importing template...",
    style: style => style.footer.import.importing,
    icon: "zmdi zmdi-refresh-alt"
  }
}

export let ImportButton = Radium(({ style, template, right, importing }) => {
  importing = importing || {}
  let _style = style || defaultStyle
  let { needsUpdate, imported } = template

  let _importing =
    template.importing ||
    (!!importing.ID && importing.ID != -1)

  let type =
    needsUpdate ? importButtonTypes.needsUpdate
      : (imported ? importButtonTypes.imported
      : (_importing ? importButtonTypes.importing
      : importButtonTypes.default))

  let placement = (right ? "left" : "bottom")

  let onClick = ((!needsUpdate && !imported && !_importing)
    ? () => Functions.Marketplace.importTemplate({
    templateId: template.ID,
    userId: template.Owner.UserID
  })
    : () => window.location.replace(
    '#/templates/' + template.ID + '/?updateTemplate=true'))

  return (
    <Tooltip placement={ placement } overlay={<span>{ type.tooltip }</span>}>
      <div
        onClick={ onClick }
        style={[
          _style.footer.item({ border: false, noPadding: true }),
          _style.footer.import.base, type.style(_style)]}
      >
        <i className={ `${type.icon}` }/>
      </div>
    </Tooltip>
  )
})

export let Footer = Radium(({ style, right, template, importing }) => {
  let ownerStyle = Object.deepExtend(
    style.footer.item({ border: false }),
    (!right
      ? { width: 143 }
      : { width: 'auto', padding: 10 }))

  return (
    <div style={[style.footer.base]}>
      <div style={[style.footer.item({ border: true }), { width: 133 }]}>
        <i className="zmdi zmdi-calendar-alt"/>
        &nbsp;&nbsp;
        <span>
            { moment(template.CreatedDT).format("DD / MM / YYYY") }
        </span>
      </div>
      <div style={{ ...ownerStyle, overflow: 'hidden', height: '82%' }}>
        <i className="fa fa-user"/>
        &nbsp;&nbsp;
        <a onClick={ () => Functions.User.openAccountDetails(template.Owner.UserID) }
           style={{ color: '#ee4415' }}
           title={ template.Owner.FullName }
        >
          { template.Owner.FullName }
        </a>
      </div>
      <div style={[
        style.footer.item({ border: false, noPadding: true }),
        { width: 42, textAlign: 'center', lineHeight: '16px', paddingTop: 5, borderLeft: '1px solid rgba(0, 0, 0, 0.05)' }]}>

        <i style={{ fontSize: 14 }} className="zmdi zmdi-share"/>
        <br/>
        <span>
            { template.TimesShared }
        </span>
      </div>
      <ImportButton
        importing={ importing || {} }
        template={ template }
        style={ style }
        right={ right }/>
    </div>
  )
})

let PriceStyles = {
  free: {
    backgroundColor: '#3e3f4b',
    padding: '3px 13px',
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    borderRadius: 4,
    cursor: 'pointer'
  },
  price: {
    fontWeight: 700,
    color: '#3e3f4b',
    cursor: 'default'
  }
}

let Free = () => {
  return (
    <div style={PriceStyles.free}>
      Free
    </div>
  )
}

let Text = ({ price }) => {
  let prices = String(price).split('.')
  let integer = prices[ 0 ]
  let decimal = (prices[ 1 ] && ('.' + prices[ 1 ])) || '.00'

  return (
    <span style={PriceStyles.price}>
      <span style={{fontSize: 18}}>{'$ ' + integer}</span>
      <sup style={{fontSize: 12}}>{decimal}</sup>
    </span>
  )
}

export let Price = ({ price, url }) => {
  return (
    <span style={{ float: 'right' }}>
    {
      (price && price > 0)
        ? <Text price={price}/>
        : <a href={ url }><Free/></a>
    }
    </span>
  )
}

export let TemplateItem = Radium(({ template }) => {
  let { Name, ShortComment, Type, ID, Owner, PriceUSD } = template

  let color = types[ Type ].color
  let style = Styles(color)
  let href = `#/marketplace/?ownerId=${Owner.UserID}&templateId=${ID}`

  return (
    <div style={[style.base]}>

      {/* Title */}
      <div style={[style.title]}>
        <a href={ href }>
                    <span style={{ fontSize: 16 }}>
                        { Name || "Template Item" }
                    </span>
        </a>
                <span style={{ color }}>
                    &nbsp;&nbsp;
                  <TypeIcon type={ Type }/>
                </span>
        <div style={{ float: 'right' }}>
          <Price price={ PriceUSD } url={ href }/>
        </div>
      </div>

      {/* Description */}
      <div style={[style.description]}>
        { ShortComment }
      </div>

      <Footer style={style} template={template}/>

    </div>
  )
})
