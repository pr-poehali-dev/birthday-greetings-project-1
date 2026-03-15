import { useEffect, useRef, useState } from 'react';

const wishes = [
  { icon: '🌹', text: 'Пусть каждый день приносит тебе радость и улыбки, как эти цветы — красоту в любое время года' },
  { icon: '✨', text: 'Желаю тебе исполнения самых заветных желаний и новых невероятных открытий' },
  { icon: '💕', text: 'Пусть рядом всегда будут люди, которые искренне любят и ценят тебя' },
  { icon: '🌟', text: 'Ты заслуживаешь только лучшего — счастья, здоровья и безграничного вдохновения' },
  { icon: '🎀', text: 'Пусть жизнь будет яркой, насыщенной и полной приятных сюрпризов каждый день' },
];

const CongratulationSection = () => {
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 text-7xl opacity-5 animate-spin-slow">🌹</div>
        <div className="absolute bottom-0 right-1/4 text-7xl opacity-5 animate-spin-slow" style={{ animationDirection: 'reverse' }}>🌸</div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-lato text-sm tracking-[0.3em] uppercase text-rose-500 mb-3">Из глубины сердца</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold gradient-text mb-4">
            Поздравление 💌
          </h2>
          <hr className="divider-rose mt-4" />
        </div>

        {/* Main letter */}
        <div className={`glass rounded-3xl p-8 md:p-12 mb-16 shadow-2xl relative transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ border: '1px solid rgba(200,80,100,0.2)' }}>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-4xl animate-pulse-heart">💌</div>

          <div className="text-center mb-6">
            <div className="flex justify-center gap-2 text-2xl mb-4">
              {'🌸✨💕✨🌸'.split('').map((e, i) => <span key={i}>{e}</span>)}
            </div>
          </div>

          <div className="font-playfair text-rose-900 space-y-5 leading-relaxed">
            <p className="text-xl md:text-2xl italic font-semibold text-center gradient-text">
              «Дорогая подруга,»
            </p>
            <p className="text-base md:text-lg opacity-90 text-center">
              В этот замечательный день — <strong>17 апреля</strong> — я хочу, чтобы ты знала,
              как много значишь для меня. Наша дружба — это один из самых ценных подарков в моей жизни.
            </p>
            <p className="text-base md:text-lg opacity-90 text-center">
              Ты умеешь делать мир вокруг ярче просто своим присутствием. Твоя улыбка,
              доброта и искренность — это то, за что я люблю тебя больше всего на свете.
            </p>
            <p className="text-base md:text-lg opacity-90 text-center">
              Пусть этот день будет наполнен радостью, смехом и теплом. Пусть каждая свеча
              на торте исполнит самое заветное желание ✨
            </p>
            <p className="text-xl italic font-semibold text-center gradient-text">
              С любовью и нежностью, навсегда твоя подруга 🌹
            </p>
          </div>
        </div>

        {/* Wishes cards */}
        <div className={`transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-playfair text-3xl font-bold text-center gradient-text mb-8">
            Пожелания 🎀
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishes.map((wish, idx) => (
              <div
                key={idx}
                className="counter-card rounded-2xl p-6 cursor-pointer select-none transition-all duration-300 hover:shadow-xl"
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setFlipped(flipped === idx ? null : idx)}
              >
                <div className="text-4xl mb-3 text-center transition-transform duration-300 hover:scale-125">
                  {wish.icon}
                </div>
                <p className={`font-lato text-rose-800 text-sm leading-relaxed text-center transition-all duration-500 ${flipped === idx ? 'opacity-100' : 'opacity-70'}`}>
                  {wish.text}
                </p>
                {flipped !== idx && (
                  <p className="text-xs text-rose-400 text-center mt-2 font-lato">нажми, чтобы прочитать ✨</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CongratulationSection;
