'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Priya Singh',
    role: 'Home Chef',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 5,
    content: 'The clay pots have enhanced the authentic flavors in my cooking. The quality is exceptional!'
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    role: 'Restaurant Owner',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    rating: 5,
    content: 'These traditional clay cookware items have become essential in our restaurant kitchen.'
  },
  {
    id: 3,
    name: 'Anita Patel',
    role: 'Food Blogger',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    rating: 4,
    content: 'The natural cooling properties of these clay pots make them perfect for water storage.'
  }
];

export default function TestimonialCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          What Our Customers Say
        </h2>
        
        <div className="relative max-w-3xl mx-auto h-[350px]">
          <div className="absolute inset-0">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="flex flex-col items-center text-center h-full justify-center">
                  <blockquote className="text-xl text-gray-800 mb-6 leading-relaxed max-w-2xl">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}
                        size={20}
                      />
                    ))}
                  </div>

                  <div className="relative w-16 h-16 mb-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  
                  <div className="text-gray-900 font-semibold text-lg mb-1">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-gray-900' : 'bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 