import React from "react";
import date from "date-and-time";
const getFormatedDateTime = (epoctime, outputFormat) => {
   const d = new Date(epoctime * 1000);
   return date.format(d, outputFormat ? outputFormat : "hh:mm A DD MMM YYYY");
};
function EventCard({ event }) {
   let eventStartTime = null;
   let eventRegEndTime = null;
   if (event) {
      eventStartTime = getFormatedDateTime(
         event.event_start_time,
         "hh:mm A DD MMM YYYY"
      );
      eventRegEndTime = getFormatedDateTime(
         event.registration_end_time,
         "DD MMM hh:mm A"
      );

      //console.log("Event End", getFormatedDateTime(event.event_end_time));
   }

   return (
      <div className="m-3 md:mx-5">
         {event && (
            <div
               className={`flex flex-col rounded-lg bg-white shadow-md overflow-hidden`}>
               <div>
                  <img
                     src={event.mobile_cover_picture}
                     alt={event.name}
                     className="w-full"
                  />
               </div>
               <div className="p-1">
                  {event.registration_status === "REGISTRATIONS_OPEN" && (
                     <div className="px-3 py-1">
                        <p className="text-blue-300 font-semibold inline-block">
                           Registration open till {eventRegEndTime}
                        </p>
                     </div>
                  )}
                  <h4 className="pl-3 mt-1 text-gray-900 font-sans font-semibold text-xl">
                     {event.name}
                  </h4>
                  <div className="flex flex-row justify-between p-2">
                     <div className="flex flex-col p-2">
                        <p className="text-gray-400 text-sm">Starts On</p>
                        <p className="text-gray-500 text-sm font-medium">
                           {eventStartTime}
                        </p>
                     </div>
                     <div className="flex flex-col p-2">
                        <p className="text-gray-400 text-sm">Entry Fees</p>
                        <p className="text-gray-500 text-sm font-medium">
                           {event.fees
                              ? `${event.currency} ${event.fees}`
                              : "Free"}
                        </p>
                     </div>
                     <div className="flex flex-col p-2">
                        <p className="text-gray-400 text-sm">Venue</p>
                        <p className="text-gray-500 text-sm font-medium">
                           {event.venue}
                        </p>
                     </div>
                  </div>
                  <hr className="w-3/5 my-1 mx-auto" />
                  <div className="px-3 py-2">
                     <p className=" text-base text-gray-400 font-sans  line-clamp-3">
                        {event.short_desc}
                     </p>
                  </div>
                  <div className="hidden md:flex flex-wrap justify-starts items-center mt-4 px-3">
                     {event.card_tags.map((tag) => {
                        return (
                           <p
                              key={tag}
                              className="text-xs mr-2 py-1.5 px-4 my-1 text-gray-600 bg-blue-100 rounded-2xl">
                              {tag}
                           </p>
                        );
                     })}
                  </div>
                  <hr className="w-3/5 mt-2 mx-auto" />
                  <footer className="flex justify-between px-2 pb-3 mt-1 pt-3 items-center">
                     <div className="flex -space-x-2 items-center flex-1">
                        {event.registered_users.top_users.map((user) => {
                           let flag = null;
                           if (user.image_url) {
                              flag = (
                                 <img
                                    key={user.image_url}
                                    className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-white"
                                    src={user.image_url}
                                    alt={user.name}
                                 />
                              );
                           }
                           return flag;
                        })}
                        {event.registered_users.show_users_count && (
                           <span className="text-gray-400 inline text-xs pl-3 font-medium">
                              +{event.registered_users.other_users_count} Other
                              students
                           </span>
                        )}
                     </div>
                     {event.registration_status === "REGISTRATIONS_OPEN" ? (
                        <div className="bg-yellow-500 hover:bg-yellow-400  text-white cursor-pointer py-2 mr-1 px-3 rounded-md text-center">
                           Register Now
                        </div>
                     ) : (
                        <div className="flex flex-wrap justify-starts items-center mt-4">
                           <div className="text-xs mr-2 py-1.5 px-4 text-gray-800 bg-red-100 rounded-2xl">
                              Registration Closed
                           </div>
                        </div>
                     )}
                  </footer>
               </div>
            </div>
         )}
      </div>
   );
}

export default EventCard;
