import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_NOTE = gql`
  mutation DeleteNote($noteId: Int!) {
    deleteNote(noteId: $noteId) {
      success
    }
  }
`;

interface DeleteTodoProps {
    noteId: number;
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ noteId }) => {
    const [deleteNote] = useMutation(DELETE_NOTE);

    const handleDelete = async () => {
        try {
            await deleteNote({ variables: { noteId } });
        } catch (error) {
            console.error('Error deleting note', error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all duration-300"
        >
            Delete Note
        </button>
    );
};

export default DeleteTodo;