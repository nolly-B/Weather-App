function updateTime() {
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = daysOfTheWeek[now.getDay()];
  let currentDay = document.querySelector("#daytime");

  currentDay.innerHTML = `${weekDay} ${hour}:${minute}`;
}

updateTime();
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  console.log(response.data);
  let forecastDetails = response.data.daily;

  let weatherForecast = document.querySelector("#weather");

  let forecastElement = `<div class="row">`;

  forecastDetails.forEach(function (forecastDay) {
    forecastElement =
      forecastElement +
      `
  
                    <div class="col-2">
                      <div class="weather-date">${formatDay(
                        forecastDay.dt
                      )}</div>
                      <img
                        src="http://openweathermap.org/img/wn/${
                          response.data.weather[0].icon
                        }@2x.png"

                        alt=""
                        id="tue-icon"
                        width="45"
                      />
                      <div class="weather-temperature">
                      ${formatDay(forecastDay.temp.max)}°</span>
                        <span class="minimum-temperature">${formatDay(
                          forecastDay.temp.min
                        )}°</span>
                      </div>
                    </div>
                  `;
  });

  forecastElement = forecastElement + `</div>`;
  weatherForecast.innerHTML = forecastElement;
}
function fetchForecast(coordinates) {
  let apiKey = `2718952144ed077c12e7c160fb6fc351`;

  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function submitCity(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#city-input");
  let city = inputElement.value;
  searchCity(`${city}`);
}
function searchCity(city) {
  let apiKey = `2718952144ed077c12e7c160fb6fc351`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

function getTemperature(response) {
  console.log(response);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let heading = document.querySelector("#newYork");
  heading.innerHTML = response.data.name;
  let windSpeed = document.querySelector("#speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  fetchForecast(response.data.coord);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
