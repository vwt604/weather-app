// Display the current date and time using JavaScript
const now = new Date();
const options = { weekday: "long" };
const day = new Intl.DateTimeFormat("en-US", options).format(now);
const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
const time = now.getHours() + ":" + addZero(now.getMinutes());
const timeElement = document.querySelector(".time");
timeElement.innerHTML = day + " " + time;

const formatDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const day = date.getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
};

// Functions to retrieve and display weather data
const getForecast = (coords) => {
  const apiKey = "bdb49ae35d26b65f17ef6808d4baab94";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
};

const showWeather = (res) => {
  const cityElement = document.querySelector(".city");
  const conditionElement = document.querySelector(".weather-condition");
  const feelsLikeElement = document.querySelector(".weather-feels-like");
  const iconElement = document.querySelector(".weather-icon");
  const temperatureElement = document.querySelector(".temperature");
  const rounded = (num) => Math.round(num);

  cityElement.innerHTML = res.data.name;
  temperatureElement.innerHTML = `${rounded(res.data.main.temp)}`;
  conditionElement.innerHTML = res.data.weather[0].main;
  feelsLikeElement.innerHTML = `${rounded(res.data.main.feels_like)}°C`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`
  );

  getForecast(res.data.coord);
};

const showForecast = (res) => {
  const rounded = (num) => Math.round(num);
  const forecast = res.data.daily;
  const forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row justify-content-center">`;
  forecast.forEach((forecastDay, index) => {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 forecast-day flex-column">
        <div>${formatDay(forecastDay.dt)}</div>
        <img
          class="forecasted-weather-icon"
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }.png"
          alt="clear"
        />
        <div class="forecast-temperature">
          <span>${rounded(forecastDay.temp.max)}°</span>
          <span>${rounded(forecastDay.temp.min)}°</span>
        </div>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
};

const getDefaultWeather = () => {
  const apiKey = "bdb49ae35d26b65f17ef6808d4baab94";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&units=metric&appid=${apiKey}`
    )
    .then(showWeather);
};

getDefaultWeather();

const handleSearch = (event) => {
  event.preventDefault();
  const apiKey = "bdb49ae35d26b65f17ef6808d4baab94";
  const input = document.querySelector("#search-input");
  const searchedCity = input.value;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${apiKey}`
    )
    .then(showWeather);
};

const searchForm = document.querySelector("#weather-search");
searchForm.addEventListener("submit", handleSearch);
