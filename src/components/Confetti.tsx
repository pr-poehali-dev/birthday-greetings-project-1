import { useEffect, useState, useRef } from 'react';

interface Piece {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: 'circle' | 'rect' | 'star';
  rotation: number;
}

const COLORS = [
  '#e8607a', '#f4a3b5', '#f7c5d0', '#fad4a0',
  '#e091c0', '#b57be8', '#ffdf80', '#ff8fa3',
  '#c0e8a0', '#80d4f4',
];

const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;

    const newPieces: Piece[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 10 + 6,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 2,
      shape: (['circle', 'rect', 'star'] as const)[Math.floor(Math.random() * 3)],
      rotation: Math.random() * 360,
    }));
    setPieces(newPieces);

    timerRef.current = setTimeout(() => setPieces([]), 6000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active]);

  if (!pieces.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-10px',
            width: p.shape === 'star' ? p.size * 1.5 : p.size,
            height: p.shape === 'rect' ? p.size * 0.4 : p.size,
            backgroundColor: p.shape === 'star' ? 'transparent' : p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'rect' ? '2px' : '0',
            fontSize: p.shape === 'star' ? p.size * 1.5 : 0,
            color: p.color,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          {p.shape === 'star' ? '★' : ''}
        </div>
      ))}
    </div>
  );
};

export default Confetti;
