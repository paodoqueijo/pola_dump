import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore } from '../firebase/config';
import firebase from 'firebase/app';

function useStorage(files, page) {
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const pageRef = projectFirestore.collection('root').doc(page);

    files.map(async (img) => {
      const storageRef = projectStorage.ref(img.name);
      storageRef.put(img).on('state_changed', () => { },
        function error(err) {
          setError(err);
        },
        async function complete() {
          setProgress(progress => progress + 1);
          let url = await storageRef.getDownloadURL();
          await pageRef.set({ images: firebase.firestore.FieldValue.arrayUnion({ imgName: img.name, origUrl: url }) }, { merge: true });
        });
    });
  }, [files, page]);

  return { error, progress };
}

export default useStorage;

