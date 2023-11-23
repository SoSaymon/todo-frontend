import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const EDIT_NOTE = gql`
  mutation EditNote($noteId: Int!, $title: String, $description: String, $done: Boolean) {
    editNote(noteId: $noteId, title: $title, description: $description, done: $done) {
      note {
        id
        title
        description
        done
      }
    }
  }
`;

interface EditTodoProps {
    noteId: number;
    initialTitle: string;
    initialDescription: string;
    initialDone: boolean;
}

const EditTodo: React.FC<EditTodoProps> = ({ noteId, initialTitle, initialDescription, initialDone }) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [done, setDone] = useState(initialDone);
    const [editNote] = useMutation(EDIT_NOTE);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await editNote({ variables: { noteId, title, description, done } });
        } catch (error) {
            console.error('Error editing note', error);
        }
    };

    return (
        <form className="max-w-md mx-auto mt-6 p-5 bg-gray-200 rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="block text-sm mb-1">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm mb-1">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm mb-1">
                    <input
                        type="checkbox"
                        checked={done}
                        onChange={(e) => setDone(e.target.checked)}
                        className="mr-2"
                    />
                    Done
                </label>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300"
            >
                Edit Note
            </button>
        </form>
    );
};

export default EditTodo;