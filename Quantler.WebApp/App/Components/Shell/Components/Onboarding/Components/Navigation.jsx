import Radium  from 'radium'
import {Icons, Colors} from '../../../../Utils/GlobalStyles'

let style = {

  bar: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    margin: '0 auto',
    height: 5,
    width: 800,
    borderRadius: 5
  },

  arrow: {
    position: 'absolute',
    top: 189,
    fontSize: 36
  },

  arrowLeft: (isFirstPage) => {
    return {
      left: 100,
      color: isFirstPage ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.87)',
      cursor: isFirstPage ? 'default' : 'pointer'
    }
  },

  arrowRight: (isLastPage) => {
    return {
      left: 960,
      color: isLastPage ? Colors.secondary : 'rgba(255, 255, 255, 0.87)',
      cursor: 'pointer'
    }
  },

  closeButton: {

    position: 'absolute',
    top: 30,
    right: 30,

    fontSize: 30,
    color: Colors.white,
    ':hover': {
      color: Colors.secondary
    },

    cursor: 'pointer'
  }
}

export let Navigation = Radium(({ position, setFunc, positions, closeFunc }) => {

  let size = style.bar.width / positions // width
  let move = position * size // marginLeft

  let isLastPage = position === positions - 1
  let isFirstPage = position === 0

  return (
    <div>
      <i onClick={ closeFunc } style={ style.closeButton } className={ Icons.close }/>

      <div style={{ height: 20 }}>

        <i style={[style.arrow, style.arrowLeft(isFirstPage)]} onClick={() => setFunc(position - 1)}
           className={ Icons.arrowLeftLong }/>

        <div style={ style.bar }>
          <div
            style={{
              backgroundColor: '#fff',
              height: 'inherit',
              borderRadius: 'inherit',
              marginLeft: move,
              width: size
            }}></div>
        </div>

        <i style={[style.arrow, style.arrowRight(isLastPage)]}
           onClick={() => position != positions - 1 ? setFunc(position + 1) : closeFunc()}
           className={ Icons.arrowRightLong }/>
      </div>
    </div>
  )
})
