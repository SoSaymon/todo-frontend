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
        <form className="max-w-md mx-auto mt-10 p-5 bg-gray-200 rounded" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-3 border border-gray-300 rounded"
                placeholder="Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-3 border border-gray-300 rounded"
                placeholder="Description"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300"
            >
                Add Note
            </button>
        </form>
    );
};

export default AddTodo;