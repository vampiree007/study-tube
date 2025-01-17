import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import {AppstoreOutlined} from '@ant-design/icons';
import './Sections/Navbar.css';
const Logo = require('../../assets/images/panda.jpg');

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
      <div className="menu__logo">
        <a href="/"><img src={Logo} alt="Logo" style={{ height: '40px', marginTop: '-5px' }} /></a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          onClick={showDrawer}
        >
        <AppstoreOutlined type="align-right" className="appstore"/>
        </Button>
        <Drawer
          title="Panda Tube"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar