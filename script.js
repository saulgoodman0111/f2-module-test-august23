const fetchDataBtn = document.querySelector("#fbtn");

const mapView = document.querySelector(".map");
const detailsData = document.querySelector(".data");
const locationData = document.querySelector(".locationData");
const api = "9af689bf8a0c10193a12be219f1d8a92";

async function getData(lat, long) {
  const promise = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=current&appid=${api}`
  );
  return await promise.json();
}

async function gotLocation(position) {
  const result = await getData(
    position.coords.latitude,
    position.coords.longitude
  );
  console.log(result);
  detailData(result);
}



fetchDataBtn.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(gotLocation);
});

function removeDom() {
  document.querySelector(".first").remove();
}

function detailData(result) {
  removeDom();
  const url = `https://maps.google.com/maps/?q=${result.coord.lat},${result.coord.lon}&output=embed`;
  locationData.innerHTML = `
  <div class="top">
          <h1>Welcome To The Weather Display Dashboard</h1>
          <p>Your Location Coordinates are:</p>
          <div class="latlong">
            <p>Lat:<span class="lat">${result.coord.lat}\u00B0E</span></p>
            <p>Long:<span class="long"> ${result.coord.lon}\u00B0N</span></p>
          </div>
          <div class="map" id="map">
          <iframe
          src=${url}
          width="360"
          height="270"
          frameborder="0"
          style="border:0;width: 90vw;
          height: 65vh;margin-top:3rem; border-radius:1rem"></iframe>
          </div>
        </div>
  <div class="down">
          <div>
            <h2>The data of ${result.name},${result.sys.country}:</h2>
          </div>
          <div class="data">
          <p>Location:${result.name}, ${result.sys.country}</p>
            <p>Wind Speed:${result.wind.speed} kmph</span></p>
            <p>Humidity:${result.main.humidity} %</p>
            <p>Time Zone:${result.timezone/3600} hrs+GMT</p>
            <p>Pressure:${result.main.pressure} bar</p>
            <p>Wind Direction:${result.wind.deg}</p>
            <p>Feels like:${Math.floor(result.main.feels_like-273)}\u00B0 C</p>
          </div>
        </div>
    `;
}