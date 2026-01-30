'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Navigation({ currentSlide, totalSlides, onPrevious, onNext }: NavigationProps) {
  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-surface z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide Counter */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="glass rounded-lg px-4 py-2">
          <span className="text-textBody font-mono">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                // This would need to be passed as a prop if we want direct navigation
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={onPrevious}
        disabled={currentSlide === 0}
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 glass rounded-full p-3 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6 text-textBody" />
      </button>

      <button
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 glass rounded-full p-3 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6 text-textBody" />
      </button>
    </>
  );
}