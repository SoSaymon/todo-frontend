import React from 'react';
import { useQuery, gql } from '@apollo/client';
import getCookie from '../utils/getCookie.ts';

const GET_USER = gql`
  query GetUser($id: Int!) {
    getUser(userId: $id) {
      id
      username
      email
      isActive
      isAdmin
      createdAt
      lastLogin
    }
  }
`;

const UserPanel: React.FC = () => {
    const userId = getCookie('user_id')
    if (!userId) {
        throw new Error('User ID not found in cookies');
    }
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id: parseInt(userId) },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-gray-200 rounded">
            <h2 className="text-2xl font-bold mb-3">User Panel</h2>
            <p className="mb-1">Username: {data.getUser.username}</p>
            <p className="mb-1">Email: {data.getUser.email}</p>
            <p className="mb-1">Is Active: {data.getUser.isActive ? 'Yes' : 'No'}</p>
            <p className="mb-1">Is Admin: {data.getUser.isAdmin ? 'Yes' : 'No'}</p>
            <p className="mb-1">Created At: {data.getUser.createdAt}</p>
            <p>Last Login: {data.getUser.lastLogin}</p>
        </div>
    );
};

export default UserPanel;