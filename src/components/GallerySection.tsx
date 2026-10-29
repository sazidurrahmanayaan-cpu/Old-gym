import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/gymData';
import { useGym } from '../context/GymContext';
import { Camera, Maximize2, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { galleryItems } = useGym();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<{ title: string; image: string; category: string } | null>(null);

  const categories = ['All', 'Strength Zone', 'Free Weights', 'New Equipment', 'Clean Space', 'Coaching'];

  const items = galleryItems && galleryItems.length > 0 ? galleryItems : GALLERY_ITEMS;

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#0d0d0d] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
              <Camera className="w-4 h-4" />
              <span>Facility Showcase</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              Inside Old Gym Munshiganj
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl">
              Inspect our clean premises, calibrated heavy iron plates, ergonomic machine rows, and dedicated athletic training floors.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setLightboxImage(item)}
              className="group relative h-72 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 hover:border-[#D4AF37]/60 cursor-pointer transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('hero_gym_dark')) {
                    target.src = '/assets/images/hero_gym_dark_1790467261162.jpg';
                  }
                }}
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag / Category */}
              <div className="absolute top-4 left-4">
                <span className="text-[11px] font-mono font-medium text-amber-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-[#D4AF37]/30">
                  {item.category}
                </span>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-neutral-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-[#FFD700]" />
              </div>

              {/* Bottom Title */}
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="font-heading text-lg font-bold uppercase text-white group-hover:text-[#FFD700] transition-colors leading-tight">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#121212] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex items-center justify-between border-b border-neutral-800">
              <div>
                <span className="text-xs font-mono text-[#D4AF37] uppercase">{lightboxImage.category}</span>
                <h3 className="font-heading text-xl font-bold uppercase text-white">{lightboxImage.title}</h3>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={lightboxImage.image}
                alt={lightboxImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[75vh]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('hero_gym_dark')) {
                    target.src = '/assets/images/hero_gym_dark_1790467261162.jpg';
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
