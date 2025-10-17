//========  File Imports  ========//
import Toast from './assets/toast.js';

const app = (async() => {
  const bodym = document.getElementById('main')
  
  const Locator = async () => {
  const LocationIQAPI_KEY = 'pk.503d6bf94a473414c92b66c4ee1c162d'
  
  const toast = Toast
  
const iplocation = async () => {
  try {
    const ipLocation = await fetch('https://ipapi.co/json/');
    const data = await ipLocation.json();
    return { lat: data.latitude, lon: data.longitude };
  } catch (error) {
    console.log('IP location Failed:', error)
    throw new Error('Failed to get location by IP')
  }
}

const geoLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position)=> {
      resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    },(error)=> {
      console.log('Geolocation Api Error:', error.message)
      reject(new Error('Geolocation API Failed', error.message))
    },{
      timeout: 4000
    })
  })
}

const getCoordinates = async () => {
  let loadingToastController;
  try {
    loadingToastController = await toast.info("Finding your location...", 0);
    const geoPromise = geoLocation()
    const ipPromise = iplocation()
    
    const coords = await geoPromise.catch(async (error)=> {
      console.log(error.message)
      return ipPromise
    })
    
    loadingToastController.dismiss()
    await toast.success("Location coordinates retrieved!", 2000);
    return coords
  } catch (error) {
    if (loadingToastController) {
      loadingToastController.dismiss();
    }
    await toast.error("Could not determine your location. Please check your permissions or connection.", 7000);
    console.error('Could not determine any location:');
    console.dir(error)
    throw new Error('Failed to retrieve location data.');
  }
}

const coordinates = await getCoordinates()

async function getAndLogLocationIQ() {
  if (!coordinates || !coordinates.lat || !coordinates.lon) {
    return "Unknown City";
  }

  let reverseToastController;
  try {
    reverseToastController = await toast.info("Getting city name...", 0);

    const url = `https://us1.locationiq.com/v1/reverse?key=${LocationIQAPI_KEY}&lat=${coordinates.lat}&lon=${coordinates.lon}&format=json`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    const cityName = data.address.county || data.address.city || data.address.town || 'Unknown City';
    
    reverseToastController.dismiss();
    await toast.success(`We found you in ${cityName}!`, 3000);
    
    return cityName
  } catch (error) {
    if (reverseToastController) {
      reverseToastController.dismiss();
    }
    await toast.warning("City name could not be resolved. Coordinates are available.", 5000);
    console.error("❌ ERROR during LocationIQ API call:", error);
    return "Unknown City";
  }
}

const cityName = await getAndLogLocationIQ()

return {
  Coords: coordinates,
  City: cityName
}
}
  const Weather = async (location) => {
  // ============================================
// HELPER FUNCTIONS
// ============================================
const toast = Toast
/**
 * Convert weather code to description
 */
function getWeatherDescription(code) {
  const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return weatherCodes[code] || 'Unknown';
}

/**
 * Convert wind direction degrees to cardinal direction
 */
function getWindDirection(degrees) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Get day name from date string
 */
function getDayName(dateStr, index) {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  
  const date = new Date(dateStr);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}

/**
 * Format time from ISO string
 */
function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
}


  
  //=========  GETTING WEATHER DATA ===========//
  async function fetchWeatherData(coords) {
  try {
    // Validate input
    if (!coords || typeof coords.lat !== 'number' || typeof coords.lon !== 'number') {
      throw new Error('Invalid coordinates. Must provide object with latitude and longitude numbers.');
    }
    
    const gottenLocationData = toast.success('Location gotten, Proceeding to getting Weather data')
    
    const { lat, lon } = coords;

    // Build Open-Meteo API URL with Celsius, km/h, and mm units
    const url = `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${lat}&` +
      `longitude=${lon}&` +
      // Current weather - essential parameters only
      `current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,visibility&` +
      // Hourly forecast - next 24 hours
      `hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,visibility,wind_speed_10m,wind_direction_10m,uv_index&` +
      // Daily forecast - 7 days
      `daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&` +
      // Units: Celsius, km/h, mm
      `temperature_unit=celsius&` +
      `wind_speed_unit=kmh&` +
      `precipitation_unit=mm&` +
      `timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    gottenLocationData.dismiss()
    const sucessfulFlow = toast.success('successfully gotten Weather data', 3000)
    function getMoonPhase(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const JD_2000 = 2451550.1;
    
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;
    let JD = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

    const LUNAR_CYCLE = 29.530588853;
    let days = JD - JD_2000;
    let age = days % LUNAR_CYCLE;

    if (age < 0) {
        age += LUNAR_CYCLE;
    }

    const phaseNames = [
        "New Moon 🌑",
        "Waxing Crescent 🌒",
        "First Quarter 🌓",
        "Waxing Gibbous 🌔",
        "Full Moon 🌕",
        "Waning Gibbous 🌖",
        "Last Quarter 🌗",
        "Waning Crescent 🌘"
    ];

    const segment = LUNAR_CYCLE / 8;
    const index = Math.floor(age / segment);

    return phaseNames[index];
}


    // Extract only essential data based on Weather Channel app structure
    const essentialWeatherData = {
      // Location info
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        elevation: data.elevation, // meters
        timezone: data.timezone,
        timezoneAbbreviation: data.timezone_abbreviation
      },

      // Current weather
      current: {
        time: data.current.time,
        temperature: Math.round(data.current.temperature_2m), // °C
        feelsLike: Math.round(data.current.apparent_temperature), // °C
        humidity: data.current.relative_humidity_2m, // %
        weatherCode: data.current.weather_code,
        weatherDescription: getWeatherDescription(data.current.weather_code),
        isDay: data.current.is_day === 1,
        precipitation: data.current.precipitation, // mm
        cloudCover: data.current.cloud_cover, // %
        pressure: Math.round(data.current.pressure_msl), // hPa (mb)
        windSpeed: Math.round(data.current.wind_speed_10m), // km/h
        windDirection: data.current.wind_direction_10m, // degrees
        windDirectionCardinal: getWindDirection(data.current.wind_direction_10m),
        visibility: data.current.visibility ? (data.current.visibility / 1000).toFixed(2) : null // km
      },

      // Today's forecast
      today: {
        high: Math.round(data.daily.temperature_2m_max[0]), // °C
        low: Math.round(data.daily.temperature_2m_min[0]), // °C
        sunrise: data.daily.sunrise[0],
        sunset: data.daily.sunset[0],
        uvIndex: data.daily.uv_index_max[0],
        precipitationSum: data.daily.precipitation_sum[0], // mm
        precipitationProbability: data.daily.precipitation_probability_max[0], // %
        weatherCode: data.daily.weather_code[0]
      },

      // Hourly forecast (next 24 hours)
      hourly: {
        times: data.hourly.time.slice(0, 24),
        temperatures: data.hourly.temperature_2m.slice(0, 24).map(t => Math.round(t)),
        feelsLike: data.hourly.apparent_temperature.slice(0, 24).map(t => Math.round(t)),
        humidity: data.hourly.relative_humidity_2m.slice(0, 24),
        precipitationProbability: data.hourly.precipitation_probability.slice(0, 24),
        precipitation: data.hourly.precipitation.slice(0, 24),
        weatherCodes: data.hourly.weather_code.slice(0, 24),
        windSpeed: data.hourly.wind_speed_10m.slice(0, 24).map(w => Math.round(w)),
        windDirection: data.hourly.wind_direction_10m.slice(0, 24),
        uvIndex: data.hourly.uv_index.slice(0, 24),
        visibility: data.hourly.visibility.slice(0, 24).map(v => v ? (v / 1000).toFixed(1) : null)
      },

      // 7-day forecast
      daily: data.daily.time.map((date, i) => ({
        date: date,
        dayName: getDayName(date, i),
        high: Math.round(data.daily.temperature_2m_max[i]),
        low: Math.round(data.daily.temperature_2m_min[i]),
        weatherCode: data.daily.weather_code[i],
        weatherDescription: getWeatherDescription(data.daily.weather_code[i]),
        precipitationSum: data.daily.precipitation_sum[i],
        precipitationProbability: data.daily.precipitation_probability_max[i],
        uvIndex: data.daily.uv_index_max[i],
        windSpeed: Math.round(data.daily.wind_speed_10m_max[i]),
        windDirection: data.daily.wind_direction_10m_dominant[i],
        windDirectionCardinal: getWindDirection(data.daily.wind_direction_10m_dominant[i]),
        sunrise: data.daily.sunrise[i],
        sunset: data.daily.sunset[i]
      })),

      moon: getMoonPhase()
    };
    return essentialWeatherData;

  } catch (error) {
    toast.error('ERROR FETCHING WEATHER DATA:', 5000);
    console.error('   Message:', error.message);
    throw error;
  }
}



return fetchWeatherData(location)
}
  bodym.innerHTML = `
  <div class="flex items-center justify-center text-gray-200 h-full w-full">
  <div class="w-6 h-6 border-4 items-center mx-2 border-gray-200 border-t-transparent border-solid rounded-full animate-spin"></div>
  loading.....
</div>
`
  const location = await Locator()
  const data = await Weather(location.Coords)
  
  console.log(data)
  const changeData = ((location, data) => {
    bodym.innerHTML = `
            <!-- Header -->
        <header class="flex items-center justify-start mb-6 pt-4">
            <div class="flex items-center gap-3">
                <i class="fas fa-map-marker-alt text-white text-2xl"></i>
                <h1 id="location-name" class="text-white text-3xl font-semibold">${location. City}</h1>
            </div>
        </header>

        <!-- Main Weather Card -->
        <div class="glass-card rounded-3xl p-8 mb-4">
            <div class="flex justify-between items-center gap-2">
                <div>
                    <div id="current-temp" class="text-white text-7xl font-semibold">${data.current.temperature}°</div>
            
                </div>
                       <div class="text-gray-200 text-xl space-y-1">
                        <div>
                            <i class="fas fa-arrow-up"></i><span id="temp-high"> ${data.today.high}</span> / 
                            <i class="fas fa-arrow-down"></i><span id="temp-low"> ${data.today.low}</span>
                        </div>
                        <div class='text-sm'>Feels like <span id="feels-like"> Feels Like: ${data.current.feelsLike}</span></div>
                    </div>
                <div class="text-right">
                    <div id="weather-icon" class="text-6xl">
                        <i class="fas fa-cloud-sun text-gray-200"></i>
                    </div>
                </div>
            </div>
        </div>

    `
  })(location, data)
})()