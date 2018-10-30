import {Component, PropTypes} from 'react';
import {default as _}         from 'lodash';
import {Link}                 from 'react-router';
import {Routes}               from '../../Routes.jsx';
import {QPaginator}           from '../../Components/QPaginator/Main.jsx';
import {CommunityService}     from '../../Services/API/Community/Main.jsx';
import {QTitle}               from '../../Components/QTitle/Main.jsx';
import Utils                  from '../../Functions/Utils/Utils.jsx'
import {Loading}              from '../../Components/Utils/Components.jsx'
import {
  CommunityData, CommunityPost, APIData
} from '../../Services/API/Models.jsx';

var QButton = require('../../Components/QButtons/Main.jsx');

class TemplateFilters extends Component {

  render () {
    let type = this.props.location.query.type || 'All';

    return (
      <div className="filter text-right">

        <span>Template Type: </span>

                    <span className="filteritem">
                        <Link to={Routes.Community + 'Template'}>
                            <a className={(type == 'All') ? 'active' : ''}>All</a>
                        </Link>
                        <span>|</span>
                    </span>

                    <span className="filteritem ">
                        <Link to={Routes.Community + 'Template'} query={{ type: 'Entry' }}>
                            <a className={(type == 'Entry') ? 'active' : ''}>Entry</a>
                        </Link>
                        <span>|</span>
                    </span>

                    <span className="filteritem ">
                        <Link to={Routes.Community + 'Template'} query={{ type: 'Exit' }}>
                            <a className={(type == 'Exit') ? 'active' : ''}>Exit</a>
                        </Link>
                        <span>|</span>
                    </span>

                    <span className="filteritem ">
                        <Link to={Routes.Community + 'Template'} query={{ type: 'Money Management' }}>
                            <a className={(type == 'Money Management') ? 'active' : ''}>Money Management</a>
                        </Link>
                        <span>|</span>
                    </span>

                    <span className="filteritem ">
                        <Link to={Routes.Community + 'Template'} query={{ type: 'Risk Management' }}>
                            <a className={(type == 'Risk Management') ? 'active' : ''}>Risk Management</a>
                        </Link>
                    </span>

      </div>
    );
  }

}

class Filters extends Component {

  render () {
    let category = this.props.params.category || 'All';

    return (
      <div className="pull-right filters">
        <div className="filter text-right">

          <span>Category: </span>

                    <span className="filteritem">
                        <Link to={Routes.Community + ''}>
                            <a className={(category == 'All') ? 'active' : ''}>All</a>
                        </Link>
                        <span>|</span>
                    </span>

                    <span className="filteritem ">
                        <Link to={Routes.Community + 'General'}>
                            <a className={(category == 'General') ? 'active' : ''}>General</a>
                        </Link>
                        <span>|</span>
                    </span>

                    <span className="filteritem ">
                        <Link to={Routes.Community + 'Template'}>
                            <a className={(category == 'Template') ? 'active' : ''}>Template</a>
                        </Link>
                        <span>|</span>
                    </span>

                    <span className="filteritem ">
                        <Link to={Routes.Community + 'Request'}>
                            <a className={(category == 'Request') ? 'active' : ''}>Request</a>
                        </Link>
                    </span>

        </div>

        <br/>

           {(category == 'Template') ? <TemplateFilters {...this.props}/> : null}

      </div>
    );
  }

}

class PostPanel extends Component {

  render () {
    var post:CommunityPost = this.props.post;

    return (
      <div className="post col-md-12">
        <div className="col-md-6 pull-left">
          <img className="pull-left usericon img-circle" src={post.Owner.AvatarURL}/>

          <div className="pull-left posttitle">

            <Link to={Routes.CommunityPost + post.PostID}>
              <h4 className="title-text-center">{post.Title}</h4>
            </Link>

            <p className="owner pull-left">
               {post.Owner.FullName}
            </p>

            <div className="timespan-post pull-left">
              <i className="fa fa-clock-o"/>
              &nbsp;
                            <span>
                            { Utils.timeFromNow(post.CreatedDateUTC) }
                            </span>
            </div>

          </div>
        </div>

        <div className="col-md-6 pull-right">
          <div className="col-md-4 lastreply pull-right">
            <div>Last reply by:</div>
            <div>
              <Link to={Routes.CommunityPost + post.PostID}>
                <a>
                  <strong>
                    {(!!post.LastReplyUser) ? post.LastReplyUser.FullName : post.Owner.FullName}
                  </strong>
                </a>
              </Link>
            </div>
            <div className="timespan">
              <i className="fa fa-clock-o"/>&nbsp;
                            <span>
                            { (!post.LastReplyUser) ? Utils.timeFromNow(post.CreatedDateUTC) : Utils.timeFromNow(post.LastReplyDateUTC) }
                            </span>
            </div>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="statistics pull-right" style={{ marginRight: -20 }}>
              <h1>{post.Replies}</h1>
              <p>Replies</p>
            </div>

            <div className="statistics pull-right" style={{ marginRight: 10 }}>
              <h1>{post.Views}</h1>
              <p>Views</p>
            </div>
          </div>
        </div>

      </div>
    );
  }

}

@CommunityService.Subscribe()
export class Initial extends Component {

  loadPosts () {
    let pageNumber = parseInt(this.props.location.query.page) || 1,
      category = this.props.params.category || '',
      templateType = this.props.location.query.type || '',
      postsQuantity = 12

    if (category && CommunityService.categories[category]) {
      CommunityService.loadPage(
        pageNumber,
        postsQuantity,
        CommunityService.categories[category],
        templateType
      );
    }
    else {
      CommunityService.loadPage(pageNumber, postsQuantity);
    }
  }

  handlePageClick (_pageNumber) {
    let pageNumber = _pageNumber || 1,
      category = this.props.params.category || '',
      templateType = this.props.location.query.type || ''

    window.location.href = (
      '#/'
      + Routes.Community.match(/\w+\//)[0]
      + (category ? category : '')
      + `?page=${pageNumber}`
      + (templateType ? `&type=${templateType}` : '')
    )
  }

  content () {
    let postsData:CommunityData = CommunityService.postsData;

    return (CommunityService.ready())
      ? (
      <div>
        <div className="row">
             {postsData.Content.map((post) =>
               <PostPanel key={post.PostID} post={post}/>
             )}
        </div>

        <div className="row">
          <QPaginator previous={postsData.PrevPage}
                      next={postsData.NextPage}
                      current={postsData.CurrentPage}
                      last={postsData.MaxPage}
                      onClick={(page) => this.handlePageClick(page)}/>
        </div>
      </div>
    )
      : <Loading />
  }

  render () {
    this.loadPosts()

    return (
      <div>
        <div className="row">
          <Link to={Routes.CommunityNewPost}>
            <QButton.Plus text="Create New Post"/>
          </Link>

          <Filters {...this.props}/>
        </div>

        {this.content()}
      </div>
    );
  }

}
