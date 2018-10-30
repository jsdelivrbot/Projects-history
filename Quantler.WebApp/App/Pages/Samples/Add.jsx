import {Component, PropTypes} from 'react';
import {Link}                 from 'react-router';
import {Routes}               from '../../Routes.jsx';
import {Sample, Symbol}       from '../../Services/API/Models.jsx';
import {SymbolService}        from '../../Services/API/Symbol/Main.jsx';
import {SampleService}        from '../../Services/API/Sample/Main.jsx'
import {default as _}         from 'lodash';
import {default as moment}    from 'moment';
import {QDatePicker}          from './Components/DatePicker/Main.jsx';
import UncontrolledSelectList from 'react-widgets/lib/SelectList'
import Chart                  from './Components/AddSampleChart/Main.jsx'
import {QSearch}              from '../../Components/QSearch/Main.jsx'
import {Icons} from '../../Components/Utils/GlobalStyles.jsx'
import {MainButton} from '../../Components/Buttons/MainButton.jsx'



  class SymbolSearch extends Component {

    state = {
      searchValue: "",
      showList: false
    }

    handleSearch (searchValue) {
      searchValue = searchValue.replace(/ /g, '')

      this.setState({
        searchValue: searchValue,
        showList: (searchValue.length > 0)
      })
    }

    handleSelect (v) {
      this.setState({
        searchValue: '',
        showList: false
      })
      this.props.handleSelect(v)
    }

    render () {
      let selectData = SymbolService
        .symbolsData
        .filter((symbol) =>
          symbol.Name.toLowerCase().startsWith(this.state.searchValue.toLowerCase()))

      return (
        <div style={{ position: 'relative' }}>

          <QSearch searchFunc={this.handleSearch.bind(this)}
                   value={this.state.searchValue}
                   placeholder="Search Symbol"/>

             {this.state.showList &&
             <div className="row">
               <div className="col-md-12" style={{ padding: '0 30px', height: 1 }}>
                 <div className="popover fade right in" style={{
                   width: '100%', maxWidth: '100%', top: '-16px',
                   margin: 0, position: 'relative'
                 }}>

                   <div style={{
                     borderLeft: '10px solid transparent',
                     borderRight: '10px solid transparent',
                     borderBottom: '10px solid #3e3f4b',
                     position: 'relative', height: 0,
                     top: '-10px', left: '20px', width: 0,
                     marginBottom: '-10px'
                   }}></div>

                   <div className="popover-content symbol-selectlist"
                        style={{ width: '100%', padding: '10px 0' }}>
                     <UncontrolledSelectList data={selectData}
                                             textField={(item:Symbol) => item.CategoryName + ': ' + item.Name}
                                             onChange={this.handleSelect.bind(this)}/>
                   </div>

                 </div>
               </div>
             </div>
             }

        </div>
      )
    }

  }

class SampleSettings extends Component {

  name:String = ""
  type:String = "IN"
  order:Number = 1

  componentDidMount () {
    this.updateSettings()
  }

  updateSettings (setting, value) {
    if (setting) this[setting] = value
    this.props.onUpdate(this.name, this.type, this.order)
    this.forceUpdate()
  }

  render () {
    return (
      <div>
        <div className="panel">
          <div className="panel-heading">
            Sample Settings
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4 small">
                Name
              </div>
              <div className="col-md-1 small">
                Type
              </div>
              <div className="col-md-1 small margin-left-15">
                Order
              </div>
            </div>
            <div className="row">

              <input type="text"
                     onChange={(e) => { this.updateSettings('name', e.target.value) }}
                     value={this.name}
                     name="title"
                     placeholder="Your sample name here"
                     className="form-control form-style col-md-4"
                     required/>
              <div className="select-alternative">
                <select name="type"
                        className="form-control m-b col-md-1 margin-left-15"
                        onChange={(e) => { this.updateSettings('type', e.target.value) }}>
                  <option value="IN">IN</option>
                  <option value="OUT">OUT</option>
                </select>
              </div>
              <input type="text" name="order"
                     style={{ position: 'relative', top: -20 }}
                     value={this.order}
                     onChange={(e) => { this.updateSettings('order', parseInt(e.target.value)) }}
                     className="form-control form-style col-md-1 margin-left-15" required/>

            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

class DetailsContent extends Component {

  render () {
    var symbol:Symbol = this.props.symbol;
    var timeformat = 'DD/MM/YYYY';

    return (
      <div className="propertie-container">
        <div className="propertie-lane">
          <div className="propertie-box">
            <div className="propertie-title">Category</div>
            <div className="propertie-value">{symbol.CategoryName}</div>
          </div>

          <div className="propertie-box">
            <div className="propertie-title">Min Date</div>
            <div className="propertie-value">{moment(symbol.StartDT).format(timeformat)}</div>
          </div>

          <div className="propertie-box">
            <div className="propertie-title">Max Date</div>
            <div className="propertie-value">{moment(symbol.EndDT).format(timeformat)}</div>
          </div>
        </div>

        <div className="propertie-lane">
          <div className="propertie-box">
            <div className="propertie-title">Lowest Level</div>
            <div className="propertie-value">1-Tick (Quotes)</div>
          </div>

          <div className="propertie-box">
            <div className="propertie-title">Time</div>
            <div className="propertie-value">UTC</div>
          </div>

          <div className="propertie-box">
            <div className="propertie-title">Source</div>
            <div className="propertie-value">FXCM</div>
          </div>
        </div>
      </div>
    );
  }
}

class DateSearcher extends Component {

  render () {
    return (
      <div>
        <hr />
        <div className="panel" style={{ padding: 15 }}>

          Date Searcher

          <br/><br/>

          <div className="row">
            <div className="col-md-6">
              Start Date
              <QDatePicker defaultValue={this.props.StartDT}
                           onChange={(date) => this.props.onUpdate('StartDT', date)}/>
            </div>
            <div className="col-md-6">
              End Date
              <QDatePicker defaultValue={this.props.EndDT}
                           onChange={(date) => this.props.onUpdate('EndDT', date)}/>
            </div>
          </div>

        </div>
      </div>
    );
  }

}



@SymbolService.Subscribe()
export class Add extends Component {

  sample:{
    Name     : String,
    Type     : String,
    Order    : Number,
    Symbol   : Symbol,
    StartDT  : Number,
    EndDT    : Number
  } = {}

  state = {
    // Set when calling API for
    // adding sample. Used e.g
    // disabling `Add` btn
    addingSample: false
  }

  //                                            Async Data Methods

  // Calls API for adding Sample
  // sets `this.addingSample` to `true`
  // on: success ->
  //      redirect `/samples/details/{sampleId}`
  // on: fail -> show error message
  addSample () {
    this.setState({ addingSample: true })

    SampleService
      .addSample(this.sample)
      .done((data) => {
        window.location.replace('#/samples/details/' + data.ID)
      })
      .fail(({ ...errors }) => {
        console.log('Something went wrong adding sample')
        console.log(errors)
        this.setState({ addingSample: false })
      })
  }

  //                                                  Data Methods

  updateSampleSettings (name:String, type:String, order:Number) {
    this.sample.Name = name;
    this.sample.Type = type;
    this.sample.Order = order;
    this.forceUpdate()
  }

  updateSymbolData (position, value) {
    if (this.sample[position] != value) {
      this.sample[position] = value
      this.forceUpdate()
    }
  }

  handleSymbolSelect (symbol:Symbol) {
    if (!this.sample.Symbol || this.sample.Symbol.ID != symbol.ID) {
      this.sample = _.extend({}, this.sample,
        {
          Symbol: symbol,
          StartDT: moment(symbol.StartDT).unix(),
          EndDT: moment(symbol.EndDT).unix()
        })

      this.forceUpdate()
    }
  }

  // Verifies if all info is set for
  // adding sample. Used for example
  // in toggling 'Add' button
  readyToAdd ():Boolean {
    return (
      !!this.sample.StartDT
      && !!this.sample.EndDT
      && !!this.sample.Symbol
      && !!this.sample.Name.length
      && !!this.sample.Type.length
      && !!this.sample.Order.toString().length
    )
  }

  //                                                     Lifecycle

  componentDidMount () {
    SymbolService.update()
  }

  // ----
  //                                                       Views

  header () {
    return (
      <header>
        <div className="container-btn-header">
          <Link to={Routes.Samples}>
            <MainButton value="BACK TO SAMPLES" icon={ Icons.left } type="primary"/>
          </Link>
          <MainButton onClick={this.addSample.bind(this)}
                      value="ADD"
                      icon={ Icons.plus }
                      type="secondary"
                      disabled={
                          ((this.readyToAdd()
                          && !this.state.addingSample) ? '' : 'disabled')
                        }/>
        </div>

        <SymbolSearch handleSelect={this.handleSymbolSelect.bind(this)}/>
        <hr/>

      </header>
    )
  }

  details () {
    return ( !this.sample.Symbol) ? null :
      [
        <DetailsContent symbol={this.sample.Symbol} key={0}/>,

        <DateSearcher StartDT={this.sample.StartDT * 1000}
                      EndDT={this.sample.EndDT * 1000}
                      onUpdate={this.updateSymbolData.bind(this)}
                      key={1}/>

        , <Chart Symbol={this.sample.Symbol}
                 StartDT={this.sample.StartDT}
                 EndDT={this.sample.EndDT}
                 onUpdate={this.updateSymbolData.bind(this)}
                 key={2}/>
      ]

  }

  // ----

  render () {
    return (
      <div className="content-wrapper">
        <div className="samples container-fluid">
             {this.header()}
               <SampleSettings onUpdate={this.updateSampleSettings.bind(this)}/>
             {this.details()}
        </div>
      </div>
    );
  }

}
