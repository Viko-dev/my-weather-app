function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let apiKey = "f48fd1abab6e130o13b9eabat845f0d4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#current-city").innerHTML = data.city;
      document.querySelector("#temperature").innerHTML = Math.round(
        data.temperature.current
      );

      let currentDate = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Paris",
      });
      currentDate = new Date(currentDate);
      document.querySelector("#current-date").innerHTML =
        formatDate(currentDate);
    })
    .catch(() => {
      console.log("Issue encountered while fetching weather data.");
    });
}

document.querySelector("#search-form").addEventListener("submit", search);

window.onload = function () {
  let currentDate = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Paris",
  });
  currentDate = new Date(currentDate);
  document.querySelector("#current-date").innerHTML = formatDate(currentDate);
};
