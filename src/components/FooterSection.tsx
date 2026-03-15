import { useState } from 'react';
import Confetti from './Confetti';

const FooterSection = () => {
  const [confetti, setConfetti] = useState(false);

  const handleWish = () => {
    setConfetti(false);
    setTimeout(() => setConfetti(true), 50);
  };

  return (
    <footer className="relative py-24 px-4 text-center overflow-hidden">
      <Confetti active={confetti} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-64"
          style={{ background: 'linear-gradient(to top, hsl(340,30%,93%), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-6xl mb-6 animate-pulse-heart">🎂</div>

        <h2 className="font-playfair text-4xl md:text-5xl font-bold gradient-text mb-4">
          С Днём Рождения!
        </h2>

        <p className="font-playfair text-xl italic text-rose-700 opacity-80 mb-8">
          17 апреля — твой особенный день
        </p>

        <div className="flex justify-center gap-3 text-3xl mb-10 animate-bounce-gentle">
          {'🌹🌸💕🎊✨🎀💖🌺🎉'.split('').filter(Boolean).map((e, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
          ))}
        </div>

        <button
          onClick={handleWish}
          className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-lato font-bold text-xl text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 mb-12"
          style={{
            background: 'linear-gradient(135deg, hsl(340,60%,50%), hsl(15,80%,55%), hsl(270,50%,60%))',
          }}
        >
          <span className="text-2xl animate-pulse-heart">🎊</span>
          Отпраздновать ещё раз!
        </button>

        <hr className="divider-rose mb-8" />

        <div className="flex flex-col items-center gap-2">
          <p className="font-lato text-sm text-rose-500 opacity-60 tracking-widest uppercase">
            Сделано с любовью ❤️
          </p>
          <p className="font-playfair text-lg text-rose-700 italic opacity-80">
            Для самой лучшей подруги на свете
          </p>
          <p className="font-lato text-xs text-rose-400 mt-2 opacity-50">
            © 2026 — навсегда и всегда 🌹
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
