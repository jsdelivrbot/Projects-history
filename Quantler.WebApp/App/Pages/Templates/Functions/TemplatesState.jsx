import {State} from '../../../State.jsx'

export function TemplatesState (content) {
  if (content) {
    State.setState({
      Templates: content
    }, 1)
  }
  else {
    return State.getState().Templates
  }
}
