import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const user = { _id: "u1", name: "Ann", email: "ann@x.co", avatar: "http://a.co/a.png" };
const weather = {
  main: { temp: 70 },
  sys: { sunrise: 0, sunset: Math.floor(Date.now() / 1000) + 3600 },
  weather: [{ main: "Clear" }],
  name: "Testville",
};

const res = (status, body) =>
  Promise.resolve({ ok: status < 300, status, json: () => Promise.resolve(body) });

let routes;
beforeEach(() => {
  localStorage.clear();
  routes = {
    "GET openweathermap": () => res(200, weather),
    "GET /items": () => res(200, []),
  };
  global.fetch = jest.fn((url, opts = {}) => {
    const key = Object.keys(routes).find((k) => {
      const [method, part] = k.split(" ");
      return (opts.method || "GET") === method && url.includes(part);
    });
    if (!key) throw new Error(`unmocked ${opts.method || "GET"} ${url}`);
    return routes[key](opts);
  });
});

const renderApp = (path = "/") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test("sign up logs the user in and opens the profile", async () => {
  routes["POST /signup"] = () => res(201, { name: user.name, email: user.email, avatar: user.avatar });
  routes["POST /signin"] = () => res(200, { token: "tok" });
  routes["GET /users/me"] = () => res(200, user);
  renderApp();

  userEvent.click(await screen.findByText("Sign Up"));
  userEvent.type(await screen.findByPlaceholderText("Email"), user.email);
  userEvent.type(screen.getByPlaceholderText("Password"), "secret");
  userEvent.type(screen.getByPlaceholderText("Name"), user.name);
  userEvent.type(screen.getByPlaceholderText("Avatar URL"), user.avatar);
  userEvent.click(screen.getByText("Next"));

  expect(await screen.findByText("Your items:")).toBeInTheDocument();
  expect(localStorage.getItem("jwt")).toBe("tok");
});

test("shows the backend message on a failed login", async () => {
  routes["POST /signin"] = () => res(401, { message: "Incorrect email or password" });
  renderApp();

  userEvent.click(await screen.findByText("Log In"));
  userEvent.type(await screen.findByPlaceholderText("Email"), user.email);
  userEvent.type(screen.getByPlaceholderText("Password"), "wrong");
  userEvent.click(screen.getByRole("button", { name: "Log in" }));

  expect(await screen.findByRole("alert")).toHaveTextContent("Incorrect email or password");
  expect(localStorage.getItem("jwt")).toBeNull();
});

test("a valid stored token keeps the user on /profile after reload", async () => {
  localStorage.setItem("jwt", "tok");
  routes["GET /users/me"] = () => res(200, user);
  renderApp("/profile");
  expect(await screen.findByText("Your items:")).toBeInTheDocument();
});

test("an expired token is cleared and the user lands on home", async () => {
  localStorage.setItem("jwt", "old");
  routes["GET /users/me"] = () => res(401, { message: "Authorization Required" });
  renderApp("/profile");
  await waitFor(() => expect(localStorage.getItem("jwt")).toBeNull());
  expect(await screen.findByText("Sign Up")).toBeInTheDocument();
});

test("0° is shown as 0, not a placeholder", async () => {
  routes["GET openweathermap"] = () => res(200, { ...weather, main: { temp: 32 } });
  renderApp();
  expect(await screen.findByText(/Today is 32°F/)).toBeInTheDocument();
});
