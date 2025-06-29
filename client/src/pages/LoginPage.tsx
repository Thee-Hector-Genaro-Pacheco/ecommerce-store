// client/src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ AuthContext only
import '../styles/Auth.css';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        profilePicture
        isAdmin
        age
        gender
        phone
        country
        address {
          street
          apartment
          city
          state
          zipCode
        }
      }
    }
  }
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();        // use AuthContext here

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });

      if (data?.loginUser?.token && data?.loginUser?.user) {
        // Save token and user in localStorage
        localStorage.setItem('token', data.loginUser.token);
        localStorage.setItem('user', JSON.stringify(data.loginUser.user));
        console.log("✅ User returned from loginUser mutation:", data.loginUser.user);

        // Update context state
        setUser(data.loginUser.user);

        console.log('✅ Logged in user:', data.loginUser.user);
        navigate('/');
      }
    } catch (err) {
      console.error('❌ Login failed:', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log In</button>

        {error && <p style={{ color: 'red' }}>Invalid credentials</p>}

        <p>
          Don&apos;t have an account?{' '}
          <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;