import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../Config/Firebase-Config';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';



import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
function Header() {
  
  
  const{user}=useContext(AuthContext)
  const history=useHistory()
  
  const moveToLogin =()=>{
    history.push('/login')
  }
  const moveToCreate =()=>{
    const loggedIn = auth.currentUser;
    if(loggedIn){
      history.push('/create')
    }else{
      history.push('/login')
    }
  }

  
  

  const logout= async()=>{
    try{
        await signOut(auth).then(()=>{
          history.push('/login')
          window.location.reload()
        })

    }catch(err){
        console.error(err)
    }
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <button onClick={moveToLogin}>
          {user? user.displayName :'Login'}
          <hr />
          
          </button>
          
        </div>
        {user&& <span onClick={logout}>Logout</span>}

        <div className="sellMenu">
          <button onClick={moveToCreate}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
