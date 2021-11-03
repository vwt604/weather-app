// Display the current date and time using JavaScript

let time = new Date();

let timeHeading = document.querySelector("p.current-time");

timeHeading.innerHTML = time;

// When searching for a city (i.e. Paris), display the city name and temperature on the page after the user submits the form
let cityHeading = document.querySelector(".current-city");
let temperatureHeading = document.querySelector("#temperature");
let weatherHeading = document.querySelector(".current-weather");
let searchForm = document.querySelector("#weather-search");

let showSearchedWeather = (res) => {
  console.log("res", res.data.main.temp);
  let rounded = Math.round(res.data.main.temp);
  temperatureHeading.innerHTML = `${rounded}°C`;
  weatherHeading.innerHTML = res.data.weather[0].main;
};

let handleSearch = (event) => {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  cityHeading.innerHTML = input.value;

  let searchedCity = input.value;
  let apiKey = "bdb49ae35d26b65f17ef6808d4baab94";

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${apiKey}`
    )
    .then(showSearchedWeather);
};

searchForm.addEventListener("submit", handleSearch);

// When clicking 'Current Location' button, display current city and temperature on the page

let getCurrentLocationData = (res) => {
  let latitude = res.coords.latitude;
  let longitude = res.coords.latitude;
  console.log(`Latitude: ${latitude}`);
  console.log(`Longitude: ${longitude}`);

  let apiKey = "bdb49ae35d26b65f17ef6808d4baab94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentLocationData);
};

let showCurrentLocationData = (res) => {
  let rounded = Math.round(res.data.main.temp);
  temperatureHeading.innerHTML = `${rounded}°C`;
  cityHeading.innerHTML = res.data.name;
  weatherHeading.innerHTML = res.data.weather[0].main;
};

let getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(getCurrentLocationData);
};

let currentLocationButton = document.querySelector("#current-location");

currentLocationButton.addEventListener("click", getCurrentLocation);
