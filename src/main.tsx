import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './tailwind.css'
import './App.css'
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'https://todo-graphql-backend.vercel.app/',
});

const authLink = setContext((_, { headers }) => {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwt'));
    const token = jwtCookie ? jwtCookie.split('=')[1] : null;

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
