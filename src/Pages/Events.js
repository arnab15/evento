import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EventCard from "../components/EventCard/EventCard";
import EventTags from "../components/EventTags/EventTags";
import { getEvents } from "../services/eventService";
import Spiner from "../components/Spiner/Spiner";
import Pagination from "../components/Pagination/Pagination";

function Events(props) {
   const [events, setEvents] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [pageCount, setPageCount] = useState();
   const location = useLocation();
   let query = new URLSearchParams(location.search);
   let eventCat = query.get("event_category");
   let eventSubCat = query.get("event_sub_category");
   let tagsList = query.get("tag_list");
   let page = query.get("page");

   useEffect(() => {
      getAllEvents();
      // eslint-disable-next-line
   }, [eventSubCat, eventCat, tagsList, page]);

   async function getAllEvents() {
      try {
         setIsLoading(true);
         const { data } = await getEvents({
            event_category: eventCat,
            event_sub_category: eventSubCat,
            tag_list: tagsList,
            page: page ? page : 1,
         });
         setPageCount(data.data.page_count);
         setEvents(data.data.events);
         setIsLoading(false);
         //console.log(data.data.events);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div>
         <div className="grid grid-cols-1 justify-items-center md:grid-cols-5 gap-2 bg-gray-100 py-4">
            <div>
               <Link
                  to={{
                     pathname: location.pathname,
                     search: `?event_category=ALL_EVENTS&event_sub_category=Upcoming${
                        tagsList ? `&tag_list=${tagsList}` : ""
                     }`,
                  }}
                  className={`hover:text-yellow-400 ${
                     eventCat === "ALL_EVENTS" && "text-yellow-400"
                  }  font-semibold px-4`}>
                  All Events
               </Link>
            </div>
            <div>
               <Link
                  to={{
                     pathname: location.pathname,
                     search: `?event_category=CODING_EVENT&event_sub_category=Upcoming${
                        tagsList ? `&tag_list=${tagsList}` : ""
                     }`,
                  }}
                  className={`hover:text-yellow-400 ${
                     eventCat === "CODING_EVENT" && "text-yellow-400"
                  }  font-semibold px-4`}>
                  Coding Events
               </Link>
            </div>
            <div>
               <Link
                  to={{
                     pathname: location.pathname,
                     search: `?event_category=BOOTCAMP_EVENT&event_sub_category=Upcoming${
                        tagsList ? `&tag_list=${tagsList}` : ""
                     }`,
                  }}
                  className={`hover:text-yellow-400 ${
                     eventCat === "BOOTCAMP_EVENT" && "text-yellow-400"
                  }  font-semibold px-4`}>
                  Bootcamp Events
               </Link>
            </div>
            <div>
               <Link
                  to={{
                     pathname: location.pathname,
                     search: `?event_category=WEBINAR&event_sub_category=Upcoming${
                        tagsList ? `&tag_list=${tagsList}` : ""
                     }`,
                  }}
                  className={`hover:text-yellow-400 ${
                     eventCat === "WEBINAR" && "text-yellow-400"
                  }  font-semibold px-4`}>
                  Webinars
               </Link>
            </div>
            <div>
               <Link
                  to={{
                     pathname: location.pathname,
                     search: `?event_category=WORKSHOP&event_sub_category=Upcoming${
                        tagsList ? `&tag_list=${tagsList}` : ""
                     }`,
                  }}
                  className={`hover:text-yellow-400 ${
                     eventCat === "WORKSHOP" && "text-yellow-400"
                  }  font-semibold px-4`}>
                  Workshops
               </Link>
            </div>
         </div>
         {/* grid grid-cols-1 justify-items-center md:grid-cols-3 gap-3 my-4 */}
         <div className="flex flex-row justify-start gap-4 my-4">
            <div>
               <Link
                  to={{
                     pathname: location.pathname,
                     search: `?event_category=${
                        eventCat ? eventCat : "ALL_EVENTS"
                     }&event_sub_category=Upcoming${
                        tagsList ? `&tag_list=${tagsList}` : ""
                     }`,
                  }}
                  className={`hover:text-yellow-400 ${
                     eventSubCat === "Upcoming" && "text-yellow-400"
                  }  font-semibold px-4`}>
                  Upcoming
               </Link>
            </div>
            <div>
               <Link
                  to={{
                     pathname: location.pathname,
                     search: `?event_category=${
                        eventCat ? eventCat : "ALL_EVENTS"
                     }&event_sub_category=Archived${
                        tagsList ? `&tag_list=${tagsList}` : ""
                     }`,
                  }}
                  className={`hover:text-yellow-400 ${
                     eventSubCat === "Archived" && "text-yellow-400"
                  }  font-semibold px-4`}>
                  Archived
               </Link>
            </div>
            <div>
               <Link
                  to={{
                     pathname: location.pathname,
                     search: `?event_category=${
                        eventCat ? eventCat : "ALL_EVENTS"
                     }&event_sub_category=All Time Favorites${
                        tagsList ? `&tag_list=${tagsList}` : ""
                     }`,
                  }}
                  className={`hover:text-yellow-400 ${
                     eventSubCat === "All Time Favorites" && "text-yellow-400"
                  }  font-semibold px-4`}>
                  All Time Favorites
               </Link>
            </div>
         </div>
         <div className="mt-3 flex flex-row">
            <div className="w-full  md:w-3/4">
               {events.length === 0 && (
                  <p className="text-red-400 text-center text-2xl pt-14">
                     No Event Found
                  </p>
               )}

               {events.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2">
                     {events.map((event) => {
                        return <EventCard key={event.name} event={event} />;
                     })}
                  </div>
               )}
               {isLoading && <Spiner />}
            </div>
            <div className=" w-1/4 hidden sm:hidden md:block">
               <h3 className="text-gray-500 pl-4 font-semibold">TAGS</h3>
               <EventTags />
            </div>
         </div>
         {events.length > 0 && <Pagination pageCount={pageCount} />}
      </div>
   );
}

export default Events;
