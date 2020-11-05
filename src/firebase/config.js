import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAH-zRQXX6X5syxIiAbrAB8HSXRd4xRtLw',
  authDomain: 'lorem-ipsum-photography.firebaseapp.com',
  databaseURL: 'https://lorem-ipsum-photography.firebaseio.com',
  projectId: 'lorem-ipsum-photography',
  storageBucket: 'lorem-ipsum-photography.appspot.com',
  messagingSenderId: '503673164250',
  appId: '1:503673164250:web:70eab1a6f3ebcfb025f0e3',
  measurementId: 'G-Q9QJQCB38K',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp, auth };
