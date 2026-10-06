import { getTemperatureCategory } from "./temperature";

describe("getTemperatureCategory", () => {
  test.each([
    [86, "F", "hot"],
    [85, "F", "warm"],
    [66, "F", "warm"],
    [65, "F", "cold"],
    [0, "F", "cold"],
    [30, "C", "hot"],
    [29, "C", "warm"],
    [19, "C", "warm"],
    [18, "C", "cold"],
    [0, "C", "cold"],
  ])("%d°%s is %s", (temp, unit, expected) => {
    expect(getTemperatureCategory(temp, unit)).toBe(expected);
  });

  test("returns undefined while the temperature is unknown", () => {
    expect(getTemperatureCategory(undefined, "F")).toBeUndefined();
    expect(getTemperatureCategory(null, "C")).toBeUndefined();
  });
});
