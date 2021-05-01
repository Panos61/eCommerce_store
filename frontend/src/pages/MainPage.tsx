import React, { SetStateAction, useState } from 'react';
import './styles/main.style.css';
import { useQuery } from 'react-query';
import { CartItemType } from '../types';
import Item from '../common/components/Item/Item';
import { Grid, Loader, Menu, Sidebar } from 'semantic-ui-react';
import Cart from '../common/components/Cart';
import { Link } from 'react-router-dom';

const getAllProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('http://fakestoreapi.com/products')).json();

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const MainPage: React.FC<Props> = () => {
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'welcome' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { name }: SetStateAction<any>
  ) => setActiveItem(name);

  // Toggle sidebar
  const [cartOpen, setCartOpen] = useState(false);

  const handleShow = () => {
    setCartOpen(true);
  };

  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  // Add to cart function
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev: any) => {
      const isItemInCart = prev.find(
        (item: CartItemType) => item.id === clickedItem.id
      );

      if (isItemInCart) {
        return prev.map((item: CartItemType) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  // Remove from the cart function
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getAllProducts
  );
  if (isLoading) return <Loader inverted size='large' content='Loading' />;
  if (error) return <h2>Error loading data..</h2>;
  console.log(data);

  return (
    <>
      {/* MENU BAR */}
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
            active={activeItem === 'cart'}
            onClick={handleShow}
            icon='cart'
          />
        </Menu.Menu>
      </Menu>

      {/* SIDEBAR */}
      <Grid columns={1}>
        <Grid.Column>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            direction='right'
            onHide={() => setCartOpen(false)}
            vertical
            visible={cartOpen}
            width='wide'
          >
            <Menu.Item>
              <Cart
                cartItems={cartItems}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
              />
            </Menu.Item>
          </Sidebar>
        </Grid.Column>
      </Grid>

      {/* **** */}
      <div className='main_page'>
        {data?.map((item) => (
          <div key={item.id}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MainPage;
