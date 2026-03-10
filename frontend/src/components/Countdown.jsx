import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/content';

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = siteConfig.electionDate - new Date();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Jours' },
    { value: timeLeft.hours, label: 'Heures' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Secondes' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6" data-testid="countdown">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="bg-white shadow-lg border border-slate-200 p-3 md:p-4 min-w-[70px] md:min-w-[90px]">
            <span className="countdown-number text-3xl md:text-5xl text-fr-blue font-bold block text-center">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs md:text-sm uppercase tracking-wider text-slate-600 mt-2 font-medium">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
