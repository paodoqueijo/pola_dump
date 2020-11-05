import React, { useState, useEffect } from 'react';
import Login from './Login';
import EditMenu from './EditMenu';
import '../../styles/admin.scss';
import { auth } from '../../firebase/config';

function Admin({ loggedIn, setLoggedIn, about, projects }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('userLoggedIn');
        setLoggedIn(true);
        setEmail(user.email);
      } else {
        console.log('no user logged in');
        setLoggedIn(false);
        setEmail('');
      }
    });
  }, [loggedIn, setLoggedIn]);

  return (
    <section className="Admin">
      {loggedIn? <EditMenu about={about} projects={projects} /> : <Login email={email} loggedIn={loggedIn} />}
    </section>
  );
}

export default Admin;
