import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Config/Firebase-Config';
import { PostContext } from '../../store/postContext';
import {useHistory} from 'react-router-dom'

function Posts() {

  const[product,setProduct]=useState([])

  const{postDetails,setPostDetails}=useContext(PostContext)

  const history=useHistory()

  useEffect(async()=>{
    try{
      const postRef= collection(db,"products")
      const data=await getDocs(postRef)
      const filteredData=data.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id
      }
      
      ))
      console.log(filteredData)
      setProduct(filteredData)
      

    }catch(err){
      console.error(err);
    }

  },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            product.map((product)=>{
              return(
                
                <div
            className="card" 
            onClick={()=>{
              setPostDetails(product)
              history.push('/view')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.Price}</p>
              <span className="kilometer">{product.Category}</span>
              <p className="name"> {product.Name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>

              )
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
