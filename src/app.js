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

// Display Geolocated city time and weather by default
let getCurrentLocationData = (res) => {
  let latitude = res.coords.latitude;
  let longitude = res.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherData);
};

let getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(getCurrentLocationData);
};

let showWeatherData = (res) => {
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
