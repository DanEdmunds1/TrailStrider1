export async function getWeather(place) {
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=dfde9658bfbc4e0298f110315241101&q=${place}/`)
    return res.json()
}