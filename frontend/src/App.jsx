import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Nav from "./components/Nav"
import AddProject from './components/AddProject'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import PrivateComponent from './components/PrivateComponent'
import Profile from './components/Profile'
function App() {

  return (
    <>
      <div className='min-h-screen flex flex-col'>
      <BrowserRouter>
      <Nav/>
      <main className='flex-1'>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/add" element={<AddProject/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/register" element={<SignUp/>}></Route>
      </Routes>
      </main>
      <Footer/>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
