function updateTime() {
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    `0${minute}`;
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

function searchCity(event) {
  event.preventDefault();
  let apiKey = `6d11t62a4230458ceod68b676fc63d83`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Pretoria&key=${apiKey}&units=metric`;
  let input = document.querySelector("#query");
  let city = input.value;

  let h1 = document.querySelector("#newYork");
  h1.innerHTML = city;
  axios.get(apiUrl).then(getTemperature);
}

let form = document.querySelector("#forms");
form.addEventListener("submit", searchCity);

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
}
