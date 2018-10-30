import {Statistics} from './Statistics.jsx'
import Radium from 'radium'
import {connect} from '../../../../State.jsx'
import Functions from '../../../../Functions/Functions.jsx'

let style = {
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20
  },
  profileImage: imageURL => ({
    height: 90,
    width: 90,
    borderRadius: 90,
    margin: '0 auto',
    backgroundColor: '#EEE',
    backgroundImage: `url(${imageURL})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center'
  }),
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    margin: '15px auto 20px 0'
  },
  hr: {
    height: 0,
    margin: '20px 0',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    borderRight: 0,
    borderLeft: 0
  },
  close: {
    fontSize: 22,
    opacity: '0.8',
    marginTop: 20,
    cursor: 'pointer',
    ':hover': {
      opacity: '1'
    }
  }
}

export let AccountDetails =
  connect(state => state.User.userBar.accountDetails)(
    Radium(({ loading, data, statistics }) => {
      return (
        <div style={[style]}>
          <center>
            <i onClick={Functions.User.closeAccountDetails}
               className="fa fa-close"
               style={[style.close]}/>
          </center>
          <hr style={[style.hr]}/>
          <div style={[style.title]}>
            Account Details
          </div>
             {
               loading
                 ? (
                 <div>
                   <center>Loading...</center>
                 </div>
               ) : (
                 <div>
                   <div style={[style.profileImage(data.AvatarURL)]}/>
                   <div style={[style.name]}>
                        { data.FullName }
                   </div>
                   <hr style={[style.hr]}/>
                   <Statistics statistics={ statistics }/>
                 </div>
               )
             }
        </div>
      )
    }))
