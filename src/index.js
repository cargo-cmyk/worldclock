let currentTimezone = "";
let currentCityLabel = "";
let intervalId = null;
const allCitiesLink = document.getElementById("allCitiesLink");

function updateDefaultCities() {
  let laTime = moment().tz("America/Los_Angeles");
  document.querySelector("#la-date").innerHTML = laTime.format("MMMM Do YYYY");
  document.querySelector("#la-time").innerHTML = laTime.format("h:mm:ss A");

  let sydneyTime = moment().tz("Australia/Sydney");
  document.querySelector("#sydney-date").innerHTML =
    sydneyTime.format("MMMM Do YYYY");
  document.querySelector("#sydney-time").innerHTML =
    sydneyTime.format("h:mm:ss A");

  let viennaTime = moment().tz("Europe/Vienna");
  document.querySelector("#aut-date").innerHTML =
    viennaTime.format("MMMM Do YYYY");
  document.querySelector("#aut-time").innerHTML =
    viennaTime.format("h:mm:ss A");
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
intervalId = setInterval(updateDefaultCities, 1000);

const citySelector = document.getElementById("citySelector");

citySelector.addEventListener("change", function () {
  const timezone = this.value;

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  if (!timezone) {
    // Zurück zu LA + Sydney + Vienna
    document.querySelectorAll(".city")[0].style.display = "flex";
    document.querySelectorAll(".city")[1].style.display = "flex";
    document.querySelectorAll(".city")[2].style.display = "flex";

    allCitiesLink.classList.remove("show");

    updateDefaultCities();
    intervalId = setInterval(updateDefaultCities, 1000);
    return;
  }

  if (timezone === "current") {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    currentTimezone = userTimezone;
    currentCityLabel = `Current Location 📍`;

    document.querySelectorAll(".city")[0].style.display = "flex";
    document.querySelectorAll(".city")[1].style.display = "none";
    document.querySelectorAll(".city")[2].style.display = "none";

    allCitiesLink.classList.add("show");

    updateSelectedCity();
    intervalId = setInterval(updateSelectedCity, 1000);
    return;
  }

  currentTimezone = timezone;

  if (timezone === "Europe/Paris") {
    currentCityLabel = "Paris 🇫🇷";
  } else if (timezone === "Asia/Tokyo") {
    currentCityLabel = "Tokyo 🇯🇵";
  } else if (timezone === "America/New_York") {
    currentCityLabel = "New York 🇺🇸";
  }

  document.querySelectorAll(".city")[0].style.display = "flex";
  document.querySelectorAll(".city")[1].style.display = "none";
  document.querySelectorAll(".city")[2].style.display = "none";

  allCitiesLink.classList.add("show");

  updateSelectedCity();
  intervalId = setInterval(updateSelectedCity, 1000);
});

// All Cities Link Handler
allCitiesLink.addEventListener("click", function (e) {
  e.preventDefault();
  location.reload();
});
