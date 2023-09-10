// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

const latitude = 33.8492
const longitude = -118.3884
const APIkey = '2a24d49b295abd7cb934e7e77d5a9228'

export const getForcastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Error: ${res.status}`)
    }
  })
  return weatherApi
}

export const parseWeatherData = (data) => {
  const main = data.main
  const temperature = main && main.temp
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  }
  return weather
}

export const parseLocationData = (data) => {
  const locationName = data.name
  return locationName
}
