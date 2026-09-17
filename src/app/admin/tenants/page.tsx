import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function AdminTenantsPage() {
  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { items: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Tenant</h1>
        <Link 
          href="/admin/tenants/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
        >
          + Tambah Tenant
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                <th className="px-6 py-4">Nama Tenant</th>
                <th className="px-6 py-4">Tipe</th>
                <th className="px-6 py-4">Total Item</th>
                <th className="px-6 py-4">No. WA</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{tenant.name}</div>
                    <div className="text-xs text-gray-500 mt-1">/{tenant.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      tenant.type === 'PRODUCT' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-purple-50 text-purple-700'
                    }`}>
                      {tenant.type === 'PRODUCT' ? 'Toko Produk' : 'Perusahaan Jasa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {tenant._count.items} item
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {tenant.waNumber}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link href={`/admin/tenants/${tenant.id}/edit`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Edit
                    </Link>
                    <button className="text-sm font-medium text-red-600 hover:text-red-800">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              
              {tenants.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Belum ada tenant yang ditambahkan.
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
