let apiKey = config.API_KEY;

//Gets location data and displays it using helper function

let getCurrentLocationData = (res) => {
  let latitude = res.coords.latitude;
  let longitude = res.coords.latitude;
  console.log(`Latitude: ${latitude}`);
  console.log(`Longitude: ${longitude}`);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentLocationData);
};

let showCurrentLocationData = (res) => {
  let rounded = Math.round(res.data.main.temp);
  console.log(rounded);
  temperatureElement.innerHTML = `${rounded}°C`;
  cityElement.innerHTML = res.data.name;
  conditionElement.innerHTML = res.data.weather[0].main;
  humidityElement.innerHTML = `${res.data.main.humidity}%`;
  windElement.innerHTML = `${res.data.wind.speed}km/h`;
};

let getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(getCurrentLocationData);
};

getCurrentLocation();

// // Display the current date and time using JavaScript
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

let timeElement = document.querySelector(".current-time");
timeElement.innerHTML = day + " " + time;

// Display Geolocated city time and weather by default
let cityElement = document.querySelector(".current-city");
let temperatureElement = document.querySelector(".current-temperature");
let conditionElement = document.querySelector(".current-weather-condition");
let humidityElement = document.querySelector(".current-humidity");
let windElement = document.querySelector(".current-wind");
let searchForm = document.querySelector("#weather-search");

// // When searching for a city (i.e. Paris), display the city name and temperature on the page after the user submits the form

let showSearchedWeather = (res) => {
  console.log("res", res);
  let rounded = Math.round(res.data.main.temp);
  temperatureElement.innerHTML = `${rounded}`;
  conditionElement.innerHTML = res.data.weather[0].main;
  humidityElement.innerHTML = `${res.data.main.humidity}%`;
  windElement.innerHTML = `${res.data.wind.speed}km/h`;
};

let handleSearch = (event) => {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  cityElement.innerHTML = input.value;

  let searchedCity = input.value;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${apiKey}`
    )
    .then(showSearchedWeather);
};

searchForm.addEventListener("submit", handleSearch);
