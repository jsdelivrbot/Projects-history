import {Store} from '../../Utils/pubsub.jsx'
import {APIURL} from '../../API/Main.jsx'
import {AjaxErrorHandler} from '../../../Functions/Networking/API/Main.jsx'
import {AjaxHandler} from '../AjaxHandler.jsx'
import {CommunityData, CommunityPost, CommunityPostContent} from '../Models'

export class CommunityServiceClass extends Store {

  defaultPageSize = 12

  categories = {
    All: 'All',
    General: 'General',
    Template: 'Template',
    Request: 'Request'
  }

  constructor () {
    super()
    this.postsData = new CommunityData({})
    this.openPost = new CommunityPost({})
  }

  get postsData ():CommunityData {
    return this._postsData
  }

  set postsData (v:CommunityData) {
    this._postsData = v
    this.Publish()
  }

  get openPost ():CommunityPost {
    return this._openPost
  }

  set openPost (v:CommunityPost) {
    this._openPost = v
  }

  updating = false

  loadPosts (pageNumber, pageSize, category, templateType) {
    return AjaxHandler.Get(
      APIURL
      + `community/posts`
      + (!!category ? `/${category}` : '')
      + `?page=${pageNumber}&pagesize=${pageSize}`
      + (!!templateType ? ('&templatetype=' + templateType) : '')
    )
  }

  refreshPage () {
    //Refresh the current data we have (after a new post for instance)
    this.loadPage(this.postsData.CurrentPage, this.defaultPageSize, this.postsData.CurrentCategory, this.postsData.CurrentType, true)
  }

  loadPage (pageNumber:Number, pageSize:Number, category:String = '', templateType:String = '', forceUpdate:Boolean = false) {
    // If the post page was open
    if (!!this.openPost.PostID) {
      this.openPost = new CommunityPost({})
    }

    if (pageNumber != this.postsData.CurrentPage
      || category != this.postsData.CurrentCategory
      || templateType != this.postsData.CurrentType
      || forceUpdate) {
      if (!this.updating) {
        this.updating = true

        this.postsData = new CommunityData({})

        this.loadPosts(pageNumber, pageSize, category, templateType)
          .success((data) => {
            this.postsData = new CommunityData(data)
            this.postsData.CurrentCategory = category
            this.postsData.CurrentType = templateType
            this.updating = false
          })
          .fail(AjaxErrorHandler)
      }

    }
  }

  ready () {
    return !!this.postsData.Content
  }

  loadPost (postId:string) {
    this.openPost = new CommunityPost({})

    AjaxHandler.Get(APIURL + `community/posts/${postId}`)
      .success((data) => {
        this.openPost = new CommunityPost(data)
        this.Publish()
      })
      .fail(AjaxErrorHandler)
  }

  postReady () {
    return (!!this.openPost.PostID && !!this.openPost.PostID.length)
  }

  submitPost (post:{Content:Array<{Content:string}>, Category:string, Title:string, TemplateType:string}) {
    return AjaxHandler.Post(APIURL + 'community/posts', post)
  }

  submitReply (postid:String, reply:String) {
    return AjaxHandler.Post(APIURL + `community/posts/${postid}/reply`, { 'Content': reply })
  }
}

export var CommunityService = new CommunityServiceClass()
