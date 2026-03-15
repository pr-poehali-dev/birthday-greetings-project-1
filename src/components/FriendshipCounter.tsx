import { useEffect, useRef, useState } from 'react';

const START_DATE = new Date('2023-01-01');

interface TimeUnit {
  label: string;
  value: number;
  icon: string;
  color: string;
}

const calcTime = (): TimeUnit[] => {
  const now = new Date();
  const diff = now.getTime() - START_DATE.getTime();

  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return [
    { label: 'лет', value: years, icon: '🌟', color: 'hsl(340,60%,55%)' },
    { label: 'месяцев', value: months, icon: '🌸', color: 'hsl(270,45%,65%)' },
    { label: 'дней', value: days, icon: '☀️', color: 'hsl(40,80%,60%)' },
    { label: 'часов', value: hours, icon: '⏰', color: 'hsl(15,75%,60%)' },
    { label: 'минут', value: minutes, icon: '💫', color: 'hsl(340,50%,65%)' },
    { label: 'секунд', value: seconds, icon: '❤️', color: 'hsl(350,70%,60%)' },
  ];
};

const milestones = [
  { icon: '🤝', label: 'Первая встреча', value: '2023' },
  { icon: '☕', label: 'Тысячи часов болтовни', value: '∞' },
  { icon: '🌙', label: 'Ночных разговоров', value: '100+' },
  { icon: '🎉', label: 'Совместных праздников', value: '12+' },
  { icon: '🌍', label: 'Общих воспоминаний', value: '1000+' },
  { icon: '💝', label: 'Любви и поддержки', value: '∞' },
];

const FriendshipCounter = () => {
  const [time, setTime] = useState<TimeUnit[]>(calcTime());
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setAnimated(true), 400);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  const totalDays = Math.floor((new Date().getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-lato text-sm tracking-[0.3em] uppercase text-rose-500 mb-3">Вместе с</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold gradient-text mb-2">
            2023 года 💕
          </h2>
          <p className="font-lato text-rose-700 opacity-70 mt-3">
            Уже <strong className="text-rose-600">{totalDays.toLocaleString('ru')}</strong> дней невероятной дружбы
          </p>
          <hr className="divider-rose mt-6" />
        </div>

        {/* Live timer */}
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 mb-16 transition-all duration-1000 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {time.map((unit, idx) => (
            <div
              key={unit.label}
              className="counter-card rounded-2xl p-6 text-center"
              style={{
                animation: animated ? `count-up 0.5s ease-out ${idx * 0.1}s both` : 'none',
              }}
            >
              <div className="text-3xl mb-2">{unit.icon}</div>
              <div
                className="font-playfair text-4xl md:text-5xl font-bold mb-1 tabular-nums"
                style={{ color: unit.color }}
              >
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="font-lato text-sm text-rose-600 opacity-70 uppercase tracking-wide">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        {/* Milestones */}
        <div className={`transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-playfair text-3xl font-bold text-center gradient-text mb-8">
            Наши рекорды ✨
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-5 text-center hover:scale-105 transition-transform duration-300"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="text-3xl mb-2">{m.icon}</div>
                <div
                  className="font-playfair text-2xl font-bold mb-1"
                  style={{ color: 'hsl(340,60%,55%)' }}
                >
                  {m.value}
                </div>
                <div className="font-lato text-xs text-rose-700 opacity-80 leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="glass rounded-3xl p-8 inline-block max-w-2xl animate-glow">
            <p className="font-playfair text-xl md:text-2xl italic text-rose-800 leading-relaxed">
              «Истинная дружба — это когда между двумя людьми воцаряется тишина,
              и при этом ни один из них не чувствует себя неловко»
            </p>
            <p className="font-lato text-sm text-rose-500 mt-4 opacity-70">— Это про нас ❤️</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FriendshipCounter;
