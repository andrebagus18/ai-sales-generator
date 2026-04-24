"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getCurrentUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return Number(session.user.id);
}

export async function togglePublishSalesPage(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const isPublished = String(formData.get("isPublished") ?? "") === "true";
  const userId = await getCurrentUserId();

  if (!id) {
    throw new Error("Invalid sales page id.");
  }

  await prisma.salesPage.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      isPublished: !isPublished,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/p/${id}`);
}

export async function deleteSalesPage(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const userId = await getCurrentUserId();

  if (!id) {
    throw new Error("Invalid sales page id.");
  }

  await prisma.salesPage.deleteMany({
    where: {
      id,
      userId,
    },
  });

  revalidatePath("/dashboard");
}

