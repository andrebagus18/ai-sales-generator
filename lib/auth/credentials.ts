import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
};

export async function verifyUserCredentials(
  email: string,
  password: string,
): Promise<AuthenticatedUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  if (!user.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  return {
    id: String(user.id),
    name: user.name ?? "",
    email: user.email ?? "",
  };
}
