import HomePage, { topicoLoader } from "./Pages/Home";
import { BrowserRouter, defer, Route, Routes } from 'react-router-dom'
import TopicFeed, { postLoader } from "./Pages/TopicFeed";
import MainAppBar from "./Components/AppBar";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { getTopico } from "./fetching";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: topicoLoader,
  },
  {
    path: 'topicos/:topicoId/posts',
    element: <TopicFeed/>,
    loader: postLoader,
  },
]);

function App() {

  return (

    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
