let apiKey = config.API_KEY;

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

//Get forecast function
const getForecast = (coords) => {
  console.log("Coords", coords);

  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;

  console.log("URL", apiUrl);
  axios.get(apiUrl).then(showForecast);
};

// Display Geolocated city time and weather by default
let getCurrentLocationData = (res) => {
  let latitude = res.coords.latitude;
  let longitude = res.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showDefaultWeather);
};

let getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(getCurrentLocationData);
};

let showDefaultWeather = (res) => {
  let cityElement = document.querySelector(".city");
  let conditionElement = document.querySelector(".weather-condition");
  let feelsLikeElement = document.querySelector(".weather-feels-like");
  let iconElement = document.querySelector(".weather-icon");
  let temperatureElement = document.querySelector(".temperature");
  let rounded = (num) => Math.round(num);

  temperatureElement.innerHTML = `${rounded(res.data.main.temp)}`;
  cityElement.innerHTML = res.data.name;
  conditionElement.innerHTML = res.data.weather[0].main;
  feelsLikeElement.innerHTML = `${rounded(res.data.main.feels_like)}°C`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`
  );

  getForecast(res.data.coord);
};

getCurrentLocation();

// Display weather information of the searched city
let showSearchedWeather = (res) => {
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

let handleSearch = (event) => {
  event.preventDefault();
  let input = document.querySelector("#search-input");

  let searchedCity = input.value;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${apiKey}`
    )
    .then(showSearchedWeather);
};

let searchForm = document.querySelector("#weather-search");
searchForm.addEventListener("submit", handleSearch);

//Show weather forecast

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
        <span>${formatDay(forecastDay.dt)}</span>
        <img
          class="forecasted-weather-icon"
          src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
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
