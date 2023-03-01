import AuthBar from "../header/authBar";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import * as hooks from "../../hook";

const InitialState = {
  user: {
    value: {
      name: "",
      token: "",
    },
  },
};

const AuthState = {
  user: {
    value: {
      name: "John Smitt",
      token: "UserToken",
    },
  },
};

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

const mock = jest.spyOn(hooks, "useAppSelector");
const mockDispatch = jest.spyOn(hooks, "useAppDispatch");

describe("AuthBar", () => {
  it("should create AuthBar with not authorized user", () => {
    mock.mockImplementation((selector) => selector(InitialState));
    mockDispatch.mockReturnValue(jest.fn());
    act(() => {
      createRoot(container).render(<AuthBar />);
    });
    expect(container).toMatchSnapshot();
  });

  it("should create AuthBar with authorized user", () => {
    mock.mockImplementation((selector) => selector(AuthState));
    mockDispatch.mockReturnValue(jest.fn());
    act(() => {
      createRoot(container).render(<AuthBar />);
    });
    expect(container).toMatchSnapshot();
  });
});
