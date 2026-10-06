import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalWithForm from "./ModalWithForm";

const setup = (props = {}) => {
  const handlers = { onClose: jest.fn(), onSubmit: jest.fn((e) => e.preventDefault()), altSubmit: jest.fn() };
  render(
    <ModalWithForm title="Test" isEnabled {...handlers} {...props}>
      <input aria-label="field" />
    </ModalWithForm>
  );
  return handlers;
};

test("alt button does not submit the form", () => {
  const h = setup({ altText: "or Register" });
  userEvent.click(screen.getByText("or Register"));
  expect(h.altSubmit).toHaveBeenCalledTimes(1);
  expect(h.onSubmit).not.toHaveBeenCalled();
});

test("no alt button without altText", () => {
  setup();
  expect(screen.queryByText("or Register")).not.toBeInTheDocument();
  expect(screen.getAllByRole("button").map((b) => b.type)).toEqual(["button", "submit"]);
});

test("shows an error message", () => {
  setup({ error: "Email already exists" });
  expect(screen.getByRole("alert")).toHaveTextContent("Email already exists");
});

test("overlay click closes, inner click does not", () => {
  const h = setup();
  userEvent.click(screen.getByLabelText("field"));
  expect(h.onClose).not.toHaveBeenCalled();
  userEvent.click(screen.getByRole("dialog"));
  expect(h.onClose).toHaveBeenCalledTimes(1);
});

test("submit is disabled when not enabled", () => {
  setup({ isEnabled: false });
  expect(screen.getByText("Add garment")).toBeDisabled();
});
