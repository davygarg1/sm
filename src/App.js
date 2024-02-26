import React from "react";
import Navbar from "./components/Navbar";
import API from './Context/API/api_state'
import DATA from './Context/DATA/data_state'
import { createBrowserRouter , Outlet } from "react-router-dom";
import About from './components/About'
import Blogs from './components/Blogs'
import Treatment from './components/Treatment'
import Contact from './components/Contact'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Error from './components/Error'
import { useLocation } from "react-router-dom";
import '../node_modules/flowbite/dist/flowbite';


function App() {
  let location = useLocation();
  return (
    <>
    <API>
      <DATA>
        <Navbar></Navbar>
        <div className="mt-[72px] md:mt-[68px] overflow-x-hidden">
        {location.pathname === '/' ? <Dashboard/> : <Outlet />}
        <Footer></Footer>
        </div>
      </DATA>
    </API>
    </>
  );
}

const router = createBrowserRouter([

  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children:[
      {
        path: "About",
        element: <About />,
      },
      {
        path: "Blogs",
        element: <Blogs />,
      },
      {
        path: "Treatment",
        element: <Treatment />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
    ]
  },
  {
    path: '/Login',
    element: <API><DATA><Login/></DATA></API>,
    errorElement: <Error />
  },
  {
    path: '/Register',
    element: <API><DATA><Register/></DATA></API>,
    errorElement: <Error />
  },
]);

export default router;


