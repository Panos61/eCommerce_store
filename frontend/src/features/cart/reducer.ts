import { ADD_ITEM, REMOVE_ITEM, PROCEED_TO_PAYMENT } from './actionTypes';
import { AnyAction } from 'redux';
import { CartItemType } from '../../types';

export interface CartState {
  items: CartItemType[];
}

export const initialState = {
  items: [],
};

export const cartReducer = (
  state: CartState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case REMOVE_ITEM:
      const numIndex = parseInt(action.payload);
      console.log(numIndex);
      return {
        //...state,
        //items: [...state.items.filter((item) => item.id !== action.payload)],
        items: [
          ...state.items.slice(0, numIndex),
          ...state.items.slice(numIndex + 1),
        ],
      };

    default:
      return state;
  }
};

export default cartReducer;
