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
        <div>
            <h2>User Panel</h2>
            <p>Username: {data.getUser.username}</p>
            <p>Email: {data.getUser.email}</p>
            <p>Is Active: {data.getUser.isActive ? 'Yes' : 'No'}</p>
            <p>Is Admin: {data.getUser.isAdmin ? 'Yes' : 'No'}</p>
            <p>Created At: {data.getUser.createdAt}</p>
            <p>Last Login: {data.getUser.lastLogin}</p>
        </div>
    );
};

export default UserPanel;