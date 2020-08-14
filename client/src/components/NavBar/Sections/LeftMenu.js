import React from 'react';
import { Menu } from 'antd';
import {useSelector} from 'react-redux';
import SearchBar from './searchBar.component'

function LeftMenu(props) {
  const user = useSelector(state => state.user.currentUser);

  return (
    <Menu mode={props.mode}>
        <SearchBar/>
    </Menu>
  )
}

export default LeftMenu

   /* <Menu.Item key="subscription">
      {user !==null ? <Link to="/subscriptions">Subscriptions</Link>: null}
    </Menu.Item> */