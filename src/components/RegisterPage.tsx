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
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-5">Register</h2>
            <form className="flex flex-col p-5 bg-gray-200 rounded" onSubmit={handleSubmit}>
                <label className="mb-3">
                    <span className="block text-sm">Username:</span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </label>
                <label className="mb-3">
                    <span className="block text-sm">Email:</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </label>
                <label className="mb-3">
                    <span className="block text-sm">Password:</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-all duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;