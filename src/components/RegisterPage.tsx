import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $username: String!) {
    registerUser(email: $email, password: $password, username: $username) {
      user {
        id
        username
        email
      }
    }
  }
`;

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [registerUser] = useMutation(REGISTER_USER);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const { data } = await registerUser({ variables: { email, password, username } });
            console.log(data.registerUser.user);
        } catch (error) {
            console.error('Error registering', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterPage;