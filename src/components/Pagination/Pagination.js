import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

function Pagination({ pageCount }) {
   //console.log("Page Cout", pageCount);
   const [currentPage, setCurrentPage] = useState(1);
   const [, setDisable] = useState(false);

   const location = useLocation();
   const history = useHistory();
   let query = new URLSearchParams(location.search);
   let eventCat = query.get("event_category");
   let eventSubCat = query.get("event_sub_category");
   let tagsList = query.get("tag_list");

   const handelIncrement = () => {
      if (pageCount === 1 || currentPage === pageCount) {
         setDisable(true);
         return;
      }

      if (currentPage > pageCount) {
         setCurrentPage(1);

         return;
      }
      setCurrentPage(currentPage + 1);
      history.push({
         pathname: location.pathname,
         search: `?event_category=${
            eventCat ? eventCat : "ALL_EVENTS"
         }&event_sub_category=${
            eventSubCat ? eventSubCat : "Upcoming"
         }${`&tag_list=${tagsList ? tagsList : ""}&page=${
            currentPage >= 1 || currentPage <= pageCount ? currentPage + 1 : 1
         }`}`,
      });
   };

   const handelDecrement = () => {
      if (currentPage <= 1) {
         setCurrentPage(1);
         setDisable(true);
         return;
      }

      setCurrentPage(currentPage - 1);

      history.push({
         pathname: location.pathname,
         search: `?event_category=${
            eventCat ? eventCat : "ALL_EVENTS"
         }&event_sub_category=${
            eventSubCat ? eventSubCat : "Upcoming"
         }${`&tag_list=${tagsList ? tagsList : ""}&page=${
            currentPage >= 1 || currentPage <= pageCount ? currentPage - 1 : 1
         }`}`,
      });
   };

   const handelInputChange = (e) => {
      let val = e.target.value;
      var reg = new RegExp(/^\d+$/);
      let isValid = reg.test(val);
      //if (isValid) console.log(isValid);
      if (val < 1 || !isValid || val > pageCount) {
         setCurrentPage(1);
         return;
      }
      setCurrentPage(val);
   };
   //console.log("currentPage", currentPage);
   return (
      <div className="flex flex-row items-center  m-4 float-right pr-10">
         <div
            className="w-10 h-10 bg-yellow-500 rounded-md text-white cursor-pointer m-2"
            onClick={handelDecrement}>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-5 w-5 mt-2 ml-2"
               viewBox="0 0 20 20"
               fill="currentColor">
               <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
               />
            </svg>
         </div>
         <input
            className="w-10 h-10 p-2 m-2 border border-gray-300 text-gray-400 focus:border-gray-400 focus:outline-none rounded-sm"
            type="text"
            value={currentPage || 1}
            onChange={handelInputChange}
         />
         <span className="pr-3 text-gray-400 font-medium">
            Page Of {pageCount}{" "}
         </span>
         <div
            className="w-10 h-10 bg-yellow-500 rounded-md text-white cursor-pointer m-2"
            onClick={handelIncrement}>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-5 w-5 mt-2 ml-2"
               viewBox="0 0 20 20"
               fill="currentColor">
               <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
               />
            </svg>
         </div>
      </div>
   );
}

export default Pagination;
