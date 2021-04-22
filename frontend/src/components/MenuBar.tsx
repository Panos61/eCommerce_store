import React, { SetStateAction, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuBar: React.FC<{}> = () => {
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'welcome' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { name }: SetStateAction<any>
  ) => setActiveItem(name);

  return (
    <Menu pointing size='large' color='brown' fixed='top'>
      <Menu.Item
        name='shop'
        active={activeItem === 'shop'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />

      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='cart'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
          icon='cart'
        />
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;
