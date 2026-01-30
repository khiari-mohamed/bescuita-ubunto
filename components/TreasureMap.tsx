'use client';

import { motion } from 'framer-motion';
import { slidesData } from '@/lib/slides-data';
import * as Icons from 'lucide-react';

interface TreasureMapProps {
  onSlideSelect: (index: number) => void;
  isTransitioning?: boolean;
  targetSlide?: number;
}

const slideIcons = [
  Icons.Home, Icons.Map, Icons.BookOpen, Icons.Target, Icons.Brain,
  Icons.Cpu, Icons.Network, Icons.Calendar, Icons.Server, Icons.Settings,
  Icons.Shield, Icons.Download, Icons.Plus, Icons.Sliders, Icons.Monitor,
  Icons.Terminal, Icons.TrendingUp, Icons.AlertTriangle, Icons.Trophy
];

export default function TreasureMap({ onSlideSelect, isTransitioning = false, targetSlide }: TreasureMapProps) {
  const radius = 280;
  const centerX = 350;
  const centerY = 350;

  const handleSlideClick = (index: number) => {
    onSlideSelect(index);
  };

  // Calculate target position for zoom animation
  const getTargetPosition = (slideIndex: number) => {
    const angle = (slideIndex / slidesData.length) * 360 - 90;
    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };

  return (
    <div className="fixed inset-0 bg-bg flex items-center justify-center">
      {/* Title */}
      <motion.div
        className="absolute top-8 left-8 z-50"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-space text-2xl font-bold text-textMain text-glow mb-1">
          Système d'exploitation
        </h1>
        <p className="text-sm text-primary">Choisissez votre destination</p>
      </motion.div>

      {/* Map Container */}
      <motion.div 
        className="relative w-[700px] h-[700px]"
        style={{
          transform: isTransitioning && targetSlide !== undefined 
            ? `scale(2) translate(${-(getTargetPosition(targetSlide).x - centerX) * 0.5}px, ${-(getTargetPosition(targetSlide).y - centerY) * 0.5}px)`
            : 'scale(1) translate(0px, 0px)'
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <svg width="700" height="700" className="absolute pointer-events-none">
          <defs>
            <radialGradient id="mapGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.15)" />
              <stop offset="70%" stopColor="rgba(167, 139, 250, 0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          
          <circle cx={centerX} cy={centerY} r={radius + 50} fill="url(#mapGradient)" />
          
          {/* Connection paths */}
          {!isTransitioning && slidesData.map((slide, index) => {
            const nextIndex = (index + 1) % slidesData.length;
            const angle1 = (index / slidesData.length) * 360 - 90;
            const angle2 = (nextIndex / slidesData.length) * 360 - 90;
            
            const x1 = centerX + radius * Math.cos((angle1 * Math.PI) / 180);
            const y1 = centerY + radius * Math.sin((angle1 * Math.PI) / 180);
            const x2 = centerX + radius * Math.cos((angle2 * Math.PI) / 180);
            const y2 = centerY + radius * Math.sin((angle2 * Math.PI) / 180);
            
            return (
              <path
                key={`path-${index}`}
                d={`M ${x1} ${y1} Q ${centerX} ${centerY} ${x2} ${y2}`}
                stroke="rgba(56, 189, 248, 0.3)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
            );
          })}
          
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 20}
            fill="none"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="2"
            strokeDasharray="10,5"
          />
        </svg>

        {/* Center compass */}
        <div
          className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center shadow-2xl border-4 border-white/30"
          style={{ left: centerX - 48, top: centerY - 48 }}
        >
          <Icons.Compass className="w-10 h-10 text-white" />
        </div>

        {/* Slide destinations */}
        {slidesData.map((slide, index) => {
          const angle = (index / slidesData.length) * 360 - 90;
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
          const IconComponent = slideIcons[index] || Icons.Circle;

          return (
            <motion.button
              key={slide.id}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-surface to-panel border-2 border-primary/50 hover:border-primary transition-all duration-200 group shadow-xl hover:shadow-2xl hover:shadow-primary/30 will-change-transform"
              style={{ left: x - 40, top: y - 40 }}
              onClick={() => handleSlideClick(index)}
              whileHover={{ scale: 1.15, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.03, duration: 0.5, type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <IconComponent className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                <div className="text-xs text-primary group-hover:text-white font-medium mt-1">
                  {index + 1}
                </div>
              </div>
              
              {/* Tooltip */}
              <motion.div
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-panel px-3 py-2 rounded-lg text-sm text-textBody whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg border border-primary/20"
                initial={{ y: 10, opacity: 0 }}
              >
                <div className="font-semibold text-primary">{slide.title}</div>
                <div className="text-xs text-textMuted">Cliquez pour commencer</div>
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="absolute bottom-8 right-8 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="glass px-4 py-2 rounded-lg">
          <p className="text-textMuted text-xs">
            <Icons.MousePointer className="inline w-3 h-3 mr-1" />
            Cliquez sur une destination
          </p>
        </div>
      </motion.div>
    </div>
  );
}