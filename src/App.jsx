import HomePage, { topicoLoader } from "./Pages/Home";
import { BrowserRouter, defer, Route, Routes } from 'react-router-dom'
import TopicFeed, { postLoader } from "./Pages/TopicFeed";
import MainAppBar from "./Components/AppBar";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createContext, useState } from "react";
import ErrorPage from "./Components/ErrorPage";

export const UserContext = createContext();


const router = createBrowserRouter([
  {
  path: "/",
  element: <MainAppBar/>,
  errorElement: <ErrorPage />,
  children:[{
    path: "/",
    element: <HomePage />,
    loader: topicoLoader,
  },
  {
    path: 'topicos/:topicoId/posts',
    element: <TopicFeed/>,
    
    loader: postLoader,
  },
]}]);

function App() {
  const [user,setUser] = useState()
  return (

    <>
      <UserContext.Provider value={[user,setUser]}>
      <RouterProvider router={router} />  
      </UserContext.Provider>
    </>
  )
}

export default App
