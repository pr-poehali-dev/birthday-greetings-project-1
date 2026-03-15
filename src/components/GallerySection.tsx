import { useState, useEffect, useRef } from 'react';

interface Photo {
  id: number;
  src: string;
  caption: string;
  date: string;
}

const photos: Photo[] = [
  { id: 1, src: '', caption: 'Наша первая встреча', date: 'Январь 2023' },
  { id: 2, src: '', caption: 'Незабываемый вечер', date: 'Март 2023' },
  { id: 3, src: '', caption: 'Летние приключения', date: 'Июль 2023' },
  { id: 4, src: '', caption: 'Осенние прогулки', date: 'Октябрь 2023' },
  { id: 5, src: '', caption: 'Новогодний праздник', date: 'Декабрь 2023' },
  { id: 6, src: '', caption: 'Весна вместе', date: 'Апрель 2024' },
  { id: 7, src: '', caption: 'Море и смех', date: 'Август 2024' },
  { id: 8, src: '', caption: 'День рождения 2024', date: 'Апрель 2024' },
  { id: 9, src: '', caption: 'Наши планы', date: '2025' },
];

const PLACEHOLDER_COLORS = [
  ['hsl(340,60%,88%)', 'hsl(340,50%,70%)'],
  ['hsl(15,80%,88%)', 'hsl(15,70%,70%)'],
  ['hsl(270,40%,88%)', 'hsl(270,35%,72%)'],
  ['hsl(340,50%,82%)', 'hsl(340,60%,65%)'],
  ['hsl(40,70%,88%)', 'hsl(40,65%,68%)'],
  ['hsl(320,50%,88%)', 'hsl(320,45%,70%)'],
  ['hsl(350,60%,85%)', 'hsl(350,55%,68%)'],
  ['hsl(280,40%,88%)', 'hsl(280,38%,72%)'],
  ['hsl(20,70%,88%)', 'hsl(20,65%,70%)'],
];

const PHOTO_EMOJIS = ['🌸', '💕', '🌹', '✨', '🎉', '🌺', '💖', '🎊', '🌷'];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight' && lightbox) {
        const idx = photos.findIndex(p => p.id === lightbox.id);
        if (idx < photos.length - 1) setLightbox(photos[idx + 1]);
      }
      if (e.key === 'ArrowLeft' && lightbox) {
        const idx = photos.findIndex(p => p.id === lightbox.id);
        if (idx > 0) setLightbox(photos[idx - 1]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-lato text-sm tracking-[0.3em] uppercase text-rose-500 mb-3">Наши воспоминания</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold gradient-text mb-4">
            Галерея ❤️
          </h2>
          <p className="font-lato text-rose-700 opacity-70 max-w-md mx-auto">
            Каждая фотография — момент, который мы разделили вместе
          </p>
          <hr className="divider-rose mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, idx) => {
            const [bg, accent] = PLACEHOLDER_COLORS[idx % PLACEHOLDER_COLORS.length];
            return (
              <div
                key={photo.id}
                className={`gallery-item cursor-pointer relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${idx * 80}ms` }}
                onClick={() => setLightbox(photo)}
              >
                <div
                  className="w-full aspect-square flex flex-col items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${bg}, ${accent})` }}
                >
                  <div className="text-5xl mb-2">{PHOTO_EMOJIS[idx]}</div>
                  <div className="text-white/80 font-lato text-xs text-center px-3 font-semibold tracking-wide">
                    Добавь фото
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-white text-sm font-semibold">
                      🔍 Открыть
                    </div>
                  </div>
                </div>
                <div className="p-3 glass">
                  <p className="font-playfair text-sm font-semibold text-rose-800">{photo.caption}</p>
                  <p className="font-lato text-xs text-rose-500 mt-0.5">{photo.date}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center mt-8 text-rose-400 font-lato text-sm italic opacity-70">
          * Замени placeholder-ы своими фотографиями 📸
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-2xl w-full animate-fade-in-scale"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-3xl transition-colors"
              onClick={() => setLightbox(null)}
            >✕</button>

            <div className="glass rounded-3xl overflow-hidden shadow-2xl">
              {(() => {
                const idx = photos.findIndex(p => p.id === lightbox.id);
                const [bg, accent] = PLACEHOLDER_COLORS[idx % PLACEHOLDER_COLORS.length];
                return (
                  <div
                    className="w-full aspect-video flex flex-col items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${bg}, ${accent})` }}
                  >
                    <div className="text-8xl mb-4">{PHOTO_EMOJIS[idx]}</div>
                    <p className="text-white/70 font-lato text-sm">Место для твоей фотографии</p>
                  </div>
                );
              })()}
              <div className="p-6 text-center">
                <h3 className="font-playfair text-2xl font-bold text-rose-800 mb-1">{lightbox.caption}</h3>
                <p className="font-lato text-rose-500">{lightbox.date}</p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              {photos.findIndex(p => p.id === lightbox.id) > 0 && (
                <button
                  className="glass text-white px-5 py-2 rounded-full text-sm font-lato hover:bg-white/20 transition-all"
                  onClick={() => {
                    const idx = photos.findIndex(p => p.id === lightbox.id);
                    setLightbox(photos[idx - 1]);
                  }}
                >← Назад</button>
              )}
              <div className="flex-1" />
              {photos.findIndex(p => p.id === lightbox.id) < photos.length - 1 && (
                <button
                  className="glass text-white px-5 py-2 rounded-full text-sm font-lato hover:bg-white/20 transition-all"
                  onClick={() => {
                    const idx = photos.findIndex(p => p.id === lightbox.id);
                    setLightbox(photos[idx + 1]);
                  }}
                >Вперёд →</button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
