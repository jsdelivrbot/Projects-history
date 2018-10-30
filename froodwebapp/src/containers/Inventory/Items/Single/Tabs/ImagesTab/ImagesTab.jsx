import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Modal, Spin } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import config from 'config';
import {
  itemImageSaveRequest,
  itemImagesGetRequest,
  itemImagesDeleteRequest,
  showErrorMessage,
} from 'redux-base/actions';
import styles from './ImagesTab.scss';

const mapStateToProps = state => ({
  loadingPage: state.item.loadingPage,
  images: state.item.images,
  needReloadImages: state.item.needReloadImages,
});

const mapDispatchToProps = {
  itemImageSaveRequest,
  itemImagesGetRequest,
  itemImagesDeleteRequest,
  showErrorMessage,
};

class ImagesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      image: '',
      imageURL: ''
    };
    // create instance of adobe creative sdk.
    this.featherEditor = new window.Aviary.Feather({
      ...config.adobeCreativeConfig,
      onSave: (imageID, newURL) => {
        this.handleLoadImage(newURL);
        this.featherEditor.close();
      },
      onError: (errorObj) => {
        this.props.showErrorMessage(errorObj.message);
      },
      onClose: () => {
        this.setState({ imageURL: '' });
      }
    });
  }

  componentWillReceiveProps({ needReloadImages, itemId }) {
    if (needReloadImages) {
      this.setState({ imageURL: '' }, () => this.props.itemImagesGetRequest({ id: itemId }));
    }
  }

  handleImageChange = ({ target: { files }, }) => {
    const imageURL = URL.createObjectURL(files[0]);
    this.setState({ imageURL }, () => this.featherEditor.launch({
      image: 'editableImage',
    }));
  }

  handleLoadImage = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const fileName = Math.random().toString(36).substr(2, 9);
      this.handleUploadImage(xhr.response, `${fileName}.png`);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  handleUploadImage = (file, name) => {
    const reader = new FileReader();
    // onload execute when content read with readAsDataURL is available.
    // the result attribute contains the data as base64 encoded string.
    reader.onload = ({ target: { result } }) => {
      this.props.itemImageSaveRequest({
        id: this.props.itemId,
        payload: {
          attachment: result.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, ''),
          filename: name
        }
      });
    };
    // the readAsDataURL method is used to read the contents of the File.
    reader.readAsDataURL(file);
  }

  handleDeleteImage = imageId => () => {
    this.props.itemImagesDeleteRequest({
      id: this.props.itemId,
      imageId
    });
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  }

  handleViewImage = src => () => {
    this.setState({
      modalVisible: true,
      image: src
    });
  }

  render() {
    const {
      loadingPage,
      images
    } = this.props;
    const {
      modalVisible,
      image,
      imageURL
    } = this.state;

    return (
      <div>
        <Modal
          visible={ modalVisible }
          onCancel={ this.handleCancel }
          wrapClassName={ styles.imageModalWrapper }
          width={ 850 }
          footer={ null }
        >
          <img src={ image } alt="viewed-img" />
        </Modal>
        <Spin spinning={ loadingPage }>
          <Row>
            <Col className={ styles.uploadCol } xs={ 6 } sm={ 4 } md={ 3 } lg={ 2 }>
              <label htmlFor="imageInput">
                <div className={ styles.uploadBox }>
                  <Icon
                    type="plus"
                    className={ styles.uploadIcon }
                  />
                  <p className={ styles.uploadText }>Upload</p>
                  <input
                    id="imageInput"
                    type="file"
                    onChange={ this.handleImageChange }
                  />
                </div>
              </label>
            </Col>
            { images.map(item => (
              <Col className={ styles.imageCol } key={ item.id } xs={ 6 } sm={ 4 } md={ 3 } lg={ 2 }>
                <div
                  className={ styles.imageBox }
                  style={ { background: `url(${item.src}) center / cover no-repeat` } }
                >
                  <Icon
                    id={ item.id }
                    type="eye-o"
                    onClick={ this.handleViewImage(item.src) }
                  />
                  <Icon
                    type="delete"
                    onClick={ this.handleDeleteImage(item.id) }
                  />
                </div>
              </Col>
            )) }
            { imageURL &&
              <img
                id="editableImage"
                src={ imageURL }
                alt="editable-img"
                className={ styles.imageHidden }
              />
            }
          </Row>
        </Spin>
      </div>
    );
  }
}

ImagesTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadImages: PropTypes.bool.isRequired,
  // redux-base
  itemImageSaveRequest: PropTypes.func.isRequired,
  itemImagesGetRequest: PropTypes.func.isRequired,
  itemImagesDeleteRequest: PropTypes.func.isRequired,
  showErrorMessage: PropTypes.func.isRequired,
  // data
  itemId: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesTab);
