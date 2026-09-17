const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data with hashed passwords...');

  // Hapus data lama
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Buat User (Super Admin & Tenant Editor)
  const superAdmin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@tenantkatalog.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  // Karena ini single admin, kita tetap simpan data tenant dengan userId superAdmin
  // (atau kita bisa biarkan struktur tetap, ini hanya data contoh)

  // 2. Buat Tenant 1 (Tenant Produk)
  const tenant1 = await prisma.tenant.create({
    data: {
      name: 'Tech Store Indo',
      slug: 'tech-store-indo',
      type: 'PRODUCT',
      description: 'Pusat gadget, laptop, dan aksesoris komputer terlengkap dengan garansi resmi dan kualitas terbaik.',
      logoUrl: 'https://images.unsplash.com/photo-1525130413817-d45c1d127c42?w=800&q=80',
      waNumber: '081234567890',
      address: 'Jl. Sudirman No. 123, Jakarta',
      socialMedia: JSON.stringify({ instagram: '@techstoreindo', facebook: 'Tech Store Indo' }),
      userId: superAdmin.id, // Assigned to super admin
    },
  });

  // 3. Buat Tenant 2 (Tenant Company Profile/Jasa)
  const tenant2 = await prisma.tenant.create({
    data: {
      name: 'Creative Design Studio',
      slug: 'creative-design-studio',
      type: 'COMPANY_PROFILE',
      description: 'Solusi untuk kebutuhan visual Anda. Kami melayani desain grafis, UI/UX, branding, dan social media management.',
      logoUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      waNumber: '089876543210',
      address: 'Jl. Gatot Subroto No. 45, Bandung',
      socialMedia: JSON.stringify({ instagram: '@creativedesign' }),
      userId: superAdmin.id, // Assigned to super admin
    },
  });

  // 4. Buat Item untuk Tenant 1 (Produk)
  await prisma.item.create({
    data: {
      name: 'Laptop Pro X 2024',
      slug: 'laptop-pro-x-2024',
      type: 'PRODUCT',
      description: 'Laptop canggih dengan prosesor generasi terbaru, RAM 16GB, dan SSD 1TB. Cocok untuk desain dan gaming.',
      price: 15000000,
      images: JSON.stringify(['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80']),
      tenantId: tenant1.id,
    },
  });

  await prisma.item.create({
    data: {
      name: 'Mechanical Keyboard RGB',
      slug: 'mechanical-keyboard-rgb',
      type: 'PRODUCT',
      description: 'Keyboard mekanikal dengan switch biru, backlight RGB yang dapat disesuaikan, dan material tahan lama.',
      price: 1200000,
      images: JSON.stringify(['https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80']),
      tenantId: tenant1.id,
    },
  });

  // 5. Buat Item untuk Tenant 2 (Jasa)
  await prisma.item.create({
    data: {
      name: 'Paket Branding Lengkap',
      slug: 'paket-branding-lengkap',
      type: 'SERVICE',
      description: 'Termasuk pembuatan logo, palet warna, tipografi, dan panduan identitas visual (Brand Guidelines).',
      price: 5000000,
      images: JSON.stringify(['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80']),
      tenantId: tenant2.id,
    },
  });

  await prisma.item.create({
    data: {
      name: 'Desain UI/UX Aplikasi Mobile',
      slug: 'desain-ui-ux-mobile',
      type: 'SERVICE',
      description: 'Rancangan antarmuka pengguna untuk aplikasi mobile iOS dan Android lengkap dengan interaksi.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80']),
      tenantId: tenant2.id,
    },
  });

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
