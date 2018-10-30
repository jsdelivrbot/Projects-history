import {Component} from 'react'
import {Routes}               from '../../../../Routes.jsx'
import {Link}                 from 'react-router'
import {LoginService}         from '../../../../Services/API/Login/Main.jsx'
import {CommunityService}     from '../../../../Services/API/Community/Main.jsx'
import {}                     from './Reply.scss'
import _                      from 'lodash'

class SignIn extends Component {

  render () {
    return (
      <div className="row" ngshow="postdetails.Content &amp&amp currentuser.FullName == 'Test User'">
        <div>
          <div className="alert alert-primary">

            <div>
                    <span className="ng-binding ">
                        You need to <a>sign-in</a> to post a reply.
                    </span>

              <Link to={Routes.Login}>
                <button className="btn btn-default pull-right">
                  Sign in
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    )
  }

}

let listener = () => {}

class ReplyButton extends Component {
  state = {
    text: "",
    loading: false
  }

  componentDidMount () {
    listener = this.update
  }

  update = text => this.setState({ text })

  submitPost = () => {
    let postId = this.props.postid

    this.setState({ loading: true })

    CommunityService
      .submitReply(postId, this.state.text)
      .success(() => {
        //Force current post to update
        CommunityService.loadPost(postId)

        //Force update current cache
        CommunityService.refreshPage()
      })
      .fail(() => {
        //ErrorHandler('Could not add a new reply', 'submitPost() in ReplyForm')
        this.setState({ loading: false })
        alert('something went wrong')
      })
  }

  render () {
    let disabled = this.state.loading || !this.state.text

    return (
      <button className="btn btn-primary" disabled={ disabled } onClick={this.submitPost}>
              { this.state.loading && "Posting..." || "Reply" }
      </button>
    )
  }
}

class ReplyForm extends Component {
  editor = _.uniqueId('editor')

  componentDidMount () {
    $(() => {
      window.CKEDITOR.replace(this.editor, {
        removePlugins: 'about',
        extraPlugins: 'codesnippet',
        skin: 'office2013,/Files/office2013/'
      })

      window.CKEDITOR.instances[this.editor].on("change", (event) => {
        listener(event.editor.getData())
      })
    })
  }

  componentWillUnmount () {
    window.CKEDITOR.instances[this.editor].destroy()
  }

  render () {
    return (
      <div className="row">
        <div className="newpost">

          <h4 className="title-np">Reply</h4>
          <img className="pull-left img-circle user-sm" src={LoginService.User.data.picture}/>
          <div className="texteditor">
            <textarea id={this.editor} name="content"></textarea>
          </div>
          <div className="submit pull-right">
            <ReplyButton postid={ this.props.postid }/>
          </div>
        </div>
      </div>
    )
  }

}

module.exports = class Reply extends Component {

  render () {
    return (
      <div>
        <ReplyForm postid={this.props.postid}/>
        {/*<SignIn/>*/}
      </div>
    )
  }

}
