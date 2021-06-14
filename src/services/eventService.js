import axios from "axios";
const apiUrl = "https://api.codingninjas.com/api/v3";
export const getEvents = ({
   event_category,
   event_sub_category,
   tag_list,
   page,
}) => {
   let uri = `${apiUrl}/events?event_category=${
      event_category ? event_category : "ALL_EVENTS"
   }&event_sub_category=${
      event_sub_category ? event_sub_category : "Upcoming"
   }&tag_list=${tag_list ? tag_list : ""}&page=${page ? page : 1}&offset=0`;
   //console.log(uri);
   return axios.get(uri);
};
