import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import Appbar from './components/Appbar'
import Update from './pages/Update'
import Home from './pages/Home'
import { Routes, Route, useRoutes } from 'react-router-dom';

function App() {
  const blogRoutes = useRoutes([
    { path: '/blogs', element: <Blogs /> },
    { path: '/blogs/:id', element: <Blog /> },
    { path: '/publish', element: <Publish /> },
    { path: '/blogs/:id/update', element: <Update /> },
  ]);

  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/' element={<Home />} />
      </Routes>

     
      {blogRoutes ? <Appbar /> : null}


      {blogRoutes}
    </>
  );
}

export default App
