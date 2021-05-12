const weather = document.querySelector(".js-weather");
const API_KEY = "23630bbccfac33c88748bff9cb8b8662";
const COORDS = `coords`;

function getWeather(lat, lng) {
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)

.then(function (response) {
return response.json();
})
.then(function name(json) {
const temperature = json.main.temp;
const place = json.name;
weather.innerText = `${temperature}°
${place}`;
});
}

function saveCoords(coordsObj) {
localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
const coordsObj = {
latitude,
longitude
};
saveCoords(coordsObj);
getWeather(latitude, longitude);
}

function handleGeoError (params) {
console.log("cant access geo location");
}

function askForCoords(params) {
navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(params) {
const loadedCoords = localStorage.getItem(COORDS);
if(loadedCoords == null){
askForCoords();
} else{
const parsedCoords = JSON.parse(loadedCoords);
getWeather(parsedCoords.latitude, parsedCoords.longitude);
}
}

function init(params) {
loadCoords();
}
init();