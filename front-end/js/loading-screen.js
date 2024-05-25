window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  setTimeout(() => {
    loadingScreen.style.display = "none"; // Hide the loading screen
  }, 1400); // Adjust the delay according to your preference
});
