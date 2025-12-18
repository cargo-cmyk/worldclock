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
