import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import WhatsAppButton from "@/components/WhatsAppButton";

const prisma = new PrismaClient();

export default async function TenantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const tenant = await prisma.tenant.findUnique({
    where: { slug: slug },
    include: {
      items: {
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!tenant) {
    notFound();
  }

  const isCompany = tenant.type === "COMPANY_PROFILE";
  const itemTypeLabel = isCompany ? "Layanan / Jasa" : "Katalog Produk";

  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="h-64 md:h-80 w-full relative bg-gray-200">
        {tenant.logoUrl && (
          <Image 
            src={tenant.logoUrl} 
            alt={tenant.name}
            fill
            className="object-cover opacity-90"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <div className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold mb-3">
                  {isCompany ? "Profil Perusahaan" : "Toko"}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">{tenant.name}</h1>
                {tenant.address && (
                  <p className="mt-2 text-gray-200 flex items-center text-sm md:text-base max-w-2xl">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {tenant.address}
                  </p>
                )}
              </div>
              <div className="shrink-0 pb-1">
                <WhatsAppButton 
                  waNumber={tenant.waNumber} 
                  message={`Halo, saya tertarik dengan informasi di profil ${tenant.name} di TenantKatalog.`} 
                  buttonText="Hubungi Tenant"
                  className="w-full sm:w-auto shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Kami</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="whitespace-pre-line">{tenant.description}</p>
              </div>
            </section>

            {/* Catalog/Services Section */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{itemTypeLabel}</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {tenant.items.map((item) => {
                  // Parsing image URLs safely
                  let images: string[] = [];
                  if (item.images) {
                    try {
                      images = JSON.parse(item.images);
                    } catch (e) {
                      images = [];
                    }
                  }
                  
                  return (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                      {/* Image Carousel / Gallery */}
                      <div className="w-full bg-gray-50 border-b border-gray-100">
                        {images.length > 0 ? (
                          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2 px-2 gap-2">
                            {images.map((img, idx) => (
                              <div key={idx} className="relative h-48 w-48 flex-shrink-0 snap-center rounded-lg overflow-hidden border border-gray-200">
                                <Image 
                                  src={img} 
                                  alt={`${item.name} - ${idx + 1}`}
                                  fill
                                  className="object-contain bg-white"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="h-48 flex items-center justify-center text-gray-400 bg-gray-50">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{item.name}</h3>
                        <div className="text-sm text-gray-600 mb-6 flex-grow whitespace-pre-line leading-relaxed">
                          {item.description}
                        </div>
                        
                        {item.price !== null && (
                          <p className="text-lg font-semibold text-gray-900 mb-4">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price)}
                          </p>
                        )}
                        
                        <WhatsAppButton 
                          waNumber={tenant.waNumber} 
                          message={`Halo, saya tertarik dengan "${item.name}" yang ada di TenantKatalog.`} 
                          buttonText={`Tanya ${isCompany ? "Layanan" : "Produk"}`}
                          className="w-full mt-auto"
                        />
                      </div>
                    </div>
                  );
                })}
                
                {tenant.items.length === 0 && (
                  <div className="col-span-full py-10 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500">Belum ada item yang ditambahkan.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi Kontak</h3>
              
              <dl className="space-y-4 text-sm text-gray-600">
                {tenant.address && (
                  <div>
                    <dt className="sr-only">Alamat</dt>
                    <dd className="flex items-start">
                      <svg className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{tenant.address}</span>
                    </dd>
                  </div>
                )}
                
                <div>
                  <dt className="sr-only">WhatsApp</dt>
                  <dd className="flex items-center">
                    <svg className="flex-shrink-0 mr-3 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                    </svg>
                    <span>{tenant.waNumber}</span>
                  </dd>
                </div>
              </dl>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <WhatsAppButton 
                  waNumber={tenant.waNumber} 
                  message={`Halo, saya melihat profil ${tenant.name} di TenantKatalog.`} 
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
