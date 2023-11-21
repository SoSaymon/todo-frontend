import React from 'react';

interface TodoItemProps {
    title: string;
    description: string;
    done: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ title, description, done }) => {
    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{done ? 'Done' : 'Not done'}</p>
        </div>
    );
};

export default TodoItem;