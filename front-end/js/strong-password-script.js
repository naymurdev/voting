document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const strengthText = document.getElementById("strength-text");
  const strengthBar = document.getElementById("strength-bar");

  passwordInput.addEventListener("input", updateStrengthMeter);

  function updateStrengthMeter() {
    const value = passwordInput.value;
    const strength = getPasswordStrength(value);

    strengthText.textContent = strength.text;
    strengthText.className = strength.textColor;
    strengthBar.style.width = strength.width;
    strengthBar.style.backgroundColor = strength.color;
  }

  function getPasswordStrength(password) {
    let score = 0;
    if (password.length > 5) score++;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        return {
          text: "Very Weak",
          textColor: "text-red-600",
          width: "20%",
          color: "#ef4444",
        }; // red-500
      case 2:
        return {
          text: "Weak",
          textColor: "text-yellow-500",
          width: "40%",
          color: "#f59e0b",
        }; // yellow-500
      case 3:
        return {
          text: "Moderate",
          textColor: "text-yellow-600",
          width: "60%",
          color: "#d97706",
        }; // yellow-600
      case 4:
        return {
          text: "Strong",
          textColor: "text-green-500",
          width: "80%",
          color: "#10b981",
        }; // green-500
      case 5:
        return {
          text: "Very Strong",
          textColor: "text-green-600",
          width: "100%",
          color: "#059669",
        }; // green-600
      default:
        return { text: "", textColor: "", width: "0%", color: "" };
    }
  }
});
