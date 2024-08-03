import HomePage from "./Pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopicFeed from "./Pages/TopicFeed";
import MainAppBar from "./Components/AppBar";





function App() {

  return (

    <BrowserRouter>
      <MainAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<TopicFeed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
