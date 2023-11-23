import React from 'react';

interface TodoItemProps {
    title: string;
    description: string;
    done: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ title, description, done }) => {
    return (
        <div className="max-w-md mx-auto mt-6 p-5 bg-gray-200 rounded">
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-700 mb-2">{description}</p>
            <p className={done ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                {done ? 'Done' : 'Not done'}
            </p>
        </div>
    );
};

export default TodoItem;