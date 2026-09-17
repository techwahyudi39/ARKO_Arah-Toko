import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              TenantKatalog
            </span>
            <p className="mt-4 text-gray-500 text-sm max-w-sm">
              Platform direktori tenant terpadu yang memudahkan Anda menemukan produk dan layanan terbaik dari berbagai mitra kami.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Menu</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/tenants" className="text-base text-gray-500 hover:text-blue-600 transition-colors">
                  Daftar Tenant
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-base text-gray-500 hover:text-blue-600 transition-colors">
                  Kategori
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Informasi</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-gray-500 hover:text-blue-600 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-base text-gray-500 hover:text-blue-600 transition-colors">
                  Kerja Sama
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-gray-500 hover:text-blue-600 transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex items-center justify-between">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} TenantKatalog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
