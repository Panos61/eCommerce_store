import React, { useState } from 'react';
import './styles/main.style.css';
import { useQuery } from 'react-query';
import { CartItemType } from '../types';
import Item from '../common/components/Item/Item';
import { Grid, Loader, Menu, Sidebar } from 'semantic-ui-react';
import Cart from '../common/components/Cart';
import NavBar from './components/NavBar';

const getAllProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('http://fakestoreapi.com/products')).json();

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const MainPage: React.FC<Props> = () => {
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
      {/* NAV BAR */}
      <NavBar onClick={handleShow} />
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
