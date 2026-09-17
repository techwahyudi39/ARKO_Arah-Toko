import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function AdminItemsPage() {
  const items = await prisma.item.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      tenant: {
        select: { name: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Produk & Layanan</h1>
        <Link 
          href="/admin/items/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
        >
          + Tambah Item
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Tenant Induk</th>
                <th className="px-6 py-4">Tipe</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => {
                let image = null;
                try {
                  if (item.images) {
                    const parsed = JSON.parse(item.images);
                    image = parsed.length > 0 ? parsed[0] : null;
                  }
                } catch(e) {}

                return (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative">
                          {image ? (
                            <Image src={image} alt={item.name} fill className="object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-1 max-w-[200px] truncate">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm font-medium">
                      {item.tenant.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md border ${
                        item.type === 'PRODUCT' 
                          ? 'border-blue-200 bg-blue-50 text-blue-700' 
                          : 'border-purple-200 bg-purple-50 text-purple-700'
                      }`}>
                        {item.type === 'PRODUCT' ? 'Produk' : 'Layanan'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {item.price ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full ${
                        item.isActive ? 'text-green-700 bg-green-50' : 'text-gray-600 bg-gray-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {item.isActive ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link href={`/admin/items/${item.id}/edit`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        Edit
                      </Link>
                      <button className="text-sm font-medium text-red-600 hover:text-red-800">
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })}
              
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Belum ada produk/jasa yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
