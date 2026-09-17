"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function createTenant(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const waNumber = formData.get("waNumber") as string;
  const logoUrl = formData.get("logoUrl") as string;
  const address = formData.get("address") as string;

  // Generate simple slug
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  await prisma.tenant.create({
    data: {
      name,
      slug,
      type,
      description,
      waNumber,
      logoUrl: logoUrl || null,
      address: address || null,
      userId: session.user.id,
    },
  });

  revalidatePath("/admin/tenants");
  revalidatePath("/tenants");
  revalidatePath("/");
  
  redirect("/admin/tenants");
}
