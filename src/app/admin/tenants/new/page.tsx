import { createTenant } from "@/app/actions/tenant";
import Link from "next/link";

export default function NewTenantPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tambah Tenant Baru</h1>
        <Link 
          href="/admin/tenants" 
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; Kembali
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form action={createTenant} className="space-y-6" encType="multipart/form-data">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Tenant</label>
              <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipe Tenant</label>
              <select name="type" id="type" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="PRODUCT">Toko Produk</option>
                <option value="COMPANY_PROFILE">Profil Perusahaan / Jasa</option>
              </select>
            </div>

            <div>
              <label htmlFor="waNumber" className="block text-sm font-medium text-gray-700">Nomor WhatsApp</label>
              <input type="text" name="waNumber" id="waNumber" required placeholder="081234567890" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea name="description" id="description" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
            </div>

            <div>
              <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Upload Logo/Banner (Google Drive)</label>
              <input type="file" name="imageFile" id="imageFile" accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              <p className="mt-1 text-xs text-gray-500">Atau, masukkan URL langsung di bawah jika tidak ingin upload:</p>
            </div>

            <div>
              <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">Logo URL (opsional)</label>
              <input type="url" name="logoUrl" id="logoUrl" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat (opsional)</label>
              <textarea name="address" id="address" rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
            >
              Simpan Tenant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
