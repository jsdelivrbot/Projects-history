import {Component}      from 'react'
import {Link, History}    from 'react-router'
import {Routes, Paths}    from '../../../../Routes.jsx'
import {QSignIn}          from '../../../../Components/QSignIn/Main.jsx'
import {PostForm}         from './PostForm.jsx'
import {CommunityService} from '../../../../Services/API/Community/Main.jsx'
import Functions from '../../../../Functions/Functions.jsx'

let QButton = require('../../../../Components/QButtons/Main.jsx')

class Loading extends Component {
  render () {
    return (
      <div className="row hide">
        <img src={"Art/" + "Images/ajax-loader.gif"} alt="Image"/> Loading...
      </div>
    )
  }

}

class SignIn extends Component {

  render () {
    return (
      <div className="row hide">
        <div>
          <div className="alert alert-primary">
            <div>
                            <span className="ng-binding ">
                                You need to <Link to={Routes.Login}><a>sign-in</a></Link> to post a reply.
                            </span>

              <QSignIn/>

              <br/><br/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export class NewPost extends Component {

  static get contextTypes () {
    return History.contextTypes
  }

  // awaiting return
  // from ajax post
  awaiting = false

  title = ''
  category = ''
  subCategory = ''
  content = ''

  post () {
    Functions.Shell.hitFeature('New Community Post')

    if (this.category != 'Template') {
      this.subCategory = null
    }

    this.awaiting = true
    this.forceUpdate()

    CommunityService.submitPost(
      {
        Content: [{ Content: this.content }],
        Category: this.category,
        Title: this.title,
        TemplateType: this.subCategory
      }
    ).success(() => {
        CommunityService.refreshPage()
        this.context.history.pushState(null, Routes.Community)
      }
    ).fail(() => {
      this.awaiting = false
      // ErrorHandler('Could not add a new post', 'post() in NewPost')
      alert('something went wrong')
    })
  }

  handleChange (key, value) {
    this[key] = value
    this.forceUpdate()
  }

  backToCommunity () {
    return (
      <Link to={Routes.Community}>
        <QButton.Right text="Back To Community"/>
      </Link>
    )
  }

  render () {
    let disablePost

    if (this.title.length < 1
      || this.category.length < 1
      || this.content.length < 1
    ) {
      disablePost = { disabled: true }
    } else {
      disablePost = { disabled: '' }
    }

    if (this.awaiting) {
      return (
        <div>posting ...</div>
      )
    }

    return (
      <div>
        <div className="row">
             {this.backToCommunity()}
               &nbsp;
               <QButton.Send onClick={() => this.post()}
                             text="Post"
                             className="btn-primary"
                             {...disablePost}/>
        </div>

        <Loading/>
        <SignIn/>
        <PostForm onChange={(k, v) => this.handleChange(k, v)}/>
      </div>
    )
  }

}
