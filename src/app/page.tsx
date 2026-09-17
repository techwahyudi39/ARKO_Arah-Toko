import Link from "next/link";
import Image from "next/image";

// Placeholder data for mockup
const featuredTenants = [
  {
    id: "1",
    name: "Tech Store Indo",
    type: "PRODUCT",
    description: "Gadget dan aksesoris komputer berkualitas dengan garansi resmi.",
    logo: "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?w=800&q=80",
    slug: "tech-store-indo"
  },
  {
    id: "2",
    name: "Creative Design Studio",
    type: "COMPANY_PROFILE",
    description: "Jasa desain grafis, UI/UX, dan branding untuk bisnis Anda.",
    logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    slug: "creative-design-studio"
  }
];

const featuredItems = [
  {
    id: "1",
    name: "Laptop Pro X 2024",
    price: 15000000,
    tenant: "Tech Store Indo",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80"
  },
  {
    id: "2",
    name: "Paket Branding Lengkap",
    price: 5000000,
    tenant: "Creative Design Studio",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    price: 1200000,
    tenant: "Tech Store Indo",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Temukan Produk & Layanan <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Terbaik dari Mitra Kami
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Jelajahi berbagai katalog produk dan layanan terpercaya. Hubungi penyedia layanan secara langsung via WhatsApp tanpa perantara.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/tenants"
              className="px-8 py-3.5 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              Jelajahi Tenant
            </Link>
            <Link
              href="/partnership"
              className="px-8 py-3.5 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all"
            >
              Bergabung
            </Link>
          </div>
        </div>
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
      </section>

      {/* Featured Tenants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mitra Pilihan</h2>
            <p className="text-gray-500 mt-1">Tenant terbaik dengan kualitas terjamin</p>
          </div>
          <Link href="/tenants" className="text-blue-600 font-medium hover:text-blue-700 hidden sm:block">
            Lihat semua &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTenants.map((tenant) => (
            <Link href={`/tenants/${tenant.slug}`} key={tenant.id} className="group">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="h-48 w-full relative bg-gray-100 overflow-hidden">
                  <Image 
                    src={tenant.logo} 
                    alt={tenant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                    {tenant.type === "PRODUCT" ? "Toko" : "Perusahaan"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tenant.name}</h3>
                  <p className="mt-2 text-gray-600 line-clamp-2 text-sm">{tenant.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-gray-50/50 rounded-3xl py-12 border border-gray-100">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Produk & Layanan Unggulan</h2>
            <p className="text-gray-500 mt-1">Penawaran terbaik minggu ini</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="h-56 w-full relative bg-gray-100">
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-blue-600 font-medium mb-1">{item.tenant}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price)}
                </p>
                
                <button className="mt-4 w-full bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                  Tanya via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
