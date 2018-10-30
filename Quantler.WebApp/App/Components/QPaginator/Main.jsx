import {Component, PropTypes} from 'react';

export class QPaginator extends Component {

  static get propTypes () {
    return {
      last: PropTypes.number,
      previous: PropTypes.number,
      next: PropTypes.number,
      current: PropTypes.number,
      pagination: PropTypes.shape({
        last: PropTypes.number,
        previous: PropTypes.number,
        next: PropTypes.number,
        current: PropTypes.number
      }),
      onClick: PropTypes.func
    }
  }

  handleClick (pageNumber) {
    if (this.props.current !== pageNumber) {
      this.props.onClick(pageNumber)
    }
  }

  render () {
    if (this.props.pagination) {
      var {
        PrevPage    : previous,
        NextPage    : next,
        CurrentPage : current,
        MaxPage     : last
      } = this.props.pagination
    }
    else {
      var { previous, next, current, last } = this.props
    }

    return (
      <div className="row">
        <div className="container col-md-12">
          <div className="paginationrow">
            <ul className="pagination center-block pagination-sm">

              <li className="arrows">
                <a onClick={() => this.handleClick(1)}><i className="fa fa-angle-double-left"></i></a>
              </li>

              <li className="arrows">
                <a onClick={() => this.handleClick(previous)}><i className="fa fa-angle-left"></i></a>
              </li>

                {
                  (previous == 1)
                    ? null
                    : <li>
                    <a onClick={() => this.handleClick(previous - 1)}>{ previous - 1 }</a>
                  </li>
                }

                {
                  (previous == current)
                    ? null
                    : <li>
                    <a onClick={() => this.handleClick(previous)}>{ previous }</a>
                  </li>
                }

              <li>
                <a onClick={() => this.handleClick(current)}
                   style={{ fontWeight: 'bold !important' }}>{ current }</a>
              </li>

                {
                  (next == current)
                    ? null
                    : <li>
                    <a onClick={() => this.handleClick(next)}>{ next }</a>
                  </li>
                }

                {
                  (last == next)
                    ? null
                    : <li>
                    <a onClick={() => this.handleClick(next + 1)}>{ next + 1 }</a>
                  </li>
                }

              <li className="arrows">
                <a onClick={() => this.handleClick(next)}><i className="fa fa-angle-right"></i></a>
              </li>

              <li className="arrows">
                <a onClick={() => this.handleClick(last)}><i className="fa fa-angle-double-right"></i></a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    );
  }

}
