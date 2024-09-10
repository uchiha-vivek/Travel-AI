import {FC} from 'react'
import LandingPage from './pages/landing-page'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/register-login-page'
import RegisterPageFirebase from './pages/register-page'
import TravelQuery from './pages/travel-query'
import LoginPage from './pages/login-page'




const App : FC = () => {

  return (

    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/auth' element={<Register/>}  />
      <Route path='/register' element={<RegisterPageFirebase/>}/>
      <Route path='/travel' element = {<TravelQuery/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
    </>
  )
}
export default App