const apiKey = '92c0bd1507da111c3c4de12e4ba0e369';
const selectEl = document.getElementById('citySelect');
const btn = document.getElementById('searchBtn');
const errEl = document.getElementById('error');
const card = document.getElementById('weatherCard');
const cityNameEl = document.getElementById('cityName');
const iconEl = document.getElementById('weatherIcon');
const tempEl = document.getElementById('temperature');
const condEl = document.getElementById('condition');
const humEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

btn.addEventListener('click', () => {
  const city = selectEl.value;
  if (!city) return showError('कृपया एक शहर चुनें।');
  fetchWeather(city);
});

async function fetchWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    if (!res.ok) return showError(data.message || 'शहर नहीं मिला!');
    displayWeather(data);
  } catch {
    showError('नेटवर्क त्रुटि, पुनः प्रयास करें।');
  }
}

function displayWeather(data) {
  errEl.textContent = '';
  card.classList.remove('hidden');
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  condEl.textContent = data.weather[0].description;
  humEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${data.wind.speed} m/s`;
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconEl.alt = data.weather[0].description;
}

function showError(message) {
  errEl.textContent = message;
  card.classList.add('hidden');
}

