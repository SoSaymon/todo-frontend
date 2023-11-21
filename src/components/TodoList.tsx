// src/components/TodoList.tsx
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import TodoItem from './TodoItem.tsx';
import EditTodo from './EditTodo.tsx';
import DeleteTodo from './DeleteTodo.tsx';
import AddTodo from './AddTodo.tsx';
import getCookie from '../utils/getCookie.ts';

const GET_ALL_USER_NOTES = gql`
  query GetAllUserNotes($userId: Int!) {
    getAllUserNotes(userId: $userId) {
      id
      title
      description
      done
      createdAt
      updatedAt
      owner {
        id
        username
        email
        isActive
        isAdmin
        createdAt
        lastLogin
      }
    }
  }
`;

interface Note {
    id: number;
    title: string;
    description: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
    owner: {
        id: number;
        username: string;
        email: string;
        isActive: boolean;
        isAdmin: boolean;
        createdAt: string;
        lastLogin: string;
    };
}

const TodoList: React.FC = () => {
    const userId = getCookie('user_id');
    if (!userId) {
        throw new Error('User ID not found in cookies');
    }
    const { loading, error, data, refetch } = useQuery(GET_ALL_USER_NOTES, {
        variables: { userId: parseInt(userId) },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <AddTodo refetch={refetch} />
            {data.getAllUserNotes.map((note: Note) => (
                <div key={note.id}>
                    <TodoItem title={note.title} description={note.description} done={note.done} />
                    <EditTodo noteId={note.id} initialTitle={note.title} initialDescription={note.description} initialDone={note.done} />
                    <DeleteTodo noteId={note.id} />
                </div>
            ))}
        </div>
    );
};

export default TodoList;