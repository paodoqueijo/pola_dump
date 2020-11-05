import React from 'react';
import Header from './Header';
import NavBar from './NavBar';

import '../styles/header-nav.scss';

function HeaderNav({ projects }) {

  function handleClick(e) {
    e.preventDefault();
    document.querySelector('.header-nav').classList.toggle('folded');
  }
  return (
    <div className="header-nav folded">
      <button className="unfold-btn" onClick={handleClick}></button>
      <Header />
      <NavBar projects={projects} handleClick={handleClick} />
    </div>
  );
}

export default HeaderNav;