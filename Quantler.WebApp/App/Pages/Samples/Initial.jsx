import {Component}     from 'react'
import _                 from 'lodash'
import {Link}          from 'react-router'
import {Routes}        from '../../Routes.jsx'
import {Sample}        from '../../Services/API/Models.jsx'
import {SampleService} from '../../Services/API/Sample/Main.jsx'
import {QSearch}       from '../../Components/QSearch/Main.jsx'
import Modal             from '../../Components/Modal/Modal.jsx'
import moment            from 'moment'
import VideoButton from '../../Components/Utils/VideoButton.jsx'
import {Icons} from '../../Components/Utils/GlobalStyles.jsx'
import {MainButton} from '../../Components/Buttons/MainButton.jsx'

let QPanel = require('../../Components/QPanel/Main.jsx')
let QButtons = require('../../Components/QButtons/Main.jsx')

class FormattedSamples {
  constructor (dataObject /*{Title:string, Data:Array<Sample>}*/) {
    this.title = dataObject.Title
    this.data = dataObject.Data
  }

  get Title ():string {
    return this.title
  }

  get Data ():Array<Sample> {
    return this.data
  }
}

function formatSampleData (Samples:Array<Sample>):Array<FormattedSamples> {
  return _(Samples)
    .groupBy((Sample:Sample) => Sample.Symbol.Name)
    .map((Samples:Array<Sample>, SymbolName) =>
      new FormattedSamples({
        'Title': SymbolName,
        'Data': Samples
      }))
    .value()
}

class SampleTable extends Component {

  render () {
    var dataItems = this.props.data

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-hover">

          <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Order</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
          </tr>
          </thead>
          <tbody>
          {dataItems.map((Sample:Sample) =>
            <tr key={+new Date() + Sample.Name}>
              <td>
                <Link to={Routes.SampleDetails + Sample.ID}>
                      {Sample.Name}
                </Link>
              </td>
              <td>{Sample.SampleType}</td>
              <td>{Sample.Order}</td>
              <td>{moment(Sample.StartDT).format("YYYY-MM-DD")}</td>
              <td>{moment(Sample.EndDT).format("YYYY-MM-DD")}</td>
              <td>{moment(Sample.EndDT).diff(moment(Sample.StartDT), 'days')} days</td>
            </tr>
          )}
          </tbody>

        </table>
      </div>
    )
  }

}

@SampleService.UnSubscriber()
export class Initial extends Component {
  sampleData = []
  filterText = ''

  componentDidMount () {
    this.unsubscribe = SampleService.Subscriber(() => {
      this.sampleData = formatSampleData(SampleService.samples())
      this.setState({ '': '' })
    })

    SampleService.update()
  }

  filterData (text, data:Array<FormattedSamples>) {
    return (text.trim().length == 0)
      ? data
      : data.filter((dataObject:FormattedSamples) =>
      (dataObject.Title.toLowerCase()).includes(text.trim().toLowerCase()))
  }

  setFilterText (text) {
    this.filterText = text
    this.forceUpdate()
  }

  render () {
    var sampleData = this.filterData(this.filterText, this.sampleData)

    return (
      <div className="content-wrapper">
        <div className="samples container-fluid">

          <header>
            <div className="container-btn-header">
              <Link to={Routes.SampleAdd}>
                <MainButton value="ADD SAMPLE" icon={ Icons.plus } type="primary" />
              </Link>

              <VideoButton videoSrc="atX8IaM_zyo" />
            </div>
            <QSearch searchFunc={(v)=> this.setFilterText(v)} placeholder="Search Symbol"/>
          </header>

          <section>
            { sampleData.map((data:FormattedSamples) =>
              <QPanel title={data.Title} id={+new Date() + data.Title} key={+new Date() + data.Title}>
                <SampleTable data={data.Data}/>
              </QPanel>
            )}
          </section>

        </div>
      </div>
    )
  }

}
