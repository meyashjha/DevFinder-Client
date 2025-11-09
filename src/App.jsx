
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Feed from './components/Feed'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import ErrorPage from './components/ErrorPage'
import Profile from './components/Profile'
import MyConnections from './components/MyConnections'
import MyRequests from './components/MyRequests'
import Signup from './components/Signup'
import useUser from './hooks/useUser'
import Chat from './components/Chat'

function AppRoutes() {
  useUser(); // Fetch user on app load
  
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar/>
      <main className="flex-1">
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
            <Route path='/' element={<Feed/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='*' element={<ErrorPage/>} />
            <Route path='/connections' element={<MyConnections/>}/>
            <Route path='/requests' element={<MyRequests/>}/>
            <Route path='/chat/:id' element={<Chat/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

function App() {
  
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
