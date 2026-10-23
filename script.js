const classStart = new Date("2026-11-20T19:00:00+01:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownMessage = document.getElementById("countdown-message");

function updateCountdown() {
  const now = Date.now();
  const distance = classStart - now;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    countdownMessage.textContent =
      "The class has started or the scheduled start time has passed!";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

const countdownInterval = setInterval(() => {
  updateCountdown();

  if (Date.now() >= classStart) {
    clearInterval(countdownInterval);
  }
}, 1000);


// Form submission
const registrationForm = document.getElementById("registration-form");
const submitBtn = document.getElementById("submit-btn");
const formMessage = document.getElementById("form-message");

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  formMessage.textContent = "";
  formMessage.className = "form-message";
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting registration...";

  try {
    const response = await fetch(registrationForm.action, {
      method: "POST",
      body: new FormData(registrationForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Registration could not be submitted.");
    }

    formMessage.textContent =
      "Registration submitted successfully! Thank you for signing up for Code With Darby. ❤️";

    formMessage.classList.add("success");
    registrationForm.reset();
  } catch (error) {
    formMessage.textContent =
      "Sorry, we couldn't submit your registration. Please check your internet connection and try again.";

    formMessage.classList.add("error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Complete Registration →";
  }
});