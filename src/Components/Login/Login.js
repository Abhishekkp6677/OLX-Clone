import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { auth } from '../../Config/Firebase-Config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function Login() {
  const[Email,setEmail]=useState('')
  const[Password,setPassword]=useState('')

  const history=useHistory()

  const handleLogin=async (e)=>{
    e.preventDefault()
    try{
      await signInWithEmailAndPassword(auth,Email,Password).then(()=>{
        history.push('/')
      })
    }catch(err){
      alert(err.message)
    }

  }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
