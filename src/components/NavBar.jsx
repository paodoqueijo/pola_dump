import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import '../styles/nav-bar.scss';

function NavBar({ handleClick, projects }) {
  let location = useLocation();

  useEffect(() => {
    let links = document.querySelectorAll('li');
    let projectsLink = document.getElementById('/projects');
    links.forEach((link) => {
      if (link.id === location.pathname) {
        link.classList.add('active');
        if (link.id.split('/').includes('projects') && projectsLink) {
          projectsLink.classList.add('active');
        }
      } else {
        link.classList.remove('active');
      }

    });

  });

  return (
    <nav>
      <ul>
        <li onClick={handleClick} id="/">
          <Link to="/">Overview</Link>
        </li>
        {projects &&  <li onClick={handleClick} id="/projects">
          <Link to={`/projects/${projects[0].name}`}>Projects</Link>
          < ul className="projects-list">
            {projects.map((project, idx) => <li key={idx} onClick={handleClick} id={`/projects/${project.name}`}>
              <Link to={`/projects/${project.name}`}>{project.name}</Link>
            </li>)}
          </ul>
        </li>}

        <li onClick={handleClick} id="/about">
          <Link to="/about">About</Link>
        </li>
        <li onClick={handleClick} id="/contact">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>

  );
}

export default NavBar;