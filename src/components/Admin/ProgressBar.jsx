import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import '../../styles/progress-bar.scss';
import Loader from 'react-loader-spinner';

function ProgressBar({ files, setFiles, page }) {
  const { error, progress } = useStorage(files, page);

  useEffect(() => {
    if (files.length === progress) {
      setTimeout(() => setFiles(null), 2500);
    }
  }, [progress, files, setFiles]);

  return (
    <div className="ProgressBar">
      <div className="symbol">
        {(progress < files.length) ? <Loader
          className="loader"
          type="Oval"
          color="rgba(0,0,0,0.6)"
          width={40}
          height={40}
        /> : <i className="far fa-check-circle"></i>}

      </div>

      <div className="message">
        {(progress < files.length) ? <span >Uploading... {progress}/{files.length} Images uploaded</span> : <span  > Success {progress}/{files.length} Images uploaded</span>
        }
        {error && <span>Something went wrong</span>}

      </div>

    </div >
  );
}

export default ProgressBar;