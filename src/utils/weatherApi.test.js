import { parseWeatherData } from "./weatherApi";

const base = {
  main: { temp: 71.6 },
  sys: { sunrise: 0, sunset: Math.floor(Date.now() / 1000) + 3600 },
  weather: [{ main: "Clear" }],
  name: "Rome",
};

describe("parseWeatherData", () => {
  test("rounds and converts temperature", () => {
    const { temperature } = parseWeatherData(base);
    expect(temperature).toEqual({ F: 72, C: 22 });
  });

  test("uses day/night variants", () => {
    expect(parseWeatherData(base)).toMatchObject({ isDay: true, weatherType: "sunny" });
    const night = { ...base, sys: { sunrise: 0, sunset: 1 } };
    expect(parseWeatherData(night)).toMatchObject({ isDay: false, weatherType: "moon" });
  });

  test("maps newer conditions and falls back to clear", () => {
    expect(parseWeatherData({ ...base, weather: [{ main: "Smoke" }] }).weatherType).toBe("foggy");
    expect(parseWeatherData({ ...base, weather: [{ main: "Whatever" }] }).weatherType).toBe("sunny");
  });

  test("handles zero degrees", () => {
    expect(parseWeatherData({ ...base, main: { temp: 0 } }).temperature.F).toBe(0);
  });
});
