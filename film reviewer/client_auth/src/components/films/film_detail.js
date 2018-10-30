import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import { categories } from './categories';

class FilmDetail extends Component {
  constructor(props) {
    super(props);
    this.toggleEditState = this.toggleEditState.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.state = {
      isEditing: true,
      file: '',
      imagePreviewUrl: null
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {
    const { id } = this.props.params;
    this.props.fetchFilm(id);
  }

  toggleEditState() {
    this.setState({
      isEditing: !this.state.isEditing,
      imagePreviewUrl: null
    });
  }

  onDeleteClick() {
    const { id } = this.props.params;
    let oldImage = this.props.film.image;
    this.props.deleteFilm(id, oldImage, () => {
      this.context.router.push('/films');
    });
  }

  onSaveEdit() {
    let newFilm = {
      _id: this.props.film._id,
      title: this.editTitle.value,
      categories: this.editCategories.value,
      content: this.editContent.value,
      image: this.state.file,
      oldImage: this.props.film.image
    };
    this.props.updateFilm(newFilm);
  }

  renderEditButton() {
    if (this.state.isEditing) {
      return <button
          className="btn btn-warning pull-xs-right film-detail-for-btns"
          onClick={ () => this.toggleEditState() } >
        Edit
      </button>;
    }
  }

  renderDeleteButton() {
    if (!this.state.isEditing) {
      return (
          <button
              className="btn btn-danger pull-xs-right film-detail-for-btns"
              onClick={this.onDeleteClick.bind(this)}>
            Delete film
          </button>

      );
    }
  }

renderCategories() {
  return categories.map(category => (
    <option
    key={ category }
    value={ category }>
      { category }
    </option>
    ));
  }

  handleFileUpload(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { film } = this.props;
    const { imagePreviewUrl } = this.state;
    let imagePreview = null;

    if (!film) {
      return <div>
        Loading ...
      </div>
    }

    if (imagePreviewUrl) {
      imagePreview = (
        <img
        className="image-properties"
        src={ imagePreviewUrl }
      />);
    } else {
      imagePreview = (
        <img
          className="image-properties"
          src={ film.image }
          alt="Film logo"
        />
      );
    }

    return (
        <div>
          <Link to="/films">Back to index </Link>

          { this.renderDeleteButton() }

          { this.renderEditButton() }

          { this.state.isEditing ?
              <div>
                <h1 className="film-detail-for-all">
                  { film.title }
                </h1>
                <img
                    className="film-detail-for-all image-properties"
                    src={ film.image }
                    alt="Film logo"
                />
                <h6 className="film-detail-for-all">
                  Categories: { film.categories }
                </h6>
                <p className="film-detail-for-all">
                  { film.content }
                </p>
              </div> :
              <div>
                <div className="film-detail-for-all">
                  <input
                      type="text"
                      className="form-control"
                      defaultValue={ film.title }
                      ref={ (editTitle) => {
                    this.editTitle = editTitle
                      } }
                  />
                </div>
                <div className="imgPreview  film-detail-for-all">
                  { imagePreview }
                </div>
                <div className="film-detail-for-all">
                  <input
                      type="file"
                      name="file"
                      onChange={ (e) => this.handleFileUpload(e) }
                  />
                </div>
                <div className="form-group film-detail-for-all">
                  <label htmlFor="sel1">Categories:</label>
                  <select
                      className="form-control"
                      id="sel1" defaultValue={ film.categories }
                      ref={ (editCategories) => {
                    this.editCategories = editCategories } }>
                    { this.renderCategories() }
                  </select>
                </div>
                <div className="film-detail-for-all">
                  <textarea
                      className="form-control"
                      rows="5"
                      defaultValue={ film.content }
                      id="content"
                      ref={ (editContent) => {
                        this.editContent = editContent } } />
                </div>
                <button className="btn btn-warning pull-xs-right" onClick={ () => { this.toggleEditState() } }>
                  Cancel
                </button>
                <button
                    className="btn btn-success pull-xs-right"
                    onClick={ () => {
                      this.toggleEditState();
                      this.onSaveEdit(); } }>Save
                </button>
              </div>
          }
        </div>
    );
  };
}

function mapStateToProps({ films }, ownProps) {

  return {
    film: films[ownProps.params.id]
  };
}

export default connect(mapStateToProps, actions)(FilmDetail);
