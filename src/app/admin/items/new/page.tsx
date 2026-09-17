import { createItem } from "@/app/actions/item";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function NewItemPage() {
  const tenants = await prisma.tenant.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tambah Produk / Layanan</h1>
        <Link 
          href="/admin/items" 
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; Kembali
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form action={createItem} className="space-y-6" encType="multipart/form-data">
          <div className="space-y-4">
            <div>
              <label htmlFor="tenantId" className="block text-sm font-medium text-gray-700">Pilih Tenant Induk</label>
              <select name="tenantId" id="tenantId" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="">-- Pilih Tenant --</option>
                {tenants.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.type === 'PRODUCT' ? 'Toko' : 'Jasa'})</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Item</label>
              <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipe Item</label>
              <select name="type" id="type" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="PRODUCT">Produk (Barang)</option>
                <option value="SERVICE">Layanan (Jasa)</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Harga (Rp - opsional)</label>
              <input type="number" name="price" id="price" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea name="description" id="description" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
            </div>

            <div>
              <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Upload Gambar (Google Drive)</label>
              <input type="file" name="imageFile" id="imageFile" accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              <p className="mt-1 text-xs text-gray-500">Atau, masukkan URL langsung di bawah jika tidak ingin upload:</p>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL Gambar (opsional)</label>
              <input type="url" name="imageUrl" id="imageUrl" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">Status</label>
              <select name="isActive" id="isActive" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="true">Aktif (Tampilkan di web)</option>
                <option value="false">Nonaktif (Sembunyikan)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
            >
              Simpan Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
