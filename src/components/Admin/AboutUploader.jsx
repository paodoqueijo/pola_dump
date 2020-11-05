import React, { useState, useEffect} from 'react';
import { projectStorage, projectFirestore } from '../../firebase/config';
import '../../styles/about-uploader.scss';

function AboutUploader({about}) {
  const types = ['image/jpeg', 'image/png'];
  const [file,setFile] = useState(null);
  const [setError] = useState(null);

  useEffect(() => {
    console.log('no file');

    if(file){
      console.log("file changed");
      const pageRef = projectFirestore.collection('root').doc('About');
      const storageRef = projectStorage.ref(file.name);
      storageRef.put(file).on('state_changed', () => { },
        function error(err) {
          setError(err);
          setFile(null);
        },
        async function complete() {
          console.log("Upload to Storage worked");

          let url = await storageRef.getDownloadURL();

          const itemsToDelete = [
            about.imageName,
            `thumb@64_${about.imageName}`,
            `thumb@512_${about.imageName}`,
          ];

          await Promise.all(itemsToDelete.map((itemName) => projectStorage.ref(itemName).delete()
          ));

          await pageRef.set({ image: url, imageName: file.name }, { merge: true });

          setFile(null);
      });
    }

  }, [file]);

  function handleChange(e) {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!types.includes(selectedFile.type)) {
        setFile(null);
        setError('Please only use Images with ".jpg" or ".png" file extensions');
      } else {
        setFile(selectedFile);
      }
    }
  }

  return (
  <section className="about-uploader">

    <div className="img-display">
      <img src={about.image} alt="portrait"></img>
      <h4>{about.imageName}</h4>
    </div>


    <div className="UploadButton">
      <form className="upload">
        <label className="custom-upload-btn" htmlFor="upload-images"></label>
        <input name="upload-images" type="file" multiple="multiple" onChange={handleChange}></input>
      </form>
    </div>
  </section>

);
};

export default AboutUploader;