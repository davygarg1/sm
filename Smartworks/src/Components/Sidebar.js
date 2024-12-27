import React from "react";
import { HomeOutlined , IdcardOutlined , TeamOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";

const Sidebar = (props) => {
  let location = useLocation();

  const {aside, setaside} =  props;

  const navigation = [
    { name: "Dashboard", to: "/",  current: location.pathname === "/" ? true : false, icon: <HomeOutlined/> },
    { name: "Manage Clients", to: "/Clients",  current: location.pathname === "/Clients" ? true : false, icon: <TeamOutlined />   },
    { name: "Manage Doctors", to: "/Doctors",  current: location.pathname === "/Doctors" ? true : false, icon: <IdcardOutlined />  },
    { name: "Manage Testimonial", to: "/Testimonials",  current: location.pathname === "/Testimonial" ? true : false, icon: <IdcardOutlined />  },
    { name: "Manage Invoices", to: "/Invoices",  current: location.pathname === "/Invoices" ? true : false, icon: <IdcardOutlined />  },
  ];
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div
      className={`fixed h-full w-64 bg-gray-900 text-white transition-all duration-300 z-20 ${
        aside ? "ml-0" : "md:-ml-48 -ml-64"
      }`}
      onMouseEnter={() => setaside(true)}
      onMouseLeave={() => setaside(false)}
    >
      <div className="flex justify-between items-center p-4">
        <img src="http://swdigital.sworks.co.in/assets/img/logo.svg" className="bg-white h-12" alt="smartworks" />
        <button
          className="focus:outline-none"
          onClick={() => setaside(!aside)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                aside ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>
      <div>
      <ul className="flex flex-col w-full font-medium mt-4">
  {navigation.map((item) => (
    <Link
        to={item.to}
        key={item.name}
        onClick={() => setaside(false)}
        className={classNames(
          item.current ? "text-blue-500 cursor-default" : "hover:bg-gray-50 hover:text-black text-gray-400 bg-transparent",
          "mx-4 rounded-md"
        )}
        aria-current="page"
      >
          <li key={item.name} className="flex justify-between items-center h-12 w-full px-2">
            {item.name}
            {item.icon}
          </li>
      </Link>
  ))}
</ul>

      </div>
    </div>
  );
};

export default Sidebar;
