import {Component}                              from 'react'
import Radium                                   from 'radium'
import {QPaginator}                             from '../../Components/QPaginator/Main.jsx'
import {connect}                                from '../../State.jsx'
import Functions                                from '../../Functions/Functions.jsx'
import {Routes}                                 from '../../Routes.jsx'
import {Link}                                   from 'react-router'
import {}                                       from './Algorithms.scss'
import {Icons, Colors}                          from '../../Components/Utils/GlobalStyles.jsx'
import Utils                                    from '../../Functions/Utils/Utils.jsx'
import {TemplateTooltip, Styles, templateTypes} from '../../Components/Template/TemplateTooltip.jsx'
import _                                        from 'lodash'
import VideoButton                              from '../../Components/Utils/VideoButton.jsx'

class TableHead extends Component {
  render () {
    return (
      <thead>
      <tr>

        <th className="header sortable sort-desc">
          <div>
            <span className="sort-indicator">Backtest Time</span>
          </div>
        </th>

        <th title="" className="header">
          <div >
            <span>Samples</span>
          </div>
        </th>

        <th title="" className="header">
          <div>
            <span>Templates</span>
          </div>
        </th>

        <th title="" className="header sortable">
          <div>
            <span className=" sort-indicator">ROI</span>
          </div>
        </th>

        <th title="" className="header sortable">
          <div>
            <span className=" sort-indicator">Max DD</span>
          </div>
        </th>

        <th title="" className="header sortable">
          <div>
            <span className=" sort-indicator">Sharpe Ratio</span>
          </div>
        </th>

        <th title="" className="header">
          <div>
            <span>Load System</span>
          </div>
        </th>

      </tr>

      </thead>
    )
  }
}

class TableBody extends Component {
  templatesMap (templates) {
    return templates.map((Template) => (
      <Link
        key={_.uniqueId('_')}
        to={Routes.Templates + Template.ID}
      >
        <TemplateTooltip
          type={ Template.Type }
          hoverMessage={ Utils.templateTooltipText(Template) }
          name={ Template.Name }/>
      </Link>))
  }

  render () {
    let history = this.props.history.Content

    //Function for rounding the values (can be easily altered)
    let round = ((number, points) => (number.toFixed(points)))

    return (
      <tbody>
      {history.map((Test) =>
        <tr key={Test.ID}>
          <td>
            {Utils.formatTime(Test.CreatedDT)}
          </td>

          <td>
            {
              Test.Samples.map((Sample) =>
                <Link key={Sample.ID} to={Routes.SampleDetails + Sample.ID}>
                  <span key={Sample.ID}>{Sample.Name}</span>
                </Link>)
            }
          </td>

          <td data-title="'Templates'" className="text-left" data-title-text="Templates">
              {this.templatesMap(Test.Templates)}
          </td>

          <td data-title="'ROI'" sortable="'roi'" data-title-text="ROI">
              {[for (t of Test.ResulStatistics) if (t.Name == 'ROI') round(t.Value * 100, 2)] + '%'}
          </td>

          <td data-title="'Max DD'" sortable="'maxdd'" data-title-text="Max DD">
              {[for (t of Test.ResulStatistics) if (t.Name == 'MaxDDPortfolio') round(t.Value * 100, 2) + '%']}
          </td>

          <td data-title="'Sharpe Ratio'" sortable="'sharpe'" data-title-text="Sharpe Ratio">
              {[for (t of Test.ResulStatistics) if (t.Name == 'SharpeRatio') round(t.Value, 4)]}
          </td>

          <td data-title="'Load System'" data-title-text="Load System">
            <Link to={ Routes.Backtester + Test.ID }>
              <i className={ Icons.squareRight } style={{ fontSize: 20, color: Colors.secondary }}/>
            </Link>
          </td>
        </tr>
      )}
      </tbody>
    )
  }
}

class HistoryTable extends Component {

  columns = [
    'Date',
    'Samples',
    'Templates',
    'ROI',
    'MaxDD',
    'Sharpe',
    'LoadSystem'
  ]

  componentDidMount () {
    $(() => {
      let table = $("#algorithms-table").DataTable({
        paging: false,
        info: false,
        searching: false,
        columnDefs: [
          { orderable: false, targets: [1, 2, 6] }
        ]
      })

      table.on('order.dt', () => {
        let order = table.order()
        let column = order[0][0]
        let sortingDirection = order[0][1]

        Functions.Algorithms.Index.load({
          page: 1,
          sorting: this.columns[column],
          sortingDirection
        })

        $('.loading-panel').removeClass('hide')
      })

      $('th').css('width', '')
    })
  }

  componentDidUpdate () {
    $(() => $('.dataTables_empty').remove())
  }

  tableBody () {
    return !!this.props.history.Content &&
      <TableBody history={ this.props.history }/>
  }

  render () {
    return (
      <div className="row">
        <div className="col-sm-12">
          <table id="algorithms-table" className="table table-bordered ng-table">
            <TableHead/>
                 { this.tableBody() }
          </table>
        </div>
      </div>
    )
  }

}

@connect(state => ({
  excludeAutoDiscovery: state.algorithms.index.options.excludeAutoDiscovery,
  excludeManual: state.algorithms.index.options.excludeManual
}))
class ExcludeFilterContainer extends Component {

  handleOnToggle = (type) => {
    Functions.Algorithms.Index.load({ [type]: !this.props[type] })
  }

  render () {
    let { excludeAutoDiscovery, excludeManual} = this.props
    return (
      <div>
        <ExcludeFilter onToggle={ this.handleOnToggle } type='excludeAutoDiscovery' status={ excludeAutoDiscovery } >
          Auto Discovery
        </ExcludeFilter>
        <ExcludeFilter onToggle={ this.handleOnToggle } type='excludeManual' status={ excludeManual }>
          Manual
        </ExcludeFilter>
      </div>
    )
  }
}

let ExcludeFilter = ({onToggle, children, type, status}) => {
  let uniqueId = _.uniqueId('toggleId_')
  return (
    <span style={{float: 'right', display: 'flex', alignItems: 'center'}}>
      <div style={{ display: 'inline-block'}}>
        <input
          id={uniqueId}
          className="cmn-toggle cmn-toggle-round"
          type="checkbox"
          onChange={ () => onToggle(type) }
          checked={ !status }/>
        <label htmlFor={uniqueId}></label>
      </div>
      <span style={{ fontSize: 12, color: Colors.primaryLight, fontWeight: 900, paddingLeft: 5, paddingRight: 10 }}>
        {children}
      </span>
    </span>
  )
}

@Radium
class Header extends Component {
  render () {
    return (
      <header>
        <VideoButton style={{ height: 37 }} videoSrc="8aeSa7ah1mw"/>
        <h4>{ this.props.title }</h4>
        <div className="col-sm-7" style={{ marginTop: 25 }}>
          <span style={[Styles.box(false), { cursor: 'default', backgroundColor: templateTypes['Entry'].color }]}>
            Entry
          </span>
          &nbsp;
          <span style={[Styles.box(false), { cursor: 'default', backgroundColor: templateTypes['Exit'].color }]}>
          Exit
          </span>
          &nbsp;
          <span
            style={[Styles.box(false), { cursor: 'default', backgroundColor: templateTypes['Money Management'].color }]}>
          Money Management
          </span>
          &nbsp;
          <span
            style={[Styles.box(false), { cursor: 'default', backgroundColor: templateTypes['Risk Management'].color }]}>
          Risk Management
          </span>
        </div>
        <div className="col-sm-5" style={{ marginTop: 25 }}>
          <ExcludeFilterContainer />
        </div>
      </header>
    )
  }
}

@connect(state => ({
  history: state.algorithms.index.history,
  loading: state.algorithms.index.loading
}))
export class Algorithms extends Component {

  loadPage (page) {
    Functions.Algorithms.Index.load({page})
  }

  loading () {
    let hide = (this.props.loading ? '' : 'hide')

    return (
      <div className={"loading-panel " + hide}>
        <img src={"Art/" + 'Images/spinner_64.gif'} alt="Loading"/>
      </div>
    )
  }

  componentWillMount () {
    Functions.Algorithms.Index.load(null)
  }

  render () {
    let { history } = this.props

    return (
      <div className="content-wrapper algorithms">
        <Header title="Backtesting Quantler History" />
        <section style={{ position: 'relative' }}>
          <HistoryTable history={history}/>

          <QPaginator onClick={(page) => this.loadPage(page)}
                      next={history.NextPage}
                      previous={history.PrevPage}
                      current={history.CurrentPage}
                      last={history.MaxPage}/>

                 {this.loading()}
        </section>
      </div>
    )
  }

}
