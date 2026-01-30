'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Slide from '@/components/Slide';
import Navigation from '@/components/Navigation';
import TreasureMap from '@/components/TreasureMap';
import { slidesData } from '@/lib/slides-data';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(-1);
  const [showTreasureMap, setShowTreasureMap] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | 'jump'>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetSlide, setTargetSlide] = useState<number>();

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTargetSlide(index);
    setSlideDirection('jump');
    
    // Wait for optimized zoom animation then switch to slide
    setTimeout(() => {
      setCurrentSlide(index);
      setShowTreasureMap(false);
      setIsTransitioning(false);
    }, 600);
  };

  const backToMap = () => {
    setShowTreasureMap(true);
    setCurrentSlide(-1);
  };

  const nextSlide = () => {
    if (currentSlide < slidesData.length - 1) {
      setSlideDirection('next');
      setCurrentSlide(currentSlide + 1);
    } else {
      backToMap();
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setSlideDirection('prev');
      setCurrentSlide(currentSlide - 1);
    } else {
      backToMap();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (showTreasureMap) return;
      
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          previousSlide();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(slidesData.length - 1);
          break;
        case 'Escape':
          event.preventDefault();
          backToMap();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, showTreasureMap]);

  if (showTreasureMap) {
    return <TreasureMap onSlideSelect={goToSlide} isTransitioning={isTransitioning} targetSlide={targetSlide} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
      </div>

      <div className="relative w-full h-full z-30">
        <AnimatePresence mode="wait">
          {slidesData.map((slide, index) => (
            <Slide
              key={slide.id}
              slide={slide}
              isActive={index === currentSlide}
              direction={slideDirection}
              slideIndex={index}
            />
          ))}
        </AnimatePresence>
      </div>

      <Navigation
        currentSlide={currentSlide}
        totalSlides={slidesData.length}
        onNext={nextSlide}
        onPrevious={previousSlide}
      />

      <button
        onClick={backToMap}
        className="fixed top-8 left-8 z-50 glass rounded-full p-3 hover:bg-white/10 transition-colors"
      >
        <svg className="w-6 h-6 text-textBody" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
}