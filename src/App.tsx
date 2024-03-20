
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landingpage from './pages/LandingPage'
import MyPage from './pages/MyPage'


function App() {


  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage/>}></Route>
          <Route path="/mypage" element={<MyPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
