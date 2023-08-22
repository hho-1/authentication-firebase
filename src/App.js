
import { useEffect, useState } from 'react';
import './App.css';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth, signInWithGoogle} from './firebase-config.js'


function App() {

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {        //Bunu alttaki gibi useEffect disina yazarsan sonsuz döngüye giriyor, onun icin bu satirdaki gibi calistir
      setUser(currentUser)
    })
  }, [user])
  
  /* onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  }) */

  const register = async () => {
    
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }
  const logout = async () => {
    await signOut(auth)
  }

  return (
    <div className="App text-center mt-5 container bg-body-secondary p-5">

      <div className='p-4'>
        <h3>Register User</h3>
        <input placeholder='Email...' className='border-1 rounded-1 p-2 w-25 me-2' onChange={(event) => {setRegisterEmail(event.target.value)}}/>
        <input placeholder='Password...' className='border-1 rounded-1 p-2 me-2' onChange={(event) => {setRegisterPassword(event.target.value)}}/>
        <button className='btn btn-lg btn-info' onClick={register}>Create User</button>
      </div>

      <div className='mt-5 mb-5'>
        <h3>Login</h3>
        <input placeholder='Email...' className='border-1 rounded-1 p-2 w-25 me-2' onChange={(event) => {setLoginEmail(event.target.value)}}/>
        <input placeholder='Password...' className='border-1 rounded-1 p-2 me-2' onChange={(event) => {setLoginPassword(event.target.value)}}/>
        <button className='btn btn-lg btn-success me-2' onClick={login}>Login</button>
        <button className='btn btn-lg btn-danger' onClick={signInWithGoogle}>Login with Google</button>
      </div>

      <h4>User Logged In: </h4>
      {user?.email}
      <button className='btn btn-lg btn-warning' onClick={logout}>Sign Out</button>
      {/* <h5>{localStorage.getItem("name")}</h5>
      <h5>{localStorage.getItem("email")}</h5>
      <h5>{localStorage.getItem("profilePic")}</h5> */}
    </div>
  );
}

export default App;
