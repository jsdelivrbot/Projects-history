import {Component, PropTypes} from 'react';
import {Link}                 from 'react-router';
import {Routes, Paths}        from '../../../../Routes.jsx';
import {CommunityService}     from '../../../../Services/API/Community/Main.jsx';
import {Loading}              from '../../../../Components/Utils/Components.jsx'

var Reply = require('./Reply.jsx'),
  Posts = require('./Posts.jsx'),
  QButton = require('../../../../Components/QButtons/Main.jsx');

class Header extends Component {

  backToCommunity () {
    // let href = window.location.origin + "/#" +
    //     (_.includes (Paths.previous.value, 'community')
    //         ? Paths.previous
    //         : '/community/')

    return (
      <Link to={Routes.Community}>
        <QButton.Right text="Back To Community"/>
      </Link>
    )
  }

  render () {
    return (
      <div className="row">
           {this.backToCommunity()}
      </div>
    );
  }

}

@CommunityService.Subscribe()
export class Post extends Component {

  constructor (props) {
    super();

    CommunityService.loadPost(props.params.id)
  }

  render () {
    return (
      <div>
        <Header/>
        {
          CommunityService.postReady()
            ? <div>
            <Posts post={CommunityService.openPost}/>
            <Reply postid={this.props.params.id}/>
          </div>
            : <Loading/>
        }
      </div>
    );
  }

}
