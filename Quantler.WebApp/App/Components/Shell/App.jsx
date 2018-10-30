import {StyleRoot} from 'radium'
import {Component}  from 'react'
import {RouteHandler} from 'react-router'

export class App extends Component {
  componentWillMount () {
    let goTo = this.props.location.query.goto

    if (goTo) {
      localStorage["gotoURL"] = `/#${goTo.replace(/\"/g, '')}`
    }
  }

  render () {
    return (
      <StyleRoot>
        <div>
          { this.props.children }
        </div>
      </StyleRoot>
    )
  }
}
