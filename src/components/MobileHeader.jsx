import React from 'react';
import { Link } from 'react-router-dom';
import camera from '../images/camera.svg';

function MobileHeader() {
  return (
    <header id="mobile-header" className="mobile">
      <h1>
        <Link to="/">
          Polaroid Dump{' '}
          <img className="camera" src={camera} alt="camera" width="40px"></img>
        </Link>
      </h1>
    </header>
  );
}

export default MobileHeader;
