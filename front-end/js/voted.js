import { getTokenFromCookies } from "../utils/cookieUtils.js";
import { getVotedInfo } from "../utils/votedUtils.js";

const token_for_vote = getTokenFromCookies();
const CheckVoted = getVotedInfo();
const countryNamePath = window.location.pathname.split("/")[1].split(".")[0];
const VoteBtn = document.querySelectorAll(".vote-submit-btn");
const errorBtn = document.getElementById("error-btn");
const select = (sl) => document.querySelector(sl);
const selectAll = (sl) => document.querySelectorAll(sl);
const res = await fetch(
  `https://voting-system-server.vercel.app/api/candidates/info?country=${countryNamePath}`
);
const data = await res.json();
// console.log(data?.data);
let candidatesHTML = ""; // Accumulate HTML for all candidates

data?.data?.candidate?.forEach((people, index) => {
  candidatesHTML += `
  <article class="candidate_sec border-[1px] border-[#e5e7eb] rounded-md mb-2">
    <div class="bg-[#0f0f0f] text-[#fff] p-2 rounded-sm font-medium">
      Candidate: <strong class="candidate_name">${people?.name}</strong>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <img
        src=${people?.profileUrl}
        class="w-full h-72 object-cover rounded-bl-md"
        alt="" />
      <div class="py-6 flex flex-col justify-between">
        <div>
          <h1 class="text-lg font-semibold">
            Political Party: <u class="party_name">${people?.partyName}</u>
          </h1>
          <span>Vote in ${people?.partyName} in Albania</span>
        </div>
        <div>
          <button
            class="vote-submit-btn flex max-w-fit mx-auto gap-x-2 rounded-md font-medium bg-green-400 text-white px-4 py-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true">
              <path d="m9 12 2 2 4-4" />
              <path
                d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
              <path d="M22 19H2" />
            </svg>

            Vote
          </button>
          <div
          class="error-btn max-w-fit mx-auto gap-x-2 rounded-md font-medium text-white bg-red-400 px-4 py-1.5 hidden">
          You have already given your valuable vote
        </div>
          <div class="text-red-500 font-semibold text-center pt-1">
            Please Vote before (${data?.data?.voteEndDate})
          </div>
        </div>
      </div>
    </div>
  </article>
`;
});
select(".candidateSec").innerHTML = candidatesHTML;
console.log(CheckVoted);
if (CheckVoted) {
  console.log("btn");
  selectAll(".vote-submit-btn").forEach((btn) => (btn.style.display = "none"));
  selectAll(".error-btn").forEach((btn) => btn.classList.remove("hidden"));
  selectAll(".error-btn").forEach((btn) => btn.classList.add("flex"));
} else {
  // VoteBtn.style.display = "flex";
  // errorBtn.classList.remove("flex");
  // errorBtn.classList.add("hidden");
  selectAll(".vote-submit-btn").forEach((btn) => (btn.style.display = "flex"));
  selectAll(".error-btn").forEach((btn) => btn.classList.remove("flex"));
  selectAll(".error-btn").forEach((btn) => btn.classList.add("hidden"));
  selectAll(".candidate_sec").forEach((sec) => {
    const btn = sec.querySelector(".vote-submit-btn");
    const candidateName = sec.querySelector(".candidate_name").innerText;
    const partyName = sec.querySelector(".party_name").innerText;

    // console.log(btn)

    // btn.addEventListener("click", () => {
    //   console.log(btn);
    // })
    const candidateData = {
      candidateName,
      partyName,
    };
    btn.addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want!",
      }).then((result) => {
        if (result.isConfirmed) {
          const [header, payload, signature] = token_for_vote.split(".");
          const decodedPayload = JSON.parse(atob(payload));
          axios
            .post(
              `https://voting-system-server.vercel.app/api/votes/give?email=${decodedPayload?.email}`,
              candidateData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token_for_vote,
                },
              }
            )
            .then(function (response) {
              console.log(response);
              if (response?.data?.message === "You have already voted") {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "You have already voted",
                });
              } else {
                Swal.fire({
                  title: "Voted successfully!",
                  text: "Thanks For your Vote",
                  icon: "success",
                  confirmButtonText: `
                      <a href="/">Ok</a>
                    `,
                });
                document.cookie = "Voted=" + true;
              }
            })
            .catch(function (error) {
              console.log(error);
              error?.response?.data?.error?.sources.forEach((err) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `${err?.message}`,
                });
              });
              // submitButton.disabled = false;
              // submitButton.innerHTML = "submit";
            })
            .finally(function () {
              // always executed
            });
        }
      });
    });
  });
}
