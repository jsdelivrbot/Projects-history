import {Component} from 'react'

export default class QPanel extends Component {
  componentDidMount () {

    $(() => {
      let toggleSelected = (e) =>
        $(e.target)
          .parent()
          .find('.panel-heading em')
          .toggleClass('fa-caret-right')
          .toggleClass('fa-caret-down')

      $(this.refs[this.props.id])
        .on('hide.bs.collapse', toggleSelected)
        .on('show.bs.collapse', toggleSelected)
    })

  }

  render () {
    return (
      <div ref={this.props.id} className="col-sm-12 panel-container" data-parent={'#' + this.props.id}>
        <div className="panel panel-default panel-row">

          <div
            className="panel-heading panel-heading-collapsed unselectable"
            data-toggle="collapse" href={'#' + this.props.id}
            aria-expanded="false" aria-controls={this.props.id}
            style={{ cursor: 'pointer' }}>

            <h3>
              {this.props.title}
              <paneltool tool-collapse="tool-collapse" className="pull-right">
                <em className="fa fa-caret-right"></em>
              </paneltool>
            </h3>

          </div>

          <div
            id={this.props.id}
            className="panel-wrapper panel-collapse collapse"
            role="tabpanel"
            aria-labelledby="headingOne">

            <div className="panel-body">
                 {this.props.children}
            </div>

          </div>

        </div>
      </div>
    )
  }
}
