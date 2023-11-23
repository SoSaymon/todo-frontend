import React, { useEffect } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UserPanel from "./components/UserPanel";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import getCookie from "./utils/getCookie";

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
            <nav className="bg-gray-800 p-2 mt-0 w-full">
                <div className="container mx-auto flex flex-wrap items-center">
                    <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
                        <a className="text-white no-underline hover:text-white hover:no-underline" href="#">
                            Navbar
                        </a>
                    </div>
                    <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
                        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                            <li className="mr-3">
                                <Link className="inline-block py-2 px-4 text-white no-underline" to="/login">Login</Link>
                            </li>
                            <li className="mr-3">
                                <Link className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" to="/register">Register</Link>
                            </li>
                            <li className="mr-3">
                                <Link className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" to="/user">User Panel</Link>
                            </li>
                            <li className="mr-3">
                                <Link className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" to="/todos">Todos</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mx-auto mt-3 flex-grow">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/user" element={<UserPanel />} />
                    <Route path="/todos" element={<><AddTodo refetch={refetch} /><TodoList /></>} />
                </Routes>
            </div>
            <footer className="bg-gray-200 mt-auto py-3">
                <div className="container mx-auto flex justify-between">
                    <span className="text-muted"></span>
                    <span className="text-muted">&copy; All rights reserved, 2023. SoSaymon</span>
                    <span className="text-muted"></span>
                </div>
            </footer>
        </Router>
    );
}

export default App;