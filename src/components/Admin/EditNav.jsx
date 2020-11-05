import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/edit-nav.scss';
import { auth } from '../../firebase/config';
import NewProjectModal from './NewProjectModal';

function EditNav({ projects, setSelectedPage }) {

  const [modalDisplayed, setModalDisplayed] = useState(false);

  function handlePageSelect(pageName) {
    setSelectedPage(pageName);
    document.querySelector('.lower-bar').classList.toggle('invisible');
  }

  function toggleEditNav() {
    document.querySelector('.lower-bar').classList.toggle('invisible');
  }

  const logOut = () => {
    auth.signOut().then(() => {
      console.log('User signed out!');
    });
  };

  return (
    <nav className="edit-nav">
      <div className="upper-bar">

        <div className="button-group">
          <button className="log-out" onClick={logOut}>Log Out</button>
          <button onClick={toggleEditNav}>
            <i className="fas fa-bars"></i>
          </button>
        </div>

      </div>
      <div className="lower-bar invisible">
        <ul>
          <li id="/">
            <Link
              onClick={() => handlePageSelect('Overview')}
              to="/admin/overview"
            >
              Overview
            </Link>
          </li>
          <li id="/projects">
          {projects?

              <Link
                onClick={() => handlePageSelect(projects[0].name)}
                to={`/admin/projects/${projects[0].name.toLowerCase()}`}
              >
                Projects
              </Link>
              :
              <Link to={`/admin/projects/`}>Projects</Link>
          }
          {' '}<button onClick={() => setModalDisplayed(true)}className="add">+</button>

          {projects && <ul className="projects-list">
                {projects.map((project, idx) => (
                  <li
                    key={idx}
                    id={`/admin/projects/${project.name.toLowerCase()}`}
                  >
                    <Link
                      onClick={() => handlePageSelect(project.name)}
                      to={`/admin/projects/${project.name.toLowerCase()}`}
                    >
                      {project.name}
                    </Link>
                  </li>
                ))}
              </ul>

          }
          </li>

          <li id="/about">
            <Link onClick={() => handlePageSelect('About')} to="/admin/about">
              About
            </Link>
          </li>
        </ul>
      </div>
      {modalDisplayed && <NewProjectModal setModalDisplayed={setModalDisplayed}/>}
    </nav>
  );
}

export default EditNav;
