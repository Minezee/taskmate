import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { Home, Login, Register, AddNote, ViewNote, Error, Todo, Favorite } from './pages'
import PrivateRoutes from './Routes/PrivateRouter';
import CheckUser from './Routes/CheckUser';

const App = () => {
  return (
    <div className=''>
      <div>
        <Routes>
          {/* Route to direct user when already authenticated */}
          <Route element={<CheckUser />}>
            <Route path='/signin' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          {/* Private route for unauth user */}
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorite />} />
            <Route path='/todo' element={<Todo />} />
            <Route path='/add-note' element={<AddNote />} />
            <Route path='/view-note/:id' element={<ViewNote />} />
          </Route>
          
          <Route path='/error' element={<Error />} />
        </Routes>
      </div>
    </div>
  )
}

export default App