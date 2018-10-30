import {Colors} from '../../../../Utils/GlobalStyles'

let style = {

  container: {
    marginTop: 30,
    textAlign: 'center',
    cursor: 'default'
  },

  step: {
    fontSize: 23,
    fontWeight: 300,
    color: Colors.orange,
    paddingBottom: 10
  },

  text: {
    fontSize: 14,
    fontWeight: 300,
    lineHeight: '20px',
    letterSpacing: 0.8,
    color: Colors.white
  }
}

export function Title ({ step, title }) {

  return (
    <div style={ style.container }>
      <div style={ style.step }>
           {step > 0 ? `Step ${step}` : 'Introduction'}
      </div>
      <div style={{ width: '60%', height: 130, margin: '0 auto' }}>
        <span style={ style.text }>{ title }</span>
      </div>
    </div>
  )
}
