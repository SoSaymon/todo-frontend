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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="checkbox"
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
            />
            <button type="submit">Edit Note</button>
        </form>
    );
};

export default EditTodo;