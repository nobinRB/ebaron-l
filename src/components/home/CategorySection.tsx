import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Curry Mud Pots',
    image: '/images/categories/1.jpg',
    description: 'Traditional clay pots for authentic curry cooking',
    slug: 'curry-mud-pots'
  },
  {
    id: 2,
    name: 'Water Dispensers',
    image: '/images/categories/2.jpg',
    description: 'Natural cooling clay water containers',
    slug: 'water-dispensers'
  },
  {
    id: 3,
    name: 'Planters',
    image: '/images/categories/3.jpg',
    description: 'Eco-friendly pots for your plants',
    slug: 'planters'
  },
  {
    id: 4,
    name: 'Mud Stoves',
    image: '/images/categories/4.jpg',
    description: 'Traditional clay cooking stoves',
    slug: 'mud-stoves'
  },
  {
    id: 5,
    name: 'Decorative Pots',
    image: '/images/categories/5.jpg',
    description: 'Beautiful handcrafted clay decor items',
    slug: 'decorative-pots'
  },
  {
    id: 6,
    name: 'Serving Pots',
    image: '/images/categories/6.jpg',
    description: 'Traditional serving vessels for authentic dining',
    slug: 'serving-pots'
  }
];

export default function CategorySection() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/shop?category=${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 