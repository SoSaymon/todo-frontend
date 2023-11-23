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
        <div className="p-5 bg-gray-200 rounded w-96 mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-5">Login</h2>
            <form className="flex flex-col" onSubmit={handleSubmit}>
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
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300"
                >
                    Log in
                </button>
            </form>
        </div>
    );
};

export default LoginPage;