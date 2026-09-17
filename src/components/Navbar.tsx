import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                TenantKatalog
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Beranda
            </Link>
            <Link href="/tenants" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Daftar Tenant
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Kategori
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Tentang Kami
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              href="/partnership"
              className="hidden md:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
            >
              Kerja Sama
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
