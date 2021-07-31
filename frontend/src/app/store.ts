import { AuthState, authReducer } from '../features/auth/reducer';
import { CartState, cartReducer } from '../features/cart/reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface RootState {
  Auth: AuthState;
  Cart: CartState;
}

export const store = createStore(
  combineReducers({
    Auth: authReducer,
    Cart: cartReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
