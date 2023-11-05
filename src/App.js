import logo from './logo.svg';
import './App.css';

import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase/firebase.init';
import { useState } from 'react';


const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user)
        setUser(user);
      }).catch((error) => {
        console.error(error)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert('signOut succefully')
        setUser({});
      })
      .catch((error) => {
        console.error(error)
        setUser({});
      })
  }
  const gitHubProvider = new GithubAuthProvider();
  const handleGithub = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user)
      })
      .catch(error => console.error(error))
  }

  return (
    <div className="App">
      {
        user.uid ? <button onClick={handleSignOut}>SignOut</button> :
          <><button onClick={handleSignIn}>Google SignIn</button>
            <button onClick={handleGithub}>GitHub SignIn</button>
          </>
      }
      {user.uid && <div>
        <h3>Name: {user.displayName}</h3>
        <p>email: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>}


    </div>
  );
}

export default App;
