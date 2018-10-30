import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import * as actions from '../../actions';
import { categories } from './categories';

class FilmNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  onSubmit(values) {
    this.props.createFilm(values, this.state.file, () => {
      this.context.router.push('/films');
    });
  }

  handleFileUpload(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  renderCategories() {
    return categories.map(category => (
        <option key={ category } defaultValue={ category }>{ category }</option>
    ));
  };

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="image-properties" src={ imagePreviewUrl }/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    const {
      handleSubmit,
      fields: {
        title,
        categories,
        content
      }
    } = this.props;
    return (
        <div>
          <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <fieldset className="form-group">
              <label>Title of a new film:</label>
              <input
                className="form-control"
                type="text"
                { ...title }
              />
              {
              title.touched &&
              title.error &&
              <div className="error">
                { title.error }
              </div>
              }
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="categories">
                Categories:
              </label>
              <select
                className="form-control"
                id="categories"
                { ...categories }>
                { this.renderCategories() }
              </select>
            </fieldset>
            <fieldset className="form-group">
              <label>
                Content (short description what film is about):
              </label>
              <textarea
                className="form-control"
                rows="7"
                { ...content }
              />
              {
              content.touched &&
              content.error &&
              <div className="error">
                { content.error }
                </div>
              }
            </fieldset>
            <div className="imgPreview film-detail-for-all">
              { $imagePreview }
            </div>
            <fieldset className="form-group">
              <label>
                Image for film:
              </label>
              <input
                type="file"
                name="file"
                onChange={ (e) => this.handleFileUpload(e) }
              />
            </fieldset>
            <button action="submit" className="btn btn-primary"> Save</button>
            <Link to="/films" className="btn btn danger"> Cancel</Link>
          </form>
        </div>
    );
   }
 }

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.title) {
    errors.content = "Enter a content!";
  }

  return errors;
}

export default reduxForm({
  form: 'FilmsNewForm',
  fields: [
    'title',
    'categories',
    'content'
  ],
  validate
}, null, actions)(FilmNew);





