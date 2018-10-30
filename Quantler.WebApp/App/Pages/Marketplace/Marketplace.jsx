import {Component} from 'react'
import {TemplateItem, TypeIcon, types} from './TemplateItem.jsx'
import {TemplateDetails} from './TemplateDetails/TemplateDetails.jsx'
import {connect} from '../../State.jsx'
import Functions from '../../Functions/Functions.jsx'
import Radium from 'radium'
import {QPaginator} from '../../Components/QPaginator/Main.jsx'
import {Loading} from '../../Components/Utils/Components.jsx'
import * as TemplatesAPI from '../../Functions/Networking/API/Templates.jsx'
import VideoButton from '../../Components/Utils/VideoButton.jsx'

let styles = {
  filterButton: ({ active, type }) => {
    let { color } = (types[type] || { color: "#000" })

    let border = '1px solid ' +
      (active ? color : 'rgba(62, 63, 75, 0.47)')

    let opacity = (active ? '1' : '0.6')

    return {
      base: {
        marginRight: 15,
        border: border,
        borderRadius: 20,
        textAlign: 'center',
        padding: '6px 15px',
        float: 'left',
        cursor: 'pointer',
        opacity: opacity,
        background: (active ? color : 'none'),
        color: (active ? '#fff' : '#000'),
        ':hover': {
          opacity: 1
        }
      }
    }
  }
}

@connect(state => ({
  filtertype: state.marketplace.index.ajaxOptions.filtertype
}))
@Radium
class FilterButton extends Component {
  render () {
    let { type, filtertype } = this.props

    let active =
      (type == filtertype) ||
      (filtertype == "" && type == "All")

    let style = styles.filterButton({ active, type })

    let onClick = () => {
      //console.log('original type: '+type);
      Functions.Marketplace
        .loadPublicTemplates({
          filtertype: (type == "All" ? "" : type),
          page: 1
        })
    }

    let typeClass = type+'Marketplace'
    return (
      <div className={typeClass} onClick={onClick} style={[style.base]}>
        <TypeIcon type={type}/>
            <span>
                {type}
            </span>
      </div>
    )
  }
}

@connect(state => ({
  index: state.marketplace.index,
  userDetails: state.User.details,
  date: Date.now()
}))
@Radium
class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {MaxPage: 0, page: 1, type: ''}
  }

  setMaxPages(type) {
    var self = this
    //console.log('for type:'+type);
    TemplatesAPI.getPublicTemplates({page: 1,pagesize: 9,filtertype: type}).success(function(ajaxResponse) {
      //console.log('set MaxPage responce:'+ ajaxResponse.MaxPage);
      self.setState({ MaxPage: ajaxResponse.MaxPage})
    })
  }

  initScroll() {
    var self = this
    this.setStartPage('')
    $('.AllMarketplace').click()
    console.log('init scroll'+this.state.page)
    $(window).scroll(function (e) {
        let scrollPositionDefault = $(window).scrollTop() + $(window).height()
        let scrollPosition = Math.ceil(scrollPositionDefault)
        //console.log(scrollPositionDefault+":"+scrollPosition +":"+$(document).height())
        if( scrollPosition == $(document).height() && location.hash == '#/marketplace') {
            self.state.page = self.state.page + 1
            console.log("At the bottom page:"+self.state.page+"max page: "+self.state.MaxPage)
            if (self.state.MaxPage >= self.state.page){
              //console.log("send page: "+self.state.page+ " type: "+self.state.type)
              Functions.Marketplace.scrollLoadPublicTemplates({ page: self.state.page, filtertype: self.state.type })
            }
        }
        if ($(window).scrollTop() > 40)
          $('.goToTopButton').show()
        else
          $('.goToTopButton').hide()
    })
  }
  componentDidMount() {
    this.initScroll()
    $('.marketplace-items').css('min-height',$(window).height())
  }

  setStartPage(type){
    console.log('start page 1 type '+type)
    this.setState({page: 1, type: type})
    this.setMaxPages(type)
    $('.goToTopButton').hide()
  }

  goToTop() {
    $("html, body").animate({ scrollTop: 0 }, "slow")
  }

  render () {
    let { index, userDetails } = this.props

    return (
      <div className="marketplace-items" style={{ padding: "20px 20px 0 10px" }}>
        <i style={{display:'none'}} onClick={this.goToTop.bind(this)} className="fa fa-chevron-up goToTopButton"></i>
        <div>
          <div className="row" style={{ marginBottom: 20 }}>
            <span className="AllMarketplace" onClick={this.setStartPage.bind(this, '')}>
              <FilterButton type="All"/>
            </span>
            <span onClick={this.setStartPage.bind(this, 'Entry')}>
              <FilterButton type="Entry"/>
            </span>
            <span onClick={this.setStartPage.bind(this, 'Exit')}>
              <FilterButton type="Exit"/>
            </span>
            <span onClick={this.setStartPage.bind(this, 'Risk Management')}>
              <FilterButton type="Risk Management"/>
            </span>
            <span onClick={this.setStartPage.bind(this, 'Money Management')}>
              <FilterButton type="Money Management"/>
            </span>
            <VideoButton style={{ height: 37 }} videoSrc="CjO3ECsCaA8"/>
          </div>
          <div className="row" style={{ marginTop: 20 }}>
               {
                 index.loading
                   ? <Loading/>
                   : index.templates.map(template =>
                   <TemplateItem key={template.ID} template={ template }/>)
               }
               {
                 (index.templates.length == 0 && !index.loading)
                 && (<h3 style={{ fontWeight: "lighter" }}>
                   &nbsp;No Templates Found
                 </h3>)
               }
          </div>
        </div>

        <div style={{ display: 'none' }}>
             {
               (!index.loading && index.templates.length != 0)
               && (<QPaginator
                 pagination={index.ajaxResponse}
                 onClick={page =>
                   Functions.Marketplace.loadPublicTemplates({ page })}/>)
             }
        </div>
      </div>
    )
  }
}

@connect(state => ({ loading: state.marketplace.loading }))
export class Marketplace extends Component {
  query = {}
  view = ""

  checkProps () {
    let { location, loading } = this.props

    this.query = location.query

    this.view =
      ((this.query.ownerId && this.query.templateId)
        ? "Details" : "Index" )
  }

  componentWillMount () {
    this.checkProps()
    Functions.Marketplace.load({ view: this.view })
  }

  componentWillUnmount () {
    Functions.Marketplace.unLoad()
  }

  render () {
    this.checkProps()

    //if (this.props.loading) return <Loading />

    switch (this.view) {
      case "Details":
        Functions.Marketplace.detailsLoad(this.query)
        return <TemplateDetails/>
        break

      case "Index":
        //Functions.Marketplace.indexLoad()
        return <Index/>
        break
    }
  }
}
