import React from 'react';
import '../../styles/upload-button.scss';

function UploadButton({ setError, setFiles }) {
  const types = ['image/jpeg', 'image/png'];

  function handleChange(e) {
    let selectedFiles = [...e.target.files];
    if (selectedFiles) {
      if (!selectedFiles.every((file) => types.includes(file.type))) {
        setFiles(null);
        setError('Please only use Images with ".jpg" or ".png" file extensions');
      } else {
        setError('');
        setFiles(selectedFiles);
      }
    }
  }

  return (<div className="UploadButton">
    <form className="upload">
      <label className="custom-upload-btn" htmlFor="upload-images"></label>
      <input name="upload-images" type="file" multiple="multiple" onChange={handleChange}></input>
    </form>

  </div>);
};

export default UploadButton;