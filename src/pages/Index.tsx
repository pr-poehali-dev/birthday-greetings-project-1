import FloatingHearts from '@/components/FloatingHearts';
import HeroSection from '@/components/HeroSection';
import GallerySection from '@/components/GallerySection';
import CongratulationSection from '@/components/CongratulationSection';
import FriendshipCounter from '@/components/FriendshipCounter';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <FloatingHearts />

      {/* Nav dots */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {['#hero', '#gallery', '#congratulation', '#counter'].map((href, i) => {
          const labels = ['Приветствие', 'Галерея', 'Поздравление', 'Дружба'];
          return (
            <a
              key={href}
              href={href}
              title={labels[i]}
              className="group flex items-center gap-2 justify-end"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-lato text-rose-600 bg-white/80 px-2 py-0.5 rounded-full shadow text-nowrap">
                {labels[i]}
              </span>
              <div
                className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 hover:scale-150"
                style={{ borderColor: 'hsl(340,60%,55%)', backgroundColor: 'rgba(200,80,100,0.3)' }}
              />
            </a>
          );
        })}
      </nav>

      <div id="hero">
        <HeroSection />
      </div>

      {/* Divider */}
      <div className="relative py-4">
        <hr className="divider-rose" style={{ maxWidth: '80%' }} />
      </div>

      <div id="gallery">
        <GallerySection />
      </div>

      <div className="relative py-4">
        <hr className="divider-rose" style={{ maxWidth: '80%' }} />
      </div>

      <div id="congratulation">
        <CongratulationSection />
      </div>

      <div className="relative py-4">
        <hr className="divider-rose" style={{ maxWidth: '80%' }} />
      </div>

      <div id="counter">
        <FriendshipCounter />
      </div>

      <FooterSection />
    </div>
  );
};

export default Index;
