import { AuthState, authReducer } from '../features/auth/reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface RootState {
  auth: AuthState;
}

export const store = createStore(
  //   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  //     (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(),

  combineReducers({
    auth: authReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
