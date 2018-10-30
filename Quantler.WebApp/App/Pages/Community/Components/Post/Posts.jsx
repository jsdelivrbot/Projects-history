import {Component, PropTypes}              from 'react';
import * as _                              from 'lodash';
import {CommunityPost, CommunityPostReply} from '../../../../Services/API/Models.jsx';
import Utils                               from '../../../../Functions/Utils/Utils.jsx'

class ReplyPost extends Component {

  render () {
    return (
      <div>
        {_.drop(this.props.replies).map((reply:CommunityPostReply) => (

          <div key={reply.ID} className="singlepost ng-scope indent">
            <div className="posttitle">
              <img className="usericon pull-left img-circle"
                   src={reply.Owner.AvatarURL}/>

              <div className="pull-left">
                <p className="owner pull-left ng-binding pulldown">
                   {reply.Owner.FullName}
                </p>

                <div className="timespan-post pull-left pulldown">&nbsp;
                  <i className="fa fa-clock-o"/>
                  &nbsp;
                                <span>
                                { Utils.timeFromNow(reply.CreatedDateUTC) }
                                </span>
                </div>

              </div>
            </div>

            <div className="postcontent">
              <p dangerouslySetInnerHTML={{ __html: reply.Content }}>
              </p>
            </div>
          </div>

        ))}
      </div>
    )
  }

}

class Post extends Component {

  render () {
    var post:CommunityPost = this.props.post;

    return (
      <div className="singlepost " ngcn="{'indent':!$first}">

        <div className="posttitle">
          <img className="usericon pull-left img-circle"
               src={post.Owner.AvatarURL}/>

          <div className="pull-left">
            <h4 className="title-text-center ng-binding" ngshow="$first">
                {post.Title}
            </h4>

            <p className="owner pull-left ng-binding" ngcn="{'pulldown':!$first}">
               {post.Owner.FullName}
            </p>

            <div className="timespan-post pull-left" ngcn="{'pulldown':!$first}">
              &nbsp;<i className="fa fa-clock-o"></i>
              &nbsp;<span am-time-ago="item.CreatedDateUTC">
                            { Utils.timeFromNow(post.CreatedDateUTC) }
                            </span>
            </div>

            <p></p>
          </div>

          <div ngshow="$first" className="statistics pull-right">
            <h2 className="ng-binding">{post.Replies}</h2>
            <p>Replies</p>
          </div>

          <div ngshow="$first" className="statistics pull-right">
            <h2 className="ng-binding">{post.Views}</h2>
            <p>Views</p>
          </div>
        </div>

        <div className="postcontent">
          <p dangerouslySetInnerHTML={{ __html: post.Content[0].Content }}></p>
        </div>

      </div>
    )
  }

}

module.exports = class Posts extends Component {

  componentDidMount () {
    $(document).ready(function () {
      $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
      });
    });
  }

  render () {
    return (
      <div className="row" ngshow="postdetails.Content">
        <Post post={ this.props.post }/>
        <ReplyPost replies={ this.props.post.Content }/>
      </div>
    );
  }

}
