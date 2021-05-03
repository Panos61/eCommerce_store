import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING,
  LoginActions,
  RegisterActions,
} from './actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';
import history from '../../common/utils/history';

export function registerUser(
  email: string,
  username: string,
  password: string
) {
  const body = JSON.stringify({ email, username, password });
  return async (dispatch: Dispatch<RegisterActions>) => {
    try {
      await axios.post('http://localhost:8000/register', body);

      dispatch({ type: REGISTER_SUCCESS });
      history.push('/login');
    } catch (error) {
      console.error(error);
      dispatch({ type: REGISTER_FAIL });
    }
  };
}

export function loginUser(email: string, password: string) {
  const body = JSON.stringify({ email, password });
  return async (dispatch: Dispatch<LoginActions>) => {
    try {
      const res = await axios.post('http://localhost:8000/login', body);
      let user = res.data;
      dispatch({ type: LOGIN_SUCCESS });
      localStorage.setItem('token', user.token);
      setAuthorizationToken(user.token);
      history.push('/');
    } catch (error) {
      console.error(error);
      dispatch({ type: LOGIN_FAIL });
    }
  };
}

// Token authorization
export default function setAuthorizationToken(token: string) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
