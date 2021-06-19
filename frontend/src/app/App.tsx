import 'semantic-ui-css/semantic.min.css';
import { Route } from 'react-router-dom';
import { Router } from 'react-router';
import { MainPage, Login, Register } from '../pages/index';
import { Container } from 'semantic-ui-react';
import history from '../common/utils/history';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../features/auth/actions';
import { RootState, store } from './store';
import { SET_CURRENT_USER } from '../features/auth/actionTypes';

function App() {
  const dispatch = useDispatch();

  // Set current user if token exists..
  if (localStorage.token) {
    dispatch(setCurrentUser());
    store.dispatch({ type: SET_CURRENT_USER });
  }

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path='/' component={MainPage} />
        <Container>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
