import React, { useState } from 'react';
import { auth } from '../../Config/Firebase-Config';
import { createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { db } from '../../Config/Firebase-Config'; 
import { addDoc, collection } from 'firebase/firestore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Signup() {


    const [Username,setUsername]=useState('')
    const [Email,setEmail]=useState('')
    const [Number,setNumber]=useState('')
    const [Password,setPassword]=useState('')

    const userRef=collection(db,"users")
    const history=useHistory()

  const handleSignin = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, Email, Password).then(()=>{
        addDoc(userRef,{id:auth.currentUser.uid,
        username:Username,
        phone_number:Number
        })
      }).then(()=>{
        updateProfile(auth.currentUser, { displayName:Username,
          phoneNumber:Number })
      }).then(()=>{
        history.push("/login")
      })
    } catch (err) {
      console.error(err)

    }
    // console.log(Number)
  }



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSignin}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            onChange={(e)=>setUsername(e.target.value)}
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            onChange={(e)=>setNumber(e.target.value)}
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
          <button>Signup</button>
        </form>
        <a><Link to={"/login"}>Login</Link></a>
      </div>
    </div>
  );
}
