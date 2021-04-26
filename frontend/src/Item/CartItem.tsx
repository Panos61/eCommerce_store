import React from 'react';
import './styles/cart.style.css';
import { Button, Icon } from 'semantic-ui-react';
import { CartItemType } from '../types';

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <div className='cart_layout'>
    <img src={item.image} width='100' alt='' />
    <h5>{item.title}</h5>
    <h5>
      {item.price} <Icon name='euro sign' />
    </h5>
    <div className='cart_buttons'>
      <Button size='small' onClick={() => removeFromCart(item.id)} color='red'>
        -
      </Button>
      <Button size='small' onClick={() => addToCart(item)} color='instagram'>
        +
      </Button>
    </div>
  </div>
);

export default CartItem;
