import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  // Fetch stats
  const totalTenants = await prisma.tenant.count();
  const totalProducts = await prisma.item.count({ where: { type: "PRODUCT" } });
  const totalServices = await prisma.item.count({ where: { type: "SERVICE" } });
  
  const recentTenants = await prisma.tenant.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Login sebagai: <span className="font-semibold text-gray-900">{session?.user?.name}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Tenant</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalTenants}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Produk</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalProducts}</p>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Layanan (Jasa)</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalServices}</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Tenant Terbaru</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentTenants.length > 0 ? (
            recentTenants.map((tenant) => (
              <div key={tenant.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{tenant.name}</p>
                  <p className="text-xs text-gray-500">{tenant.type === 'PRODUCT' ? 'Toko Produk' : 'Profil Perusahaan'}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(tenant.createdAt).toLocaleDateString('id-ID')}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500 text-sm">
              Belum ada tenant yang didaftarkan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
