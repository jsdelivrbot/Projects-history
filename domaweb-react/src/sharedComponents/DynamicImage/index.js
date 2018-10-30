import React from 'react';
import PropTypes from 'prop-types';

function DynamicImage(props) {
  return (
    <div>
      <img
        src={require(`../../assets/images/${props.folder}/${props.imgName === undefined || props.imgName === 'undefined' ? props.defaultImg : props.imgName}.svg`)}
        style={props.style}
        alt={props.alt}
        className={props.className}
      />
    </div>
  );
}

DynamicImage.propTypes = {
  folder: PropTypes.string.isRequired,
  defaultImg: PropTypes.string.isRequired,
  imgName: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  alt: PropTypes.string,
};

export default DynamicImage;
