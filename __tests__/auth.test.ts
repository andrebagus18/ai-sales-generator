import bcrypt from "bcrypt";
import { verifyUserCredentials } from "@/lib/auth/credentials";
import { prisma } from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

describe("User Authentication", () => {
  test("login success returns user object", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Akhma",
      email: "akhma@example.com",
      password: "hashed-password",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await verifyUserCredentials("akhma@example.com", "password123");

    expect(result).toEqual({
      id: "1",
      name: "Akhma",
      email: "akhma@example.com",
    });
  });

  test("login fail returns null", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Akhma",
      email: "akhma@example.com",
      password: "hashed-password",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const result = await verifyUserCredentials("akhma@example.com", "wrong-pass");

    expect(result).toBeNull();
  });
});

