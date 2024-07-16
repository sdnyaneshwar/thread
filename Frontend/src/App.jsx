import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignupCard from './components/SignupCard'
import LoginCard from './components/LoginCard'
import AuthPage from './pages/AuthPage'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <Header/>
    <Routes>
      <Route path='/auth' element={<AuthPage />} />
    </Routes>
  </>


  )
}

export default App
