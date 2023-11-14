export const WeatherOptions = [
  {
    url: require("../images/day/sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../images/day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../images/day/foggy.svg").default,
    day: true,
    type: "foggy",
  },
  {
    url: require("../images/day/rainy.svg").default,
    day: true,
    type: "rainy",
  },
  {
    url: require("../images/day/snowy.svg").default,
    day: true,
    type: "snowy",
  },
  {
    url: require("../images/day/stormy.svg").default,
    day: true,
    type: "stormy",
  },
  {
    url: require("../images/night/moon.svg").default,
    day: false,
    type: "moon",
  },
  {
    url: require("../images/night/cloud.svg").default,
    day: false,
    type: "cloud",
  },
  {
    url: require("../images/night/fog.svg").default,
    day: false,
    type: "fog",
  },
  {
    url: require("../images/night/rain.svg").default,
    day: false,
    type: "rain",
  },
  {
    url: require("../images/night/snow.svg").default,
    day: false,
    type: "snow",
  },
  {
    url: require("../images/night/storm.svg").default,
    day: false,
    type: "storm",
  },
];

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "api.hwpo-hstl.jumpingcrabs.com"
    : "http://localhost:3001";

export const headers = {
  authorization: "",
  "Content-Type": "application/json",
};
