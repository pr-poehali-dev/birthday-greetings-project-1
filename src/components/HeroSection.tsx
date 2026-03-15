import { useState, useEffect } from 'react';
import Confetti from './Confetti';

const HeroSection = () => {
  const [confettiActive, setConfettiActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setConfettiActive(true), 800);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const handleClick = () => {
    setConfettiActive(false);
    setTimeout(() => setConfettiActive(true), 50);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      <Confetti active={confettiActive} />

      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(340,70%,75%), transparent)' }} />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(270,50%,75%), transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(15,80%,75%), transparent)' }} />

      {/* Rotating ring */}
      <div className="absolute w-[500px] h-[500px] border border-dashed rounded-full opacity-10 animate-spin-slow"
        style={{ borderColor: 'hsl(340,60%,55%)' }} />

      <div className={`relative z-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Crown emoji */}
        <div className="text-6xl mb-4 animate-bounce-gentle">👑</div>

        <p className="font-lato text-sm tracking-[0.3em] uppercase mb-3 opacity-70 text-rose-600">
          С Днём Рождения
        </p>

        <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-2 gradient-text leading-tight">
          Дорогая
        </h1>
        <h1 className="font-playfair text-5xl md:text-7xl font-bold italic mb-6 gradient-text">
          подруга!
        </h1>

        <hr className="divider-rose" />

        <p className="font-lato text-lg md:text-xl text-rose-700 opacity-80 max-w-lg mx-auto mb-4 leading-relaxed">
          17 апреля — особенный день,<br />
          полный любви, цветов и улыбок ✨
        </p>

        <div className="flex items-center justify-center gap-3 text-2xl mb-8">
          {'🌸🌹💕🌷💖'.split('').map((e, i) => (
            <span key={i} className="animate-bounce-gentle" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
          ))}
        </div>

        <button
          onClick={handleClick}
          className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-lato font-semibold text-white text-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, hsl(340,60%,55%), hsl(15,80%,60%))',
          }}
        >
          <span className="animate-pulse-heart text-xl">❤️</span>
          Отпраздновать вместе!
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity bg-white" />
        </button>
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle opacity-50">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-lato tracking-widest text-rose-500 uppercase">листай</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(340,60%,55%)" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
