import api, { checkResponse } from "./api";
import auth from "./auth";

const jsonResponse = (status, body) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });

beforeEach(() => {
  global.fetch = jest.fn();
  localStorage.clear();
});

describe("checkResponse", () => {
  test("resolves with the JSON body when ok", async () => {
    await expect(checkResponse(await jsonResponse(200, { a: 1 }))).resolves.toEqual({
      a: 1,
    });
  });

  test("rejects with status and backend message", async () => {
    await expect(
      checkResponse(await jsonResponse(409, { message: "Email already exists" }))
    ).rejects.toEqual({ status: 409, message: "Email already exists" });
  });

  test("falls back to a generic message when the body is not JSON", async () => {
    const res = {
      ok: false,
      status: 502,
      json: () => Promise.reject(new Error("not json")),
    };
    await expect(checkResponse(res)).rejects.toEqual({
      status: 502,
      message: "Error: 502",
    });
  });
});

describe("auth", () => {
  test("login posts credentials to /signin", async () => {
    fetch.mockReturnValue(jsonResponse(200, { token: "t" }));
    await expect(auth.login({ email: "a@b.co", password: "pw" })).resolves.toEqual({
      token: "t",
    });
    const [url, options] = fetch.mock.calls[0];
    expect(url).toMatch(/\/signin$/);
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual({ email: "a@b.co", password: "pw" });
  });

  test("getContent sends the bearer token", async () => {
    fetch.mockReturnValue(jsonResponse(200, { _id: "1" }));
    await auth.getContent("tok");
    expect(fetch.mock.calls[0][1].headers.authorization).toBe("Bearer tok");
  });
});

describe("api", () => {
  test("addCardLike uses PUT with the stored jwt", async () => {
    localStorage.setItem("jwt", "tok");
    fetch.mockReturnValue(jsonResponse(200, { _id: "1", likes: [] }));
    await api.addCardLike("1");
    const [url, options] = fetch.mock.calls[0];
    expect(url).toMatch(/\/items\/1\/likes$/);
    expect(options.method).toBe("PUT");
    expect(options.headers.authorization).toBe("Bearer tok");
  });

  test("removeCardLike uses DELETE", async () => {
    fetch.mockReturnValue(jsonResponse(200, {}));
    await api.removeCardLike("1");
    expect(fetch.mock.calls[0][1].method).toBe("DELETE");
  });
});
