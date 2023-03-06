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

function showForecast() {
  let weatherForecast = document.querySelector("#weather");

  let forecastElement = `<div class="row">`;
  let weekDays = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  weekDays.forEach(function (day) {
    forecastElement =
      forecastElement +
      `
  
                    <div class="col-2">
                      <div class="weather-date">${day}</div>
                      <img
                        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day
.png"
                        alt="Cloudy"
                        id="tue-icon"
                        width="45"
                      />
                      <div class="weather-temperature">
                        <span class="maximum-temperature">17°</span>

                        <span class="minimum-temperature">10°</span>
                      </div>
                    </div>
                  `;
  });

  forecastElement = forecastElement + `</div>`;
  weatherForecast.innerHTML = forecastElement;
}

function submitCity(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#city-input");
  let city = inputElement.value;
  searchCity(`${city}`);
}
function searchCity(city) {
  let apiKey = `6d11t62a4230458ceod68b676fc63d83`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  celsiusTemperature = response.data.temperature.current;
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
showForecast();

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
