import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import axios from 'axios';
import SignUp from './components/signup/signup.component.jsx';
import SignIn from './components/login/login.component.jsx';
import UploadVideoPage from './components/videoUpload/videoUpload.component.jsx';
import LandingPage from './components/LandingPage/LandingPage'
import DetailVideoPage from './components/videoDetailPage/DetailVideoPage.component'
import SubscriptionPage from './components/subscriptionPage/subscriptionPage.component'
import './App.css';
import AuthCheck from "./hoc/authCheck";
import NavBar from './components/NavBar/NavBar';
import {auth} from './redux/users/user.actions';
import { connect } from "react-redux";
import { useEffect, useState } from 'react';
import Spinner from './components/spinner/spinner.component.jsx'

function App (props) {
  const [loading, setloading] = useState([false])
  const {setCurrentUser} = props
    useEffect(()=>{  
      axios
        .get(`/api/v1/users/auth`)
        .then(response => {
          if(response.data.isAuth === true) {
          setCurrentUser(response)
          }
        } ).then(setloading(true))
        .catch(error => console.log(error));
    },[setCurrentUser])


     if(loading === true){
      return ( 
        <div className="App">
        <NavBar/>
          <Switch>
            <Route exact path={`/login`} component={AuthCheck(SignIn, 'noAuth', false)} />
            <Route exact path={`/register`} component={AuthCheck(SignUp, 'noAuth', false)} />
            <Route exact path={`/upload`} component={AuthCheck(UploadVideoPage, 'isAuth', true)} />
            <Route exact path={`/`} component={LandingPage} />
            <Route exact path={`/video/:videoId`} component={withRouter(DetailVideoPage)} />
            <Route exact path={`/subscriptions`} component={AuthCheck(SubscriptionPage,'isAuth', true)} />
          </Switch>
        </div>
    );
    }else{
      return (
        <div className="loading">
          <Spinner/>
        </div>
      )
    }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(auth(user))
  //whatever we passed in dispatch(whatever) redux pass it as action object as action.payload
})
const mapStateToProps = (state) => ({
  currentUser: state.user
})
export default connect(mapStateToProps, mapDispatchToProps)(App);

