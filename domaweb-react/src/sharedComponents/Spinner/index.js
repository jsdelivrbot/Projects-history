import React from 'react';
import Lottie from 'react-lottie';
import * as spinnerData from './preloader.json';

class Spinner extends React.Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: spinnerData,
    };

    return (
      <div>
        <Lottie
          options={defaultOptions}
          height={150}
          width={150}
        />
      </div>
    );
  }
}
export default Spinner;
