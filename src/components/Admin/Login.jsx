import React, { useState } from 'react';
import { auth } from '../../firebase/config';
import '../../styles/login.scss';


function Login({ loggedIn, email }) {
  const [emailInput, setEmailInput] = useState('');
  const [pwInput, setPwInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Tried to login as email: ${emailInput}, pw; ${pwInput}`);
    auth.signInWithEmailAndPassword(emailInput, pwInput).then((cred) => {
      setEmailInput('');
      setPwInput('');
    });
  };

  return (
    <section className="Login">

      {!loggedIn && (
        <form onSubmit={handleSubmit} id="login-form">
          <h2>Log in to make changes to the page!</h2>
          <label>
            Email
            <input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              type="email"
            />
          </label>
          <label>
            Password
            <input
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              type="password"
            />
          </label>
          <button>Login</button>
        </form>
      )}
    </section>
  );
}

export default Login;
