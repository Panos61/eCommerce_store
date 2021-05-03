import React, { useState } from 'react';
import '../pages/styles/login.style.css';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/actions';

interface FormValues {
  email: string;
  username: string;
  password: string;
}

interface Props {
  onSubmit: (values: FormValues) => void;
}

const Register: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: '',
    username: '',
    password: '',
  });

  const { email, username, password } = input;

  const onChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    dispatch(registerUser(email, username, password));
    e.preventDefault();
  };

  return (
    <div className='form-container' onSubmit={handleSubmit}>
      <Form noValidate>
        <h2>Create an account</h2>
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
          <label>Username</label>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={(e) => onChange(e)}
            value={username}
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
          By signing up, you agree to the{' '}
          <a href='/login' style={{ textDecoration: 'underline' }}>
            Terms and Conditions
          </a>
        </p>

        <Button type='submit' color='brown'>
          Sign up
        </Button>

        <p>
          Already have an account? <Link to='/login'>Login.</Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
