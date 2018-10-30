import {Component} from 'react'
import {Routes}      from '../../Routes.jsx'
import {Link}        from 'react-router'

export class NotFound extends Component {
  componentDidMount () {
    // Log this event as an error for further analyses
    // ErrorHandler (window.location.href, '404 Page')
  }

  render () {
    return (
      <div>
        <center>
          <div className="abs-center wd-xl ng-scope">
            <div className="text-center mb-xl">
              <div className="text-lg mb-lg">404</div>
              <p className="lead m0">We couldn't find this page.</p>
              <p>The page you are looking for does not exists.</p>
            </div>

            <div className="input-group mb-xl hidden">
              <input type="text" placeholder="Try with a search" className="form-control"/>
                            <span className="input-group-btn">
                                <button type="button" className="btn btn-default">
                                    <em className="fa fa-search"></em>
                                </button>
                            </span>
            </div>
            <ul className="list-inline text-center text-sm mb-xl">
              <li>
                <Link to={Routes.Backtester}>
                  <span className="text-muted">Go to App</span>
                </Link>
              </li>
              <li className="text-muted">|</li>
              <li>
                <Link to={Routes.Login}>
                  <span className="text-muted">Login</span>
                </Link>
              </li>
              <li className="text-muted">|</li>
              <li>
                <Link to={Routes.Register}>
                  <span className="text-muted">Register</span>
                </Link>
              </li>
            </ul>
          </div>
        </center>
      </div>
    )
  }
}
