import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { Home, Login, Register, Account } from './pages'
import PrivateRoutes from './components/PrivateRouter'
import CheckUser from './components/CheckUser'

const App = () => {
  return (
    <div className='max-w-7xl'>
      <Navbar />
      <div className='bg-gray-100'>
        <Routes>
          {/* Route to direct user when already authenticated */}
          <Route element={<CheckUser />}>
            <Route path='/signin' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          {/* Private route for unauth user */}
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/account' element={<Account />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
