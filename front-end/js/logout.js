document.querySelector(`.logout-btn`).addEventListener("click", (e) => {
  e.preventDefault();

  document.cookie = "Bearer=";
  document.cookie = "UserId=";

  window.location.assign("./login.html");
});
