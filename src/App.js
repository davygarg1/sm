import React from "react";
import Navbar from "./components/Navbar";
import API from './Context/API/api_state'
import DATA from './Context/DATA/data_state'
import { createBrowserRouter , Outlet } from "react-router-dom";
import About from './components/About'
import Blogs from './components/Blogs'
import Treatment from './components/Treatment'
import Contact from './components/Contact'
import Error from './components/Error'

function App() {
  return (
    <>
    <API>
      <DATA>
        <Navbar></Navbar>
        <h1 class="w-screen h-screen text-3xl font-bold flex justify-center items-center">
        Samarpitam <br />
        Dr. Sumeet Saini
       </h1>
        <Outlet />
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
]);

export default router;
