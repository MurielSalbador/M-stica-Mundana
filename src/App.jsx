import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/header/Header'
import Home from "./components/Home/Home"

import './App.css'

function App() {

  return (
    <>
      <Header />

         <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </>

  )
}

export default App
