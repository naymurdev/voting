import { getUpcomingVote } from "../utils/getUpcomingVote.js";
const specificUpcomingVote = await getUpcomingVote();
const pathCountry = window.location.pathname.split("/")[1].split(".")[0];
console.log(specificUpcomingVote);
