import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
   const [navbarOpen, setNavbarOpen] = React.useState(false);

   return (
      <>
         <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-700 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
               <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                  <Link
                     className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
                     to="/">
                     <span className="inline-block mx-2">Evento</span>
                  </Link>
                  <button
                     className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                     type="button"
                     onClick={() => setNavbarOpen(!navbarOpen)}>
                     <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M4 6h16M4 12h16M4 18h16"></path>
                     </svg>
                  </button>
               </div>
               <div
                  className={
                     "lg:flex flex-grow items-center" +
                     (navbarOpen ? " flex" : " hidden")
                  }
                  id="example-navbar-danger">
                  <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                     <li className="nav-item">
                        <Link
                           className="px-3 py-2 flex items-center text-xs  uppercase font-bold leading-snug text-white hover:opacity-75"
                           to="/events?event_category=ALL_EVENTS&event_sub_category=Upcoming">
                           <span className="ml-2">Events</span>
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </>
   );
}
