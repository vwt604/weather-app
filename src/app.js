let apiKey = config.API_KEY;

// // Display the current date and time using JavaScript

let now = new Date();

let options = { weekday: "long" };
let day = new Intl.DateTimeFormat("en-US", options).format(now);
let time = now.getHours() + ":" + now.getMinutes();
// let timeNow = `${day} ${time}`;

let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = day + " " + time;

// // When searching for a city (i.e. Paris), display the city name and temperature on the page after the user submits the form
let currentCity = document.querySelector(".current-city");
let currentTemperature = document.querySelector(".current-temperature");
let currentCondition = document.querySelector(".current-weather-condition");
let currentHumidity = document.querySelector(".current-humidity");
let currentWind = document.querySelector(".current-wind");
let searchForm = document.querySelector("#weather-search");

let showSearchedWeather = (res) => {
  console.log("res", res);
  let rounded = Math.round(res.data.main.temp);
  currentTemperature.innerHTML = `${rounded}`;
  currentCondition.innerHTML = res.data.weather[0].main;
  currentHumidity.innerHTML = `${res.data.main.humidity}%`;
  currentWind.innerHTML = `${res.data.wind.speed}km/h`;
};

let handleSearch = (event) => {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  currentCity.innerHTML = input.value;

  let searchedCity = input.value;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${apiKey}`
    )
    .then(showSearchedWeather);
};

searchForm.addEventListener("submit", handleSearch);
