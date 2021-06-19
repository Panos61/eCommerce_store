import React, { useState } from 'react';
import '../styles/nav.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { RootState } from '../../app/store';
import { logoutUser } from '../../features/auth/actions';
import LogoutBtn from './LogoutBtn';

type Props = {
  onClick: () => void;
};

const NavBar: React.FC<Props> = ({ onClick }) => {
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'welcome' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  // Display current user state
  const dispatch = useDispatch();

  const currentState = useSelector((state: RootState) => state);

  const { isAuthenticated, user } = currentState.Auth;
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  /*** */

  const loginBtn = (
    <Menu.Menu position='right'>
      <Link to='/login'>
        <button className='login-btn'>Login</button>
      </Link>
    </Menu.Menu>
  );

  const logoutBtn = (
    <Menu.Menu position='right'>
      <LogoutBtn onClick={handleLogout} username={user && user?.username} />
    </Menu.Menu>
  );

  return (
    <>
      <Menu pointing size='large' fixed='top'>
        <Menu.Menu position='left'>
          <Link to='/'>
            <button className='mainpage-btn'>Shop</button>
          </Link>
        </Menu.Menu>

        {isAuthenticated ? logoutBtn : loginBtn}

        <Menu.Item
          name='cart'
          active={activeItem === 'cart'}
          onClick={onClick}
          icon='cart'
        ></Menu.Item>
      </Menu>
    </>
  );
};

export default NavBar;
