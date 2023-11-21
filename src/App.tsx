// src/App.tsx
import React, { useEffect } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from "./components/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage.tsx";
import UserPanel from "./components/UserPanel.tsx";
import TodoList from "./components/TodoList.tsx";
import AddTodo from "./components/AddTodo.tsx";
import getCookie from "./utils/getCookie.ts";

const REGENERATE_JWT = gql`
  mutation {
    regenerateJwt {
      token
      user {
        id
      }
    }
  }
`;

const GET_ALL_USER_NOTES = gql`
  query GetAllUserNotes($userId: Int!) {
    getAllUserNotes(userId: $userId) {
      id
      title
      description
      done
      createdAt
      updatedAt
    }
  }
`;

const App: React.FC = () => {
    const [regenerateJwt] = useMutation(REGENERATE_JWT);

    useEffect(() => {
        const userId = getCookie('user_id');
        if (userId) {
            regenerateJwt().then(({ data }) => {
                document.cookie = `jwt_token=${data.regenerateJwt.token}; max-age=${7 * 24 * 60 * 60}; SameSite=None; Secure`;
                document.cookie = `user_id=${data.regenerateJwt.user.id}; max-age=${7 * 24 * 60 * 60}; SameSite=None; Secure`;
            });
        }
    }, [regenerateJwt]);

    const userId = getCookie('user_id');
    if (!userId) {
        throw new Error('User ID not found in cookies');
    }
    const { refetch } = useQuery(GET_ALL_USER_NOTES, {
        variables: { userId: parseInt(userId) },
    });

    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/user">User Panel</Link>
                        </li>
                        <li>
                            <Link to="/todos">Todos</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/user" element={<UserPanel />} />
                    <Route path="/todos" element={<><AddTodo refetch={refetch} /><TodoList /></>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;