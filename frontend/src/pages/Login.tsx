import React, { useState } from 'react';
import '../pages/styles/login.style.css';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { loginUser } from '../features/auth/actions';
import { useDispatch } from 'react-redux';

interface FormValues {
  email: string;
  username: string;
  password: string;
}

interface Props {
  onSubmit: (values: FormValues) => void;
}

const Login: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const { email, password } = input;

  const onChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    dispatch(loginUser(email, password));
    e.preventDefault();
  };

  return (
    <div className='form-container' onSubmit={handleSubmit}>
      <Form noValidate>
        <h2>Login to your account</h2>
        <Form.Field>
          <label>Email</label>
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={(e) => onChange(e)}
            value={email}
          />
        </Form.Field>

        <Form.Field>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={(e) => onChange(e)}
            value={password}
          />
        </Form.Field>
        <p>
          By logging in, you agree to the{' '}
          <a href='/login' style={{ textDecoration: 'underline' }}>
            Terms and Conditions
          </a>
        </p>

        <Button type='submit' color='brown'>
          Login
        </Button>

        <p>
          First time user? <Link to='/register'>Create an account.</Link>{' '}
        </p>
      </Form>
    </div>
  );
};

export default Login;
