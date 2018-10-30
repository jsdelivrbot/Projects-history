import {Component, PropTypes} from 'react'
let Ace = require('react-ace')

try {
  // npm 3
  require('brace/mode/csharp');
  //require('../../../../../node_modules/brace/theme/dreamweaver');
  require('brace/theme/chaos');
}
catch (error) { }

export class AceEditor extends Component {

  render () {
    return (
      <div
        style={this.props.style}
        className="col-sm-12 no-transition-all no-pad"
        id={this.props.id || ''}>
        <Ace
          mode="csharp"
          theme="chaos"
          name={this.props.id}
          value={this.props.code}
          fontSize={12}
          width="100%"
          height="100%"
          {...this.props}/>
      </div>
    );
  }

}
