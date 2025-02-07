import Link from 'next/link';
import Image from 'next/image';

export default function CtaBanner() {
  return (
    <section className="relative h-[250px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta-banner/cta-banner.png"
          alt="Clay pottery background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex items-center justify-between h-full">
          {/* Left Side */}
          <div className="w-1/4">
            <div className="h-[100px] w-[100px] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            </div>
          </div>

          {/* Center */}
          <div className="w-1/2 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Traditional Clay Cookware
            </h2>
            <p className="text-gray-100 text-lg">
              Discover our collection of handcrafted clay pots
            </p>
          </div>

          {/* Right Side - CTA */}
          <div className="w-1/4 text-right">
            <Link 
              href="/shop" 
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 