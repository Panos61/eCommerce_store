import React from 'react';
import { Icon } from 'semantic-ui-react';
import CartItem from './Item/CartItem';
import { CartItemType } from '../../types';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number | string) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculatePrice = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <div>
      <h3>
        Your cart <Icon name='cart' />
      </h3>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>
        {calculatePrice(cartItems).toFixed(2)} <Icon name='euro sign' />
      </h2>
    </div>
  );
};

export default Cart;
