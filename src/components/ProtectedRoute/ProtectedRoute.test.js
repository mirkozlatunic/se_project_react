import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const renderAt = (props) =>
  render(
    <MemoryRouter initialEntries={["/profile"]}>
      <Route exact path="/">
        <div>home</div>
      </Route>
      <ProtectedRoute path="/profile" {...props}>
        <div>profile</div>
      </ProtectedRoute>
    </MemoryRouter>
  );

test("renders children when logged in", () => {
  renderAt({ loggedIn: true });
  expect(screen.getByText("profile")).toBeInTheDocument();
});

test("redirects home when logged out", () => {
  renderAt({ loggedIn: false });
  expect(screen.getByText("home")).toBeInTheDocument();
});

test("does not redirect while the token is being checked", () => {
  renderAt({ loggedIn: false, isCheckingAuth: true });
  expect(screen.queryByText("home")).not.toBeInTheDocument();
  expect(screen.queryByText("profile")).not.toBeInTheDocument();
});
