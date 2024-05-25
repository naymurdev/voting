import { getTokenFromCookies } from "../utils/cookieUtils.js";
import { getUpcomingVote } from "../utils/getUpcomingVote.js";
window.addEventListener("load", async (event) => {
  const user_token = getTokenFromCookies();

  const specificUpcomingVote = await getUpcomingVote();
  const userInfoContainer = document.getElementById("user-info");
  const votingContainer = document.getElementById("voting-container");
  const voting_error = `<div class="mx-2 bg-[#FAFBFC] rounded-2xl border p-4 md:p-8 grid md:grid-cols-[1fr_auto] gap-8"> <section
class="bg-[#FF6A6A] text-white border p-4 md:p-8 rounded-2xl max-w-3xl grid place-content-center h-full py-8">
<img src="./assets/oops.svg" role="presentation" class="mx-auto" />

<h2 class="text-center pt-8">
  <span class="font-medium text-lg">Sorry you can't vote here</span>
</h2>

<p class="list-disc list-inside text-2xl bg-white p-2 px-4 rounded-lg text-black mt-2">
 you're not from this country
</p>
</section><img
src="./assets/democracy.svg"
role="presentation"
class="max-h-[60svh] justify-self-center" /> </div>`;
  const voting_start_error = `<div class="mx-2 bg-[#FAFBFC] rounded-2xl border p-4 md:p-8 grid md:grid-cols-[1fr_auto] gap-8">
   <section
class="bg-[#459cff] text-white border p-4 md:p-8 rounded-2xl max-w-3xl grid place-content-center h-full py-8">
<img src="./assets/oops.svg" role="presentation" class="mx-auto" />

<h2 class="text-center pt-8">
  <span class="font-medium text-lg">Thanks for visiting, but the voting haven't started</span>
</h2>

<p class="list-disc list-inside text-2xl text-center bg-white p-2 px-2 rounded-lg text-black mt-2">
 please wait untill voting start
</p>
</section>
<img
src="./assets/democracy.svg"
role="presentation"
class="max-h-[60svh] justify-self-center" />
</div>`;
  // const currentDate = new Date();

  // // Create a specific target date (e.g., February 9, 2024)
  // const targetDate = new Date(specificUpcomingVote?.votingStart); // Specify the date in YYYY-MM-DD format

  // // Compare the current date with the target date
  // if (currentDate.getTime() === targetDate.getTime()) {
  //   console.log("The current date is equal to the target date.");
  // } else if (currentDate.getTime() > targetDate.getTime()) {
  //   console.log("The current date is after the target date.");
  // } else {
  //   console.log("The current date is before the target date.");
  // }
  const pathCountry = window.location.pathname.split("/")[1].split(".")[0];
  const matchedVote = specificUpcomingVote.find(
    (vote) => vote.country === pathCountry
  );
  // if (matchedVote) {
  //   console.log(matchedVote, pathCountry);
  //   votingContainer && (votingContainer.innerHTML = voting_start_error);
  // } else {
  if (user_token) {
    const [header, payload, signature] = user_token.split(".");
    console.log(user_token);
    const decodedPayload = JSON.parse(atob(payload));
    userInfoContainer.innerHTML = `
    
  <div class="user-dropdown">
      <button class="btn" id="btn">
      <img src="./assets/profile.png" alt="User Info" class="w-12 h-12">
      <i class="bx bx-chevron-down" id="arrow"></i>
    </button>
  
    <div class="dropdown" id="dropdown">
    <div class="text-white bg-[#3b82f6] p-3 px-4 sm:text-base text-sm">
    <p><strong>Name:</strong> ${decodedPayload?.name}</p>
      <p><strong>Email:</strong> ${decodedPayload?.email}</p>
      <p><strong>Country:</strong> ${decodedPayload?.country}</p>
      <p><strong>UserID:</strong> ${decodedPayload?.userID}</p>
    </div>
      <a href="https://wa.me/+8801867871903" target="_blank">
      <i class='bx bxs-phone-call' ></i>
Contact us
      </a>
      <button id="logout-btn" class="w-full">
      <i class='bx bx-log-out'></i>
        Log out
      </button>
    </div>
    </div>
      `;
    const userCountry = decodedPayload.country;
    if (matchedVote) {
      console.log(matchedVote, pathCountry);
      votingContainer && (votingContainer.innerHTML = voting_start_error);
    } else {
      if (userCountry !== pathCountry) {
        // alert(`You're not from ${userCountry}. Please go to your country.`);
        votingContainer && (votingContainer.innerHTML = voting_error);
      }
    }
  } else {
    console.log("Token cookie doesn't exist. Redirecting to login page...");

    const btnGroupHTML = `
  <div class="flex gap-2 btn-group">
    <a href="./register.html" class="px-2 py-0.5 sm:py-1 bg-blue-500 rounded block ml-auto">Register</a>
    <a href="https://wa.me/+8801867871903" class="bg-white rounded px-2 py-0.5 sm:py-1 block text-black">Contact us</a>
  </div>
  `;

    userInfoContainer.innerHTML = btnGroupHTML;
  }

  const dropdownBtn = document.querySelector(".user-dropdown #btn");
  const dropdownMenu = document.querySelector(".user-dropdown #dropdown");
  const toggleArrow = document.querySelector(".user-dropdown #arrow");
  console.log(dropdownBtn, dropdownMenu, toggleArrow);
  const toggleDropdown = function () {
    dropdownMenu.classList.toggle("show");
    toggleArrow.classList.toggle("arrow");
  };

  dropdownBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleDropdown();
  });

  document.documentElement.addEventListener("click", function () {
    if (dropdownMenu.classList.contains("show")) {
      toggleDropdown();
    }
  });

  document.getElementById("logout-btn").addEventListener("click", () => {
    // console.log("hello");
    document.cookie = "Bearer= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "Voted= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  });
});
