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
  let forecastDetails = response.data.daily;

  let weatherForecast = document.querySelector("#weather");

  let forecastElement = `<div class="row">`;

  forecastDetails.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastElement =
        forecastElement +
        `
  
                    <div class="col-2">
                      <div class="weather-date">${formatDay(
                        forecastDay.time
                      )}</div>
                      
                      <img
                        src=${forecastDay.condition.icon_url}

                        alt=""
                        id="tue-icon"
                        width="45"
                      />
                      <div class="weather-temperature">
                   <span class="maximum-temperature">${Math.round(
                     forecastDay.temperature.maximum
                   )}°</span>

                        <span class="minimum-temperature">${Math.round(
                          forecastDay.temperature.minimum
                        )}°</span>
                              </div>
                    </div>
                  `;
    }
  });

  forecastElement = forecastElement + `</div>`;
  weatherForecast.innerHTML = forecastElement;
}
function fetchForecast(coordinates) {
  let apiKey = `6d11t62a4230458ceod68b676fc63d83`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function submitCity(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#city-input");
  let city = inputElement.value;
  searchCity(`${city}`);
}
function searchCity(city) {
  let apiKey = `6d11t62a4230458ceod68b676fc63d83`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

function getTemperature(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  let heading = document.querySelector("#newYork");
  heading.innerHTML = response.data.city;
  let windSpeed = document.querySelector("#speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humid");
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  let description = document.querySelector("#description");

  description.innerHTML = response.data.condition.description;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  celsiusTemperature = response.data.temperature.current;

  fetchForecast(response.data.coordinates);
}
