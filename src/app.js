let apiKey = config.API_KEY;

let serverURL;

fetch(".netlify/functions/api")
  .then((response) => response.json())
  .then((json) => {
    serverURL = json.api;
  });

console.log("API key test");
console.log(api);
consolelog(serverURL);

// Display the current date and time using JavaScript
let now = new Date();
let options = { weekday: "long" };
let day = new Intl.DateTimeFormat("en-US", options).format(now);
let addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
let time = now.getHours() + ":" + addZero(now.getMinutes());
let timeElement = document.querySelector(".time");
timeElement.innerHTML = day + " " + time;

//Formats date
const formatDay = (timestamp) => {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
};

//Gets weather forecast
const getForecast = (coords) => {
  console.log("Coords", coords);

  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;

  console.log("URL", apiUrl);
  axios.get(apiUrl).then(showForecast);
};

//Displays weather data
let showWeather = (res) => {
  let cityElement = document.querySelector(".city");
  let conditionElement = document.querySelector(".weather-condition");
  let feelsLikeElement = document.querySelector(".weather-feels-like");
  let iconElement = document.querySelector(".weather-icon");
  let temperatureElement = document.querySelector(".temperature");
  let rounded = (num) => Math.round(num);

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

//Displays weather forecast
let showForecast = (res) => {
  let rounded = (num) => Math.round(num);
  let forecast = res.data.daily;
  console.log("forecast:", forecast);
  let forecastElement = document.querySelector("#weather-forecast");

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

//Gets default weather data from API
const getDefaultWeather = () => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&units=metric&appid=${apiKey}`
    )
    .then(showWeather);
};

getDefaultWeather();

//Gets searched weather data from API
let handleSearch = (event) => {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let searchedCity = input.value;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${apiKey}`
    )
    .then(showWeather);
};

let searchForm = document.querySelector("#weather-search");
searchForm.addEventListener("submit", handleSearch);
