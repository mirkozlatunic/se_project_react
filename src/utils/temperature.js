// Returns "hot" | "warm" | "cold" for a temperature in the given unit ("F" | "C"),
// or undefined when the temperature is not known yet.
export const getTemperatureCategory = (temp, unit) => {
  if (temp === undefined || temp === null) return undefined;
  const [hotFrom, warmFrom] = unit === "F" ? [86, 66] : [30, 19];
  if (temp >= hotFrom) return "hot";
  if (temp >= warmFrom) return "warm";
  return "cold";
};
