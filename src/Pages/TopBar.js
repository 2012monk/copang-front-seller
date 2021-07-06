import React, { useState } from 'react';
import UserMenu from './Component/UserMenu';
import './Component/TopBar.css';

function TopBar() {
  return (
    <nav className="top__bar" style={{  zIndex: 5, width: '100%', minHeight: '25px'}}>
      <div className="menu__container">
        <div className="menu_right">
          <UserMenu mode="horizontal"/>
        </div>
      </div>
    </nav>
  )
}

export default TopBar