import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ['❤️', '🌸', '💕', '🌹', '💗', '✨', '💖', '🌺', '💝'];

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const initial: Heart[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 14,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 10,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setHearts(initial);

    const interval = setInterval(() => {
      setHearts(prev => prev.map(h => ({
        ...h,
        delay: 0,
        left: Math.random() * 100,
      })));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-float-heart select-none"
          style={{
            left: `${heart.left}%`,
            bottom: '-5%',
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: 0,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
