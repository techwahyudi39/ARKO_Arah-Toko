import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function TenantsPage() {
  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Daftar Mitra Tenant</h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Temukan penyedia produk dan layanan terbaik yang telah bergabung bersama kami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tenants.map((tenant) => (
          <Link href={`/tenants/${tenant.slug}`} key={tenant.id} className="group">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="h-48 w-full relative bg-gray-100 flex-shrink-0 overflow-hidden">
                {tenant.logoUrl ? (
                  <Image 
                    src={tenant.logoUrl} 
                    alt={tenant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-blue-50 text-blue-300">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                  {tenant.type === "PRODUCT" ? "Toko" : "Perusahaan"}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tenant.name}</h3>
                <p className="mt-2 text-gray-600 text-sm flex-grow line-clamp-3">{tenant.description}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="truncate">{tenant.address || "Belum ada lokasi"}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {tenants.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-500 text-lg">Belum ada tenant yang terdaftar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
