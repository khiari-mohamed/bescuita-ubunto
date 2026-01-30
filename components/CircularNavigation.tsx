'use client';

import { motion } from 'framer-motion';
import { slidesData } from '@/lib/slides-data';
import * as Icons from 'lucide-react';

interface CircularNavigationProps {
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const slideIcons = [
  Icons.Home, Icons.Map, Icons.BookOpen, Icons.Target, Icons.Brain,
  Icons.Cpu, Icons.Network, Icons.Calendar, Icons.Server, Icons.Settings,
  Icons.Shield, Icons.Download, Icons.Plus, Icons.Sliders, Icons.Monitor,
  Icons.Terminal, Icons.TrendingUp, Icons.AlertTriangle, Icons.Trophy
];

export default function CircularNavigation({ currentSlide, onSlideChange }: CircularNavigationProps) {
  const radius = 280;
  const centerX = 350;
  const centerY = 350;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[700px] h-[700px] pointer-events-auto">
          <svg width="700" height="700" className="absolute">
            {/* Treasure map background */}
            <defs>
              <radialGradient id="mapGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.1)" />
                <stop offset="70%" stopColor="rgba(167, 139, 250, 0.05)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            
            <circle cx={centerX} cy={centerY} r={radius + 50} fill="url(#mapGradient)" />
            
            {/* Connection paths between slides */}
            {slidesData.map((slide, index) => {
              const nextIndex = (index + 1) % slidesData.length;
              const angle1 = (index / slidesData.length) * 360 - 90;
              const angle2 = (nextIndex / slidesData.length) * 360 - 90;
              
              const x1 = centerX + radius * Math.cos((angle1 * Math.PI) / 180);
              const y1 = centerY + radius * Math.sin((angle1 * Math.PI) / 180);
              const x2 = centerX + radius * Math.cos((angle2 * Math.PI) / 180);
              const y2 = centerY + radius * Math.sin((angle2 * Math.PI) / 180);
              
              return (
                <motion.path
                  key={`path-${index}`}
                  d={`M ${x1} ${y1} Q ${centerX} ${centerY} ${x2} ${y2}`}
                  stroke={index <= currentSlide ? "rgba(56, 189, 248, 0.4)" : "rgba(148, 163, 184, 0.2)"}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: index <= currentSlide ? 1 : 0.3 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              );
            })}
            
            {/* Outer ring */}
            <motion.circle
              cx={centerX}
              cy={centerY}
              r={radius + 20}
              fill="none"
              stroke="rgba(56, 189, 248, 0.3)"
              strokeWidth="1"
              strokeDasharray="10,5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            />
          </svg>

          {/* Center hub */}
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center shadow-2xl border-4 border-white/20"
            style={{ left: centerX - 40, top: centerY - 40 }}
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Icons.Compass className="w-8 h-8 text-white" />
          </motion.div>

          {/* Slide locations */}
          {slidesData.map((slide, index) => {
            const angle = (index / slidesData.length) * 360 - 90;
            const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
            const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
            const isActive = index === currentSlide;
            const isCompleted = index < currentSlide;
            const IconComponent = slideIcons[index];

            return (
              <motion.button
                key={slide.id}
                className={`absolute w-16 h-16 rounded-full border-3 transition-all duration-500 group ${
                  isActive 
                    ? 'bg-gradient-to-br from-primary to-secondary border-white shadow-2xl shadow-primary/50 scale-125' 
                    : isCompleted
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-300 shadow-lg'
                    : 'bg-surface/80 border-white/30 hover:border-primary/70 hover:shadow-lg'
                }`}
                style={{ left: x - 32, top: y - 32 }}
                onClick={() => onSlideChange(index)}
                whileHover={{ scale: isActive ? 1.25 : 1.15 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.08, duration: 0.6, type: "spring" }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <IconComponent 
                    className={`w-6 h-6 ${
                      isActive ? 'text-white' : isCompleted ? 'text-white' : 'text-primary'
                    }`}
                  />
                  {isCompleted && !isActive && (
                    <Icons.Check className="absolute -top-1 -right-1 w-4 h-4 text-green-300 bg-green-600 rounded-full p-0.5" />
                  )}
                </div>
                
                {/* Tooltip */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-panel px-3 py-1 rounded-lg text-xs text-textBody whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  {slide.title}
                </motion.div>
              </motion.button>
            );
          })}

          {/* Progress indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass px-4 py-2 rounded-full">
            <div className="flex items-center space-x-2">
              <Icons.MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-textBody font-mono">
                {currentSlide + 1} / {slidesData.length}
              </span>
              <div className="w-20 h-1 bg-surface rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentSlide + 1) / slidesData.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}