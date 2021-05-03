export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOADING = 'LOADING';

type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;
type LOGIN_FAIL = typeof LOGIN_FAIL;

export interface LoginSuccessAction {
  type: LOGIN_SUCCESS;
}

export interface LoginFailureAction {
  type: LOGIN_FAIL;
}

export type LoginActions = LoginSuccessAction | LoginFailureAction;

type REGISTER_SUCCESS = typeof REGISTER_SUCCESS;
type REGISTER_FAIL = typeof REGISTER_FAIL;

export interface RegisterSuccessAction {
  type: REGISTER_SUCCESS;
}

export interface RegisterFailureAction {
  type: REGISTER_FAIL;
}

export type RegisterActions = RegisterSuccessAction | RegisterFailureAction;
