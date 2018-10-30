import {Component, PropTypes} from 'react';
import {Routes}               from '../../../Routes.jsx';
import {Link}                 from 'react-router';
import {LoginService}         from '../../../Services/API/Login/Main.jsx';
import _                      from 'lodash'
import Functions              from '../../../Functions/Functions.jsx'
import {connect}            from '../../../State.jsx'

class SignIn extends Component {

  render () {
    return (
      <div className="row" ngshow="postdetails.Content &amp;&amp; currentuser.FullName == 'Test User'">
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
    );
  }

}

@connect(state => state.marketplace.details.comment)
class ReplyButton extends Component {
  render () {
    let { loading, text } = this.props

    let disabled = loading || !text

    return (
      <button
        className="btn btn-primary"
        disabled={ disabled }
        onClick={() => Functions.Marketplace.postComment() }>
        {
          loading ? "Posting..." : "Reply"
        }
      </button>
    )
  }
}

@connect(state => ({
  text: state.marketplace.details.comment.text
}))
export class Reply extends Component {
  editor = _.uniqueId('editor')

  componentDidMount () {
    $(() => {
      window.CKEDITOR.replace(this.editor, {
        removePlugins: 'about',
        extraPlugins: 'codesnippet',
        skin: 'office2013,/Files/office2013/'
      })

      window.CKEDITOR.instances[this.editor].on("change", (event) => {
        Functions.Marketplace.updateCommentText(
          event.editor.getData())
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

          <h4 style={{ marginBottom: 20, fontWeight: 'normal', fontFamily: 'Open Sans Light' }}>
            Leave a comment
          </h4>
          <img className="pull-left img-circle user-sm" src={LoginService.User.data.picture}/>
          <div className="texteditor">
            <textarea id={this.editor} name="content"></textarea>
          </div>
          <div className="submit pull-right">
            <ReplyButton />
          </div>
        </div>
      </div>
    );
  }

}
