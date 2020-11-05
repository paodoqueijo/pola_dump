import React, {useState} from 'react';
import ImageList from './ImageList';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import EditNav from './EditNav';
import TextEdit from './TextEdit';
import AboutUploader from './AboutUploader';
import '../../styles/edit-menu.scss';
import {projectFirestore} from '../../firebase/config';

function EditMenu({ about, projects }) {
  let { path } = useRouteMatch();
  const [selectedPage, setSelectedPage] = useState();

  function deleteProject(project) {
    projectFirestore.collection('root').doc(project.name).delete().then(function() {
      console("Deleted Project!")
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  return (
    <div className="EditMenu">
      <EditNav setSelectedPage={setSelectedPage} projects={projects} />

      <h2>{selectedPage ? `Edit ${selectedPage} project` : 'Edit your pages'}</h2>

      <Switch>
        <Route exact path={`${path}/Overview`}>
          <h3>Edit Images:</h3>
          <ImageList page="Overview" />
        </Route>
        {projects &&
          projects.map((project, idx) => (
            <Route
              key={idx}
              exact
              path={`${path}/projects/${project.name.toLowerCase()}`}
            >
              <h3>Edit Images:</h3>
              <ImageList page={project.name} />
              <h3>Edit Text:</h3>
              <TextEdit page={project} />
              <button onClick={() => deleteProject(project)} className="delete">Delete this project!</button>
            </Route>
          ))}
        <Route exact path={`${path}/about`}>
          <h3>Edit Text:</h3>
          <TextEdit page={about} />
          <h3>Change About-Photo:</h3>
          <AboutUploader about={about}/>
        </Route>
      </Switch>
    </div>
  );
}

export default EditMenu;
