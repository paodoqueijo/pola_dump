import React, { useState, useRef, useEffect} from 'react';
import {projectFirestore} from '../../firebase/config';
import '../../styles/modal.scss';


function NewProjectModal({ setModalDisplayed}) {
  const [projectName, setProjectName] = useState("");
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  },[inputRef])



  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setModalDisplayed(null);
    }
  };

  function createNewProject(e) {
    e.preventDefault();
    if(projectName !== "") {
    console.log("Im in here");
    projectFirestore.collection('root').doc(projectName).set({
      images: [],
      test: "",
      title: ""
    }).then(function() {
      setProjectName("");
      setModalDisplayed(false);
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  }

  return (
    <div onClick={handleClick} className="backdrop" id="modal">
      <form>
        <label>
          Choose a new project name
          <input ref={inputRef} onChange={(e) => setProjectName(e.target.value)} value={projectName} type="text"></input>
        </label>
        <button onClick={createNewProject}>Create</button>
      </form>
    </div>
  );
}

export default NewProjectModal;