function ShowCurrentTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = now.getFullYear();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let today = `${day} ${month} ${date} ${year} ${hours}:${minutes}`;
  return today;
}
let currentTime = document.querySelector(".todaysDate");
currentTime.innerHTML = ShowCurrentTime();

//City Temperature

function getForecast(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let weatherDescription = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;

  let temperatureElement = document.querySelector("#current-temperature");
  let currentCity = document.querySelector("#city");
  let currentDescription = document.querySelector(".temperatureDescription");
  let iconElement = document.querySelector("#weather-icon");
  let windElement = document.querySelector(".currentWind");
  let humidityElement = document.querySelector(".currentHumidity");

  celsiusTemperature = temperature;

  currentCity.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  currentDescription.innerHTML = weatherDescription;
  windElement.innerHTML = wind;
  humidityElement.innerHTML = humidity;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//Display 7 day forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

  let forecastHTML = `<div class = "row">`;

  days.forEach(function(day) {
    forecastHTML = forecastHTML +

    `
       <div class="col-2">
       <div class="weather-forecast-date"> ${day} </div>
            <img
              src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
              alt=""
              width="40"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> 24° </span>
              <span class="weather-forecast-temperature-min"> 18° </span>
            </div>
          </div>
      </div>
`;
  });

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML=forecastHTML;

}

function showCity(event) {
event.preventDefault();
  let input = document.querySelector("#city-input");
  let apiKey = "3b84ea0ac292fdb123e51ed8486c395a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getForecast);
   }


let formInput = document.querySelector("#search-city");
formInput.addEventListener("submit", showCity);

function cityCoordinates(position) {
  let apiKey = "3b84ea0ac292fdb123e51ed8486c395a";
  let lat = position.coords.latitude;
  lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getForecast);
}

function search(city) {
   let apiKey = "3b84ea0ac292fdb123e51ed8486c395a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//Current Location Co-ordinates

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(cityCoordinates);
}

let currentWeather = document.querySelector("#current-location");
currentWeather.addEventListener("click", showCurrent);

//Change Temperature - Celsius/Fahrenheit

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  currentTemperatureElement.innerHTML = Math.round(celsiusTemperature);
}

search("London");
displayForecast();

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-temperature");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-temperature");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
