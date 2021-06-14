import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getAllTags } from "../../services/eventService";
const Tag = ({ handelClick, tag, isActive }) => {
   return (
      <p
         onClick={() => handelClick(tag)}
         key={tag}
         className={`py-1 px-2 m-2 text-center ${
            isActive ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-600"
         }   rounded-md w-max cursor-pointer`}>
         {tag}
      </p>
   );
};

function EventTags(props) {
   const [tags, setTags] = useState([]);
   const location = useLocation();
   const history = useHistory();
   const getTags = async () => {
      const {
         data: {
            data: { tags },
         },
      } = await getAllTags();
      let convertedArr = tags.map((tag) => {
         return {
            tagVal: tag,
            isActive: false,
         };
      });
      setTags(convertedArr);
      // console.log(tags);
   };

   useEffect(() => {
      getTags();
      history.push(
         "/events?event_category=ALL_EVENTS&event_sub_category=Upcoming"
      );
   }, [history]);

   let newArr = [];
   const handelClick = (clickedTag) => {
      if (newArr.length === 0) {
         newArr = tags;
      }
      newArr = newArr.map((item) => {
         if (item.tagVal === clickedTag) {
            return {
               tagVal: item.tagVal,
               isActive: !item.isActive,
            };
         } else {
            return { ...item };
         }
      });

      setTags(newArr);
      //console.log("New Modified Array", newArr);
      const selectedTags = newArr
         .map((tag) => {
            return tag.isActive === true && tag.tagVal;
         })
         .filter((item) => item !== false)
         .toString();

      let query = new URLSearchParams(location.search);
      let eventCat = query.get("event_category");
      let eventSubCat = query.get("event_sub_category");

      //console.log("taglist", tagsList);

      let obj = {
         pathname: location.pathname,
         search: `?event_category=${
            eventCat ? eventCat : "ALL_EVENTS"
         }&event_sub_category=${eventSubCat ? eventSubCat : "Upcoming"}${
            selectedTags && `&tag_list=${selectedTags}`
         }`,
      };
      history.push(obj);
      //console.log("obj", obj);
      //console.log("Selected Tag Arr", selectedTags);
      //console.log(clickedTag);
   };
   return (
      <div className="flex flex-wrap">
         {tags.map((tag) => {
            return (
               <Tag
                  key={tag.tagVal}
                  tag={tag.tagVal}
                  isActive={tag.isActive}
                  handelClick={handelClick}
               />
            );
         })}
      </div>
   );
}

export default EventTags;
