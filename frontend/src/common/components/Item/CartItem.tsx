import React from 'react';
import './styles/cart.style.css';
import { Button, Icon } from 'semantic-ui-react';
import { CartItemType } from '../../../types';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../../features/cart/actions';

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number | string) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  const dispatch = useDispatch();

  return (
    <div className='cart_layout'>
      <img src={item.image} width='100' alt='' />
      <h5>{item.title}</h5>
      {/* <h5>
      {item.price} <Icon name='euro sign' />
    </h5> */}
      <div className='cart_buttons'>
        <Button
          size='small'
          onClick={() => {
            dispatch(removeItem(item.id));
            removeFromCart(item.id);
          }}
          color='red'
        >
          -
        </Button>
        <Button
          size='small'
          onClick={() => {
            dispatch(addItem(item));
            addToCart(item);
          }}
          color='instagram'
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
