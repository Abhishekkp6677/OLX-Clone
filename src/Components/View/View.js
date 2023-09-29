import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/postContext';
import { db } from '../../Config/Firebase-Config';
import { collection,  doc,  getDocs, query, where } from 'firebase/firestore';


function View() {
  const[userDetails,setUserDetails]=useState([])
  const{postDetails,setPostDetails}=useContext(PostContext)

  
  useEffect(async()=>{
    
    
    try{
      
      const{userid}= postDetails
      const usersRef = collection(db, "users");
      const q= query(usersRef, where("id", "==", userid))
      const querySnapshot = await getDocs(q);
       querySnapshot.forEach((docs)=>{
        setUserDetails( docs.data())
       })

      

       
      
      
      
     
   }catch(err){
     console.error(err);
   }
     
   
    

  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.Price} </p>
          <span>{postDetails.Name}</span>
          <p>{postDetails.Category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails&& <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone_number}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
