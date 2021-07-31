import { ADD_ITEM, REMOVE_ITEM, PROCEED_TO_PAYMENT } from './actionTypes';
import { Dispatch } from 'redux';
import { CartItemType } from '../../types';
import { Item } from 'semantic-ui-react';

export const addItem = (item: CartItemType) => {
  return (dispatch: Dispatch) => {
    try {
      dispatch({ type: ADD_ITEM, payload: item });
      //localStorage.setItem('item', JSON.stringify([item] as any));
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeItem = (index: string | number) => {
  return (dispatch: Dispatch) => {
    try {
      console.log(index);
      dispatch({ type: REMOVE_ITEM, payload: index });
    } catch (error) {
      console.error(error);
    }
  };
};
