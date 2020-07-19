/* eslint-disable jsx-a11y/anchor-is-valid */
import {Link} from 'react-router-dom';
import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { useSelector, connect } from "react-redux";
import {logoutUser} from '../../../redux/users/user.actions'
const Upload = require('../../../assets/images/upload.png');


function RightMenu(props) {
  const user = useSelector(state => state.user)
  //console.log(user.currentUser)

  //console.log(user)
    if(user.isAuth === true) {
      return (
        <Menu mode={props.mode}>
          <Menu.Item key="create">
            <Link to="/upload"><img src={Upload} alt="Upload" /></Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <div onClick={props.logout}>Logout</div>
          </Menu.Item>
        </Menu>
      )
    }
    else {
      return (
        <Menu mode={props.mode}>
          <Menu.Item key="mail">
            <Link to="/login">Signin</Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to="/register">Signup</Link>
          </Menu.Item>
        </Menu>
      )
    } 
} 
const mapDispatchToProps = dispatch => ({
  logout: user => dispatch(logoutUser())
  //whatever we passed in dispatch(whatever) redux pass it as action object as action.payload
})

export default connect(null, mapDispatchToProps)(withRouter(RightMenu));

