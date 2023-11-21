import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser] = useMutation(LOGIN_USER);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const { data } = await loginUser({ variables: { email, password } });

            // Save the JWT token in a cookie that expires after 7 days
            document.cookie = `jwt_token=${data.loginUser.token}; max-age=${7 * 24 * 60 * 60}; SameSite=None; Secure`;

            // Save the user id in a cookie that expires after 7 days
            document.cookie = `user_id=${data.loginUser.user.id}; max-age=${7 * 24 * 60 * 60}; SameSite=None; Secure`;
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Log in</button>
        </form>
    );
};

export default LoginPage;