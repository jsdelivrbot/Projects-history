import {Colors} from '../../../../Utils/GlobalStyles'

let style = {
  message: {
    position: 'absolute',

    backgroundColor: Colors.orange,
    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
    color: Colors.white,
    padding: '7px 10px'
  }
}

export function Content ({ leftNote, rightNote, image }) {

  return (
    <div>

      {
        leftNote.height !== 0
          ? <div>

          <div style={{ position: 'absolute', bottom: 0, left: 76 }}>
            <img src={ image } width="934" height="500"/>
          </div>

              <span style={{ ...style.message, bottom: leftNote.height, paddingLeft: leftNote.padding, left: 0 }}>
                { leftNote.text }
              </span>

              <span style={{ ...style.message, bottom: rightNote.height, paddingRight: rightNote.padding, right: 0 }}>
               { rightNote.text }
              </span>

        </div>

          : <div style={{ position: 'absolute', bottom: 110, left: 218, boxShadow: '0 10px 50px rgba(0,0,0,0.5)' }}>
          <iframe id="ytplayer" type="text/html" width="650" height="365.625"
                  src={'https://www.youtube.com/embed/' + image + '?controls=0&fs=1&rel=0&showinfo=0&color=white'}
                  frameBorder="0" allowFullScreen></iframe>
        </div>
      }
    </div>
  )
}
