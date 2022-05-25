var today = new Date();
var day = today.getDay();
var daylist = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday ",
  "Thursday",
  "Friday",
  "Saturday",
];
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time = today.getHours() + ":" + today.getMinutes();
let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dateTime = hours + ":" + minutes;

document.getElementById("current_date").innerHTML =
  daylist[day] + " " + dateTime;

function displayWeather(response) {
  document.querySelector("#city-input").innerHTML = response.data.name;
  document.querySelector("#current_temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity-input").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function searchCity(city) {
  let apiKey = "119b80d8e84e19957be0ac69d3212f91";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Frankfurt");

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="forecast-date">${day}</div>
              <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                />
            <div class="weather-forecast-temperatures">
              <span class="forecast-temperature-max">
              23°C</span>
            <span class="forecast-temperature-min">
              12°C</span>
            </div>
            </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
