let currentTimezone = "";
let currentCityLabel = "";
let intervalId = null;

function updateDefaultCities() {
  // Los Angeles
  let laTime = moment().tz("America/Los_Angeles");
  document.querySelector("#la-date").innerHTML = laTime.format("MMMM Do YYYY");
  document.querySelector("#la-time").innerHTML = laTime.format("h:mm:ss A");

  // Sydney
  let sydneyTime = moment().tz("Australia/Sydney");
  document.querySelector("#sydney-date").innerHTML =
    sydneyTime.format("MMMM Do YYYY");
  document.querySelector("#sydney-time").innerHTML =
    sydneyTime.format("h:mm:ss A");
}

function updateSelectedCity() {
  if (!currentTimezone) return;

  let cityTime = moment().tz(currentTimezone);
  document.querySelector("#la-date").innerHTML =
    cityTime.format("MMMM Do YYYY");
  document.querySelector("#la-time").innerHTML = cityTime.format("h:mm:ss A");
  document.querySelector(".city-info h2").innerHTML = currentCityLabel;
}

updateDefaultCities();
setInterval(updateDefaultCities, 1000);

const citySelector = document.getElementById("citySelector");

citySelector.addEventListener("change", function () {
  const timezone = this.value;

  if (!timezone) {
    document.querySelectorAll(".city")[0].style.display = "flex";
    document.querySelectorAll(".city")[1].style.display = "flex";

    if (intervalId) clearInterval(intervalId);
    intervalId = null;

    updateDefaultCities();
    setInterval(updateDefaultCities, 1000);
    return;
  }

  currentTimezone = timezone;

  if (timezone === "Europe/Paris") {
    currentCityLabel = "Paris 🇫🇷";
  } else if (timezone === "Asia/Tokyo") {
    currentCityLabel = "Tokyo 🇯🇵";
  } else if (timezone === "Australia/Sydney") {
    currentCityLabel = "Sydney 🇦🇺";
    currentTimezone = "Australia/Sydney";
  }

  document.querySelectorAll(".city")[0].style.display = "flex";
  document.querySelectorAll(".city")[1].style.display = "none";

  if (intervalId) clearInterval(intervalId);

  updateSelectedCity();
  intervalId = setInterval(updateSelectedCity, 1000);
});
