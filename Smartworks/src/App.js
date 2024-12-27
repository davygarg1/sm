import React, { useState} from "react";
import { createBrowserRouter , Outlet , useLocation } from "react-router-dom";
import API from './Context/API/api_state'
import Navbar from "./Components/Navbar";
import Footer from './Components/Footer'
import Dashboard from './Components/Dashboard'
import Error from './Components/Error'
import Sidebar from './Components/Sidebar'
import Doctor from './Components/Doctor'
import Client from './Components/Client'
import Testimonial from './Components/Testimonials'
import Login from './Components/Login'
import Invoices from './Components/Invoice'

function App() {

  let location = useLocation();
  const [aside, setaside] = useState(false);

  return (
    <API>
        <Navbar setaside={setaside} aside={aside}></Navbar>
        <Sidebar setaside={setaside} aside={aside}></Sidebar>
        <div className="mt-[72px] md:mt-[65px] md:ml-[65px] h-[74vh] overflow-x-hidden">
          <div className="h-16 w-full text-sm font-medium flex justify-between items-center px-8">
              {`HOME ${location.pathname.toUpperCase().replace("/", "")}`}               
          </div>
          <Outlet />
        </div>
        <Footer></Footer>
    </API>
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
        path: "Doctors",
        element: <Doctor />,
      },
      {
        path: "Clients",
        element: <Client />,
      },
      {
        path: "Testimonials",
        element: <Testimonial />,
      },
      {
        path: "Invoices",
        element: <Invoices />,
      },
    ]
  },
  {
    path: '/Login',
    element: <API><Login/></API>,
    errorElement: <Error />
  },
]);

export default router;
