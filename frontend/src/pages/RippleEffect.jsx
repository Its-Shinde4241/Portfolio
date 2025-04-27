import { useEffect, useState } from 'react';

const RippleEffect = () => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (e, type) => {
    const newRipple = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now() + Math.random(), // unique id
      type,
    };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, type === 'click' ? 600 : 300); // click ripples last longer
  };

  useEffect(() => {
    const handleClick = (e) => createRipple(e, 'click');
    const handleMove = (e) => createRipple(e, 'move');

    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={`absolute rounded-full transform scale-0 ${
            ripple.type === 'click'
              ? 'bg-blue-400 opacity-30 animate-ripple-click'
              : 'bg-purple-400 opacity-20 animate-ripple-move'
          }`}
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
          }}
        />
      ))}
    </div>
  );
};

export default RippleEffect;
