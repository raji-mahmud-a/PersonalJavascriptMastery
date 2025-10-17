  const Locator = (async () => {
  //==========  Variables Declaration =========//
  const LocationIQAPI_KEY = 'pk.503d6bf94a473414c92b66c4ee1c162d'
  //========== Dom Element Selection ==========//
  
  //===========  Location Finding =============//
          
const iplocation = async () => {
  try {
    console.log('Moving to Fallbacm Ip Method')
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
      console.log('Using Geolocation Api for Location Details')
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
  try {
    const geoPromise = geoLocation()
    const ipPromise = iplocation()
    
    const coords = await geoPromise.catch((error)=> {
      console.log(error.message)
      return ipPromise
    })
    
    return coords
  } catch (error) {
    console.error('Could not determine any location:');
    console.dir(error)
    throw new Error('Failed to retrieve location data.');
  }
}

const coordinates = await getCoordinates()

async function getAndLogLocationIQ() {
  const url = `https://us1.locationiq.com/v1/reverse?key=${LocationIQAPI_KEY}&lat=${coordinates.lat}&lon=${coordinates.lon}&format=json`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    return data.address.county
  } catch (error) {
    console.error("❌ ERROR during LocationIQ API call:", error);
  }
}

const cityName = await getAndLogLocationIQ()



return {
  Coords: coordinates,
  City: cityName
}
})

export default Locator