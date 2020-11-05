import React from 'react';
import { Link } from 'react-router-dom';
import camera from '../images/camera.svg';

function Header() {
  return (
    <header>
      <h1 style={{ fontWeight: 'lighter' }}>
        <Link to="/">
          Polaroid
          <br />
          Dump{' '}
          <img className="camera" src={camera} alt="camera" width="40px"></img>
        </Link>
      </h1>
    </header>
  );
}

export default Header;
