// src/components/AddTodo.tsx
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $description: String) {
    createNote(title: $title, description: $description) {
      note {
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
  }
`;

interface AddTodoProps {
    refetch: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ refetch }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createNote] = useMutation(CREATE_NOTE);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await createNote({ variables: { title, description } });
            setTitle('');
            setDescription('');
            refetch();
        } catch (error) {
            console.error('Error creating note', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <button type="submit">Add Note</button>
        </form>
    );
};

export default AddTodo;