import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import Layout from './components/Layout/Layout';

function App() {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <h1>Not found</h1>,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/details/:id",
          element: <Details />,
        },
      ],
    },
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
