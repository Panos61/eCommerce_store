import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING,
  LoginActions,
  RegisterActions,
  CurrentUserState,
  SET_CURRENT_USER,
  LogoutActionState,
  LOGOUT,
} from './actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';
import history from '../../common/utils/history';

// REGISTER USER
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

// LOGIN USER
export function loginUser(email: string, password: string) {
  const body = JSON.stringify({ email, password });
  return async (dispatch: Dispatch<LoginActions | CurrentUserState>) => {
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

//SET CURRENT USER
export const setCurrentUser = () => {
  return async (dispatch: Dispatch<CurrentUserState>) => {
    try {
      let token = localStorage.getItem('token');

      const res = await axios.get('http://localhost:8000/api/v1/get-me', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      let user = res.data;
      dispatch({ type: SET_CURRENT_USER, payload: user });
    } catch (error) {
      console.error(error);
    }
  };
};

// LOGOUT USER
export const logoutUser = () => {
  return async (dispatch: Dispatch<LogoutActionState>) => {
    try {
      localStorage.removeItem('token');
      history.push('/');
      dispatch({ type: LOGOUT });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
};

// Token authorization
export default function setAuthorizationToken(token: any) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
