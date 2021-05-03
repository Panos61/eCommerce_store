import { AnyAction } from 'redux';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING,
} from './actionTypes';

interface User {
  id: number;
  email: string;
  username: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  //currentUser?: User;
  user?: User;
  isLoading: boolean;
}

export const initialState = {
  isAuthenticated: localStorage.getItem('token') != null,
  user: undefined,
  isLoading: false,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
      };
    // case SET_CURRENT_USER:
    //   return {
    //     ...state,
    //     user: action.payload,
    //     isAuthenticated: !isEmpty(action.payload),
    //     isLoading: false,
    //   };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default authReducer;
