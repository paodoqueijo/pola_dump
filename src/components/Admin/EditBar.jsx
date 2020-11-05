import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import '../../styles/edit-bar.scss';
import UploadButton from './UploadButton';
import { useEffect } from 'react';

function EditBar({ toggleDragMode, dragMode, toggleAllTrash, deleteItems, trashAmount, undoDrag, handleSave, page }) {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctr = document.getElementById('ctr')
    if (ctr) {
      if (trashAmount === 0) {
        ctr.classList.add('invisible');
      } else {
        ctr.classList.remove('invisible');
      }
    }
  }, [trashAmount])

  function undo() {
    toggleDragMode();
    undoDrag();
  }

  return (
    <section className="EditBar">
      <div className="output-container">
        {files && <ProgressBar page={page} files={files} setFiles={setFiles} />}
        {error && <div className="error">{error}</div>}
      </div>

      <div className="upload-container">
        <UploadButton setError={setError} setFiles={setFiles} />
      </div>

      <div className="button-container">
        {dragMode ?
          <div className="drag-buttons">
            <button onClick={handleSave}><i className="fas fa-save"></i></button>
            <button onClick={undo}><i className="fas fa-undo-alt"></i></button>
          </div>
          :
          <button onClick={toggleDragMode}><i className="fas fa-pen"></i></button>
        }

        {!dragMode &&
          <div className="button-group">
            <div id="ctr" className="ctr invisible"><span>{trashAmount > 0 && trashAmount}</span></div>
            <button disabled={trashAmount === 0} onClick={deleteItems}><i className="fas fa-trash"></i></button>
            <input id="select-all" className="checkbox" type="checkbox" onChange={toggleAllTrash} />
          </div>
        }
      </div>
    </section >
  );
}

export default EditBar;