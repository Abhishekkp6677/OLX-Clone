import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router,Route } from 'react-router-dom/cjs/react-router-dom.min';
import Post from './store/postContext';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import CreatePage from './Pages/Create'; 
import Viewpost from './Pages/ViewPost'

import { AuthContext } from './store/Context';
import { auth } from './Config/Firebase-Config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const{setUser}=useContext(AuthContext)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if (user){
        setUser(user)
        // console.log(user)
      }
    })
    
  })

  return (
    <div>
      <Post>

      <Router>

        <Route exact path="/">
          <Home/>
        </Route>

        <Route  path="/signup">
          <SignupPage/>
        </Route>

        <Route  path="/login">
          <LoginPage/>
        </Route>

        <Route  path="/create">
          <CreatePage/>
        </Route>

        <Route  path="/view">
          <Viewpost/>
        </Route>

      </Router>
    
      </Post>
    </div>
  );
}

export default App;
