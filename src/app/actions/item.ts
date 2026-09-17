"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function createItem(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const tenantId = formData.get("tenantId") as string;
  const description = formData.get("description") as string;
  const priceStr = formData.get("price") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const isActiveStr = formData.get("isActive") as string;

  const price = priceStr ? parseFloat(priceStr) : null;
  const isActive = isActiveStr === "true";
  
  let finalImageUrl = formData.get("imageUrl") as string;
  const imageFile = formData.get("imageFile") as File;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    try {
      const { uploadToGoogleDrive } = await import("@/lib/gdrive");
      finalImageUrl = await uploadToGoogleDrive(buffer, imageFile.name, imageFile.type);
    } catch (e) {
      console.error("Failed to upload image to GDrive:", e);
      // optionally fallback to generic placeholder or throw error
    }
  }
  
  // Format image as JSON array of 1 string if provided
  const images = finalImageUrl ? JSON.stringify([finalImageUrl]) : null;

  // Generate simple slug
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  await prisma.item.create({
    data: {
      name,
      slug,
      type,
      description,
      price,
      images,
      isActive,
      tenantId,
    },
  });

  revalidatePath("/admin/items");
  revalidatePath(`/tenants/${slug}`); // Not exact, but we'd need tenant slug
  revalidatePath("/");
  
  redirect("/admin/items");
}
