/*
 * @author godndas2
 * weather.js
 * */

const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weather = document.querySelector(".js-weather .weather__text");

function getWeather(coords) {
	fetch(
			`${WEATHER_API}lat=${coords.lat}&lon=${
		      coords.lng
		    }&appid=${API_KEY}&units=metric`
		  )
		  .then(response => response.json())
		  .then(json => {
			  const name = json.name;
			  const temp = json.main.temp;
			  weather.innerHTML = `${Math.floor(temp)}° @ ${name}`;
		  });
}

function handleGeo(position) {
	const lat = position.coords.latitude;
	const lng = position.coords.longitude;
	const coords = {
			lat,
			lng
	};
	localStorage.setItem("coords", JSON.stringify(coords));
	getWeather(coords);
}

function handleGeoFail() {
	console.log("no location");
}

function loadWeather() {
	const currentCoords = localStorage.getItem("coords");
	if (currentCoords !== null) {
		const parsedCoords = JSON.parse(currentCoords);
		getWeather(parsedCoords);
		return;
	} else {
		navigator.geolocation.getCurrentPosition(
				handleGeo,
				handleGeoFail
				);
	}
}

function init() {
	  loadWeather();
	}

	init();