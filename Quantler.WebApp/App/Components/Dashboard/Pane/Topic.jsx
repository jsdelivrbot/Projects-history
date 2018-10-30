import React from 'react'
import Radium from 'radium'
import {Icons, Fonts, Colors} from '../../Utils/GlobalStyles.jsx'
import Functions from '../../../Functions/Functions.jsx'
import Utils from '../../../Functions/Utils/Utils.jsx'

let Styles = () => {
  return {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    base: {
      fontFamily: Fonts.openSans,
      backgroundColor: Colors.grey,
      padding: '5px 16px',
      fontWeight: 300,
      fontSize: 12,
    },
    header: {
      color: Colors.secondary,
      fontSize: 20
    },
    subHeader: {
      color: Colors.primaryLight,

      owner: {
        fontSize: 12,
        color: Colors.primary,
        float: 'left',
        paddingRight: 15,
        fontWeight: 400
      },
      lastUpdated: {
        float: 'left'
      }
    },
    lastReply: {
      float: 'right',
      textAlign: 'center',
      fontSize: 12
    }
  }
}

let style = Styles()

let LastUpdated = ({ time, css = {} }) => {
  return (
    <div style={[style.subHeader.lastUpdated, css]}>
      <i className={ Icons.clock }/>&nbsp;
      <span style={{ fontSize: 11 }}>{ time }</span>
    </div> )
}

export let Topic = Radium(({ css, post }) => {
  let {
    Title,
    Owner,
    CreatedDateUTC,
    LastReplyDateUTC,
    PostID,
    LastReplyUser
  } = post

  let created = Utils.timeFromNow(post.CreatedDateUTC)

  let lastReplyAgo = Utils.timeFromNow(post.LastReplyDateUTC)

  return (
    <div style={[style.base, css]}>
      <div className={"row"}>
        <div className={"col-md-9"}>

             {/* HEADER */}
               <a href={ `#/community/post/${ PostID }`  } style={[style.header]}>
                  { Title }
               </a>

             {/* SUBHEADER */}
               <div style={[style.subHeader]}>
                 <a onClick={ () => Functions.User.openAccountDetails(Owner.UserID) }
                    style={[style.subHeader.owner]}>
                    { Owner.FullName }
                 </a>
                 <LastUpdated time={ created }/>
               </div>
        </div>

           {/* LAST REPLY */}
        <div className={"col-md-3"}>
             {
               LastReplyUser &&
               <div style={[style.lastReply]}>
                 <span style={{ fontSize: 'inherit' }}>Last reply by</span>
                 <br/>
                 <a onClick={ () => Functions.User.openAccountDetails(LastReplyUser.UserID) }
                    style={{ fontSize: 12, color: Colors.secondary }}
                 >
                    { LastReplyUser.FullName }
                 </a>
                 <br/>
                 <LastUpdated time={ lastReplyAgo } css={{ fontSize: 10 }}/>
               </div>
             }
        </div>
      </div>
    </div>
  )
})
