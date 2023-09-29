import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/Context';
import { storage } from '../../Config/Firebase-Config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db } from '../../Config/Firebase-Config'; 
import { addDoc, collection } from 'firebase/firestore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Create = () => {
  const [Name,setName]=useState('')
  const [Category,setCategory]=useState('')
  const [Price,setPrice]=useState('')
  const [Image,setImage]=useState(null)

  const{user}=useContext(AuthContext)

  const history=useHistory()

  const handleSubmit= async()=>{
    const imgRef = ref(storage,`image/${Image.name}`)
    const userRef=collection(db,"products")
    const date=new Date()
    try{
      await  uploadBytes(imgRef,Image).then(()=>console.log("image uploaded!!!")).then(()=>{
        getDownloadURL(imgRef).then((url)=>{
          addDoc(userRef,
            {
              Name,
              Category,
              Price,
              url,
              userid:user.uid,
              createdAt:date.toDateString()

            })
        })
      })
      }catch(err){
      console.error(err);
    }
    history.push('/')

  }



  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"
              onChange={(e)=>setPrice(e.target.value)}
            />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={Image? URL.createObjectURL(Image):""}></img>
          
            <br />
            <input type="file" 
              onChange={(e)=>{setImage(e.target.files[0])}}
            />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
