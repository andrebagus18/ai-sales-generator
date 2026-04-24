/** @jest-environment node */

import { getToken } from "next-auth/jwt";

jest.mock("next-auth/jwt", () => ({
  getToken: jest.fn(),
}));

describe("Middleware Redirects", () => {
  let middlewareFn: (request: Parameters<(typeof import("@/middleware"))["middleware"]>[0]) => ReturnType<(typeof import("@/middleware"))["middleware"]>;

  beforeAll(async () => {
    const imported = await import("@/middleware");
    middlewareFn = imported.middleware;
  });

  test("redirects unauthenticated user from /home to /login", async () => {
    (getToken as jest.Mock).mockResolvedValue(null);

    const request = {
      nextUrl: { pathname: "/home" },
      url: "http://localhost:3000/home",
    } as Parameters<typeof middlewareFn>[0];
    const response = await middlewareFn(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/login?callbackUrl=%2Fhome");
  });

  test("redirects authenticated user away from /register to /dashboard", async () => {
    (getToken as jest.Mock).mockResolvedValue({ sub: "1" });

    const request = {
      nextUrl: { pathname: "/register" },
      url: "http://localhost:3000/register",
    } as Parameters<typeof middlewareFn>[0];
    const response = await middlewareFn(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/dashboard");
  });
});

