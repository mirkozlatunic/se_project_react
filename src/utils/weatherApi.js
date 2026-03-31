import { checkResponse } from './api'

const DEFAULT_LATITUDE = 33.8492
const DEFAULT_LONGITUDE = -118.3884
const APIkey = process.env.REACT_APP_WEATHER_API_KEY

export const getForcastWeather = (lat = DEFAULT_LATITUDE, lon = DEFAULT_LONGITUDE) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`
  ).then(checkResponse)
}

export const getCoordinates = (city) => {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${APIkey}`
  )
    .then(checkResponse)
    .then((results) => {
      if (!results.length) return Promise.reject("City not found")
      const { lat, lon, name } = results[0]
      return { lat, lon, name }
    })
}

const weatherConditionMap = {
  Clear: { day: "sunny", night: "moon" },
  Clouds: { day: "cloudy", night: "cloud" },
  Fog: { day: "foggy", night: "fog" },
  Mist: { day: "foggy", night: "fog" },
  Haze: { day: "foggy", night: "fog" },
  Rain: { day: "rainy", night: "rain" },
  Drizzle: { day: "rainy", night: "rain" },
  Snow: { day: "snowy", night: "snow" },
  Thunderstorm: { day: "stormy", night: "storm" },
}

export const parseWeatherData = (data) => {
  const main = data.main
  const temperature = main && main.temp
  const nowSeconds = Date.now() / 1000
  const isDay = nowSeconds >= data.sys.sunrise && nowSeconds < data.sys.sunset
  const condition = data.weather?.[0]?.main || "Clear"
  const conditionMap = weatherConditionMap[condition] || weatherConditionMap.Clear
  const weatherType = isDay ? conditionMap.day : conditionMap.night
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
    weatherType,
    isDay,
  }
  return weather
}

export const parseLocationData = (data) => {
  const locationName = data.name
  return locationName
}
