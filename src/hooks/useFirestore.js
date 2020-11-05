import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

function useFirestore(page) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const pageRef = projectFirestore.collection('root').doc(page);

    const observer = pageRef.onSnapshot((snap) => {
      setData(snap.data());
    });
    return () => observer(); // Unsubscribing to Listener
  }, [page]);

  return { data };
}

export default useFirestore;
