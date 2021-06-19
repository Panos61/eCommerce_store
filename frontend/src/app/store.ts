import { AuthState, authReducer } from '../features/auth/reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface RootState {
  Auth: AuthState;
}

export const store = createStore(
  combineReducers({
    Auth: authReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
