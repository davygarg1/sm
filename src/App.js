import React from "react";
import Navbar from "./components/Navbar";
import API from './Context/API/api_state'
import DATA from './Context/DATA/data_state'
import { createBrowserRouter , Outlet } from "react-router-dom";
import Blogs from './components/Blogs'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Error from './components/Error'
import Status from './components/Status'
import Scroll from './components/Scroll'
import '../node_modules/flowbite/dist/flowbite';


function App() {
  return (
    <>
    <API>
      <DATA>
        <Navbar></Navbar>
        <Scroll />
        <div className="mt-[72px] md:mt-[68px] min-h-[90vh] overflow-x-hidden">
          <Outlet />
        </div>
        <Footer></Footer>
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
        path: "",
        element: <Dashboard />,
      },
      {
        path: "Blogs",
        element: <Blogs />,
      },
      {
        path: "Testimonials",
        element: <Testimonials />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "Status",
        element: <Status />,
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


