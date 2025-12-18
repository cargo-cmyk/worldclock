const citySelector = document.getElementById("citySelector");

citySelector.addEventListener("change", function () {
  const timezone = this.value;

  if (timezone) {
    const now = new Date();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: timezone,
    };

    const formattedDate = now.toLocaleString("en-US", options);

    alert(`It is ${formattedDate} in ${timezone}`);
  }
});

function updateCityTime() {
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

updateCityTime();
setInterval(updateCityTime, 1000);
