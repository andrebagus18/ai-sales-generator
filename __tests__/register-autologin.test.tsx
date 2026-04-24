import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "@/app/register/page";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Register auto-login flow", () => {
  const replaceMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    replaceMock.mockReset();
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    }) as jest.Mock;
    (signIn as jest.Mock).mockResolvedValue({ error: undefined });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test("creates account, signs in, then replaces route to dashboard", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<RegisterPage />);

    await user.type(screen.getByPlaceholderText("Full name"), "Akhma User");
    await user.type(screen.getByPlaceholderText("Email"), "akhma@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/register",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      );
    });

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith(
        "credentials",
        expect.objectContaining({
          email: "akhma@example.com",
          password: "password123",
          redirect: false,
        }),
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Registration successful/i)).toBeInTheDocument();
    });
    expect(window.location.search).toBe("");
    expect(window.location.href).not.toContain("akhma%40example.com");
    expect(window.location.href).not.toContain("password123");
    expect(replaceMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(900);
    });
    expect(replaceMock).toHaveBeenCalledWith("/dashboard");
  });
});

