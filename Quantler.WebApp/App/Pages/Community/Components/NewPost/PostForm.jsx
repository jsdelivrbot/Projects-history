import {Component, PropTypes} from 'react';
import _ from 'lodash'

class CategorySelector extends Component {

  category
  subCategory

  categories = ['General', 'Template', 'Request']
  subCategories = ['Entry', 'Exit', 'Money Management', 'Risk Management']

  handleChange (type, value) {
    if (this[type] != value) {
      this[type] = value
      this.props.onChange(type, value)
      this.forceUpdate()
    }
  }

  mapCategories () {
    return this.categories.map((category, key) => (
      <a key={key}
         className={
           "btn btn-white btn-rounded btn-sm btn-pills "
           + (this.category == category ? 'active' : '')
         }
         onClick={() => this.handleChange('category', category)}
      >{category}
      </a>
    ))
  }

  mapSubcategories () {
    if (!this.subCategory) this.subCategory = this.subCategories[0];

    return (
      <div className="templatetype">
        <span className="form-text">Template Type: </span>
           {
             this.subCategories.map((subCategory, key) => (
               <a key={key}
                  className={
                    "btn btn-white btn-sm btn-pills "
                    + (this.subCategory == subCategory ? 'active' : '')
                  }
                  onClick={() => this.handleChange('subCategory', subCategory)}
               >{subCategory}
               </a>
             ))
           }
      </div>
    )
  }

  render () {
    return (
      <div>
        <div className="category">
          <span className="form-text">Category: </span>
             {this.mapCategories()}
        </div>

        {(this.category == 'Template') ? this.mapSubcategories() : null}
      </div>
    )
  }

}

class Title extends Component {

  value = ''

  handleChange (event) {
    if (this.value.length <= 40) {
      this.value = event.target.value
      this.props.onChange('title', this.value)
      this.forceUpdate()
    }
  }

  render () {
    let length = this.value.length;

    return (
      <div>
                <span className={(length == 40 ? "errortext" : '')}>
                    Max title length: {length}/40
                </span>

        <input onChange={(e) => this.handleChange(e)}
               type="text" name="title"
               placeholder="Post Title"
               className="form-control form-style"
               value={this.value}
               maxLength="40" required/>
      </div>
    )
  }

}

export class PostForm extends Component {

  editor = _.uniqueId('editor')

  componentDidMount () {
    $(() => {
      window.CKEDITOR.replace(this.editor, {
        removePlugins: 'about',
        extraPlugins: 'codesnippet',
        skin: 'office2013,/Files/office2013/'
      })

      window.CKEDITOR.instances[this.editor].on("change", (event) => {
        this.props.onChange('content', event.editor.getData())
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
          <h4 className="title-np">New Post</h4>

          <Title {...this.props}/>

          <CategorySelector {...this.props}/>

          <br/><br/>
        </div>

        <div className="texteditor">
          <textarea id={this.editor} name="content"></textarea>
        </div>
      </div>
    )
  }

}
