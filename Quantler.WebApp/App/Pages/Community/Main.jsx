import * as React            from 'react';
import {RouteHandler}        from 'react-router';
import {Initial as _Initial} from './Initial.jsx';
import {NewPost as _NewPost} from './Components/NewPost/Main.jsx';
import {Post as _Post}       from './Components/Post/Main.jsx';
import {QTitle}              from '../../Components/QTitle/Main.jsx';
import {}                    from './community.scss';

export var Initial = _Initial;
export var NewPost = _NewPost;
export var Post = _Post;

export class Index extends React.Component {

  render () {
    return (
      <div className="content-wrapper">

        <div className="community">
             { this.props.children }
        </div>

      </div>
    );
  }

}
