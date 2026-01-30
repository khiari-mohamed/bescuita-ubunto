'use client';

import { motion } from 'framer-motion';
import { SlideData } from '@/lib/slides-data';
import * as Icons from 'lucide-react';
import { SiUbuntu } from 'react-icons/si';

import ArchitectureDiagram from '@/components/ArchitectureDiagram';

interface SlideProps {
  slide: SlideData;
  isActive: boolean;
  direction: 'next' | 'prev' | 'jump';
  slideIndex: number;
}

const getSlideVariants = (direction: 'next' | 'prev' | 'jump', slideIndex: number) => {
  return {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  };
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 }
  })
};

export default function Slide({ slide, isActive, direction, slideIndex }: SlideProps) {
  if (!isActive) return null;

  const slideVariants = getSlideVariants(direction, slideIndex);

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'cover':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8 glass rounded-lg p-12 backdrop-blur-xl"
            >
              <motion.img
                src="/bascota.png"
                alt="Bascota Team Logo"
                className="w-32 h-32 mx-auto shadow-2xl border-4 border-primary/30 rounded-lg"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              />
              
              <motion.h1 
                className="font-space text-4xl font-bold text-textMain text-glow"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {slide.title}
              </motion.h1>
              <motion.h2 
                className="text-lg text-primary font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {slide.subtitle}
              </motion.h2>
              <motion.div 
                className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 1, duration: 0.5 }}
              ></motion.div>
              <div className="space-y-2 text-lg text-textMuted">
                {slide.authors?.map((author, i) => (
                  <motion.p
                    key={author}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.05, duration: 0.4 }}
                  >
                    {author}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'toc':
        return (
          <div className="flex flex-col justify-center h-full max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-space text-4xl font-semibold text-textMain mb-12 text-center"
            >
              {slide.title}
            </motion.h1>
            <div className="grid grid-cols-2 gap-6">
              {slide.content?.map((item: string, i: number) => (
                <motion.div
                  key={item}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="glass rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                      {i + 1}
                    </div>
                    <span className="text-lg text-textBody">{item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="flex flex-col justify-center h-full max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-space text-4xl font-semibold text-textMain mb-12 text-center"
            >
              {slide.title}
            </motion.h1>
            {slide.subtitle && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-xl text-primary mb-8 text-center"
              >
                {slide.subtitle}
              </motion.h2>
            )}
            
            {slide.content?.points && (
              <div className="space-y-6">
                {slide.content.points.map((point: string, i: number) => (
                  <motion.div
                    key={point}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center space-x-4 text-lg"
                  >
                    <Icons.Circle className="w-3 h-3 text-primary fill-current" />
                    <span className="text-textBody">{point}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {slide.content?.objectives && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {slide.content.objectives.map((obj: any, i: number) => (
                  <motion.div
                    key={obj.text}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="glass rounded-lg p-6 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-primary">
                        {renderIcon(obj.icon)}
                      </div>
                      <span className="text-textBody">{obj.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {slide.content?.concepts && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {slide.content.concepts.map((concept: any, i: number) => (
                  <motion.div
                    key={concept.term}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="glass rounded-lg p-6"
                  >
                    <h3 className="text-primary font-semibold mb-2">{concept.term}</h3>
                    <p className="text-textMuted text-sm">{concept.desc}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {slide.content?.features && (
              <div className="flex flex-col items-center space-y-12">
                {/* VirtualBox Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <Icons.Box className="w-12 h-12 text-white" />
                </motion.div>

                {/* Features List */}
                <div className="space-y-8 max-w-2xl">
                  {slide.content.features.map((feature: any, i: number) => (
                    <motion.div
                      key={feature.text}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center space-x-6 text-xl"
                    >
                      <div className="text-primary">
                        {renderIcon(feature.icon)}
                      </div>
                      <span className="text-textBody font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.content?.steps && (
              <div className="flex items-center justify-between max-w-6xl mx-auto">
                {/* Steps List */}
                <div className="flex-1 space-y-6">
                  {slide.content.steps.map((step: string, i: number) => (
                    <motion.div
                      key={step}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center space-x-6 text-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary text-bg font-bold flex items-center justify-center text-xl">
                        {i + 1}
                      </div>
                      <span className="text-textBody font-medium">{step}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Installation Mockup */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex-1 ml-12"
                >
                  <div className="bg-surface rounded-lg p-6 border border-primary/20">
                    {/* Window Header */}
                    <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-white/10">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-textMuted text-sm ml-4">
                        {slide.title === 'Installation Ubuntu' ? 'Ubuntu Installer' : 'VirtualBox Installer'}
                      </span>
                    </div>
                    
                    {/* Installer Content */}
                    <div className="space-y-4">
                      {slide.title === 'Installation Ubuntu' ? (
                        <>
                          <div className="flex items-center space-x-3">
                            <SiUbuntu className="w-8 h-8 text-orange-500" />
                            <div>
                              <div className="text-textMain font-semibold">Ubuntu 22.04 LTS</div>
                              <div className="text-textMuted text-sm">Desktop Edition</div>
                            </div>
                          </div>
                          
                          <div className="bg-orange-500/10 rounded p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <Icons.HardDrive className="w-4 h-4 text-orange-500" />
                              <span className="text-textBody text-sm">Installation du système...</span>
                            </div>
                            <div className="w-full bg-surface rounded-full h-2">
                              <motion.div 
                                className="bg-orange-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "60%" }}
                                transition={{ delay: 1.5, duration: 2 }}
                              ></motion.div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-3">
                            <button className="px-4 py-2 bg-surface rounded text-textMuted text-sm">Retour</button>
                            <button className="px-4 py-2 bg-orange-500 rounded text-white text-sm">Continuer</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center space-x-3">
                            <Icons.Box className="w-8 h-8 text-primary" />
                            <div>
                              <div className="text-textMain font-semibold">Oracle VM VirtualBox</div>
                              <div className="text-textMuted text-sm">Version 7.0.12</div>
                            </div>
                          </div>
                          
                          <div className="bg-primary/10 rounded p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <Icons.Download className="w-4 h-4 text-primary" />
                              <span className="text-textBody text-sm">Installation en cours...</span>
                            </div>
                            <div className="w-full bg-surface rounded-full h-2">
                              <motion.div 
                                className="bg-primary h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "75%" }}
                                transition={{ delay: 1.5, duration: 2 }}
                              ></motion.div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-3">
                            <button className="px-4 py-2 bg-surface rounded text-textMuted text-sm">Annuler</button>
                            <button className="px-4 py-2 bg-primary rounded text-white text-sm">Suivant</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {slide.content?.specs && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {slide.content.specs.map((spec: any, i: number) => (
                  <motion.div
                    key={spec.label}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="glass rounded-lg p-6 text-center"
                  >
                    <div className="text-primary mb-3 flex justify-center">
                      {renderIcon(spec.icon)}
                    </div>
                    <h3 className="text-textMain font-semibold">{spec.label}</h3>
                    <p className="text-primary text-lg font-bold">{spec.value}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {slide.content?.advantages && (
              <div className="flex flex-col items-center space-y-12">
                {/* Central Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Icons.TrendingUp className="w-10 h-10 text-white" />
                </motion.div>

                {/* Advantages Grid */}
                <div className="grid grid-cols-2 gap-12 max-w-4xl">
                  {slide.content.advantages.map((adv: any, i: number) => (
                    <motion.div
                      key={adv.text}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col items-center text-center space-y-4"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full flex items-center justify-center border-2 border-green-500/30">
                        <div className="text-green-400 text-2xl">
                          {renderIcon(adv.icon)}
                        </div>
                      </div>
                      <span className="text-textBody font-medium text-lg">{adv.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.content?.limitations && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {slide.content.limitations.map((lim: any, i: number) => (
                  <motion.div
                    key={lim.text}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="glass rounded-lg p-6 hover:bg-yellow-500/10 transition-colors border-l-4 border-yellow-500"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-yellow-500">
                        {renderIcon(lim.icon)}
                      </div>
                      <span className="text-textBody">{lim.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        );

      case 'diagram':
        return (
          <div className="flex flex-col justify-center h-full max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-space text-4xl font-semibold text-textMain mb-12 text-center"
            >
              {slide.title}
            </motion.h1>
            
            {slide.content?.types && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {slide.content.types.map((type: any, i: number) => (
                  <motion.div
                    key={type.name}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className={`glass rounded-lg p-8 ${type.highlight ? 'border-2 border-primary' : ''}`}
                  >
                    <h3 className="text-xl font-semibold text-primary mb-4">{type.name}</h3>
                    <p className="text-textBody mb-4">{type.desc}</p>
                    <div className="space-y-2">
                      {type.examples.map((example: string) => (
                        <div key={example} className="flex items-center space-x-2 text-sm text-textMuted">
                          <Icons.Dot className="w-4 h-4" />
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                    {type.highlight && (
                      <div className="mt-4 text-primary font-semibold">
                        <Icons.ArrowRight className="w-4 h-4 text-primary" />
                        <span>Oracle VM VirtualBox</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
            
            {slide.content?.architecture && (
              <ArchitectureDiagram />
            )}
          </div>
        );

      case 'table':
        return (
          <div className="flex flex-col justify-center h-full max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-space text-4xl font-semibold text-textMain mb-12 text-center"
            >
              {slide.title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-lg overflow-hidden"
            >
              <table className="w-full">
                <thead className="bg-primary/20">
                  <tr>
                    {slide.content?.headers.map((header: string) => (
                      <th key={header} className="px-6 py-4 text-left text-primary font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slide.content?.rows.map((row: string[], i: number) => (
                    <motion.tr
                      key={i}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      {row.map((cell, j) => (
                        <td key={j} className="px-6 py-4 text-textBody">
                          {cell}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        );

      case 'terminal':
        return (
          <div className="flex flex-col justify-center h-full max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-space text-4xl font-semibold text-textMain mb-12 text-center"
            >
              {slide.title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-black rounded-lg p-6 font-mono border border-gray-600"
            >
              {/* Ubuntu Terminal Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <SiUbuntu className="w-4 h-4 text-orange-500 ml-4" />
                  <span className="text-gray-300 text-sm">ubuntu@vm:~</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {slide.content?.commands.map((cmd: any, i: number) => (
                  <motion.div
                    key={cmd.cmd}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-2"
                  >
                    {/* Command Input */}
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 font-bold">ubuntu@vm</span>
                      <span className="text-white">:</span>
                      <span className="text-blue-400 font-bold">~</span>
                      <span className="text-white">$</span>
                      <span className="text-white">{cmd.cmd}</span>
                    </div>
                    
                    {/* Command Output */}
                    <div className="text-gray-300 text-sm pl-4">
                      {cmd.cmd === 'ls' && (
                        <div className="flex flex-wrap gap-4">
                          <span className="text-blue-400">Desktop</span>
                          <span className="text-blue-400">Documents</span>
                          <span className="text-blue-400">Downloads</span>
                          <span className="text-blue-400">Music</span>
                          <span className="text-blue-400">Pictures</span>
                          <span className="text-blue-400">Videos</span>
                          <span className="text-white">test.txt</span>
                        </div>
                      )}
                      {cmd.cmd === 'pwd' && (
                        <span className="text-white">/home/ubuntu</span>
                      )}
                      {cmd.cmd === 'uname -a' && (
                        <span className="text-white">Linux ubuntu 5.15.0-72-generic #79-Ubuntu SMP Wed Apr 19 08:22:18 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux</span>
                      )}
                    </div>
                    
                    {/* Comment */}
                    <div className="text-gray-500 text-xs pl-4">
                      # {cmd.desc}
                    </div>
                  </motion.div>
                ))}
                
                {/* Cursor */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="flex items-center space-x-2 mt-4"
                >
                  <span className="text-green-400 font-bold">ubuntu@vm</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400 font-bold">~</span>
                  <span className="text-white">$</span>
                  <span className="bg-white w-2 h-4 inline-block"></span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        );

      case 'conclusion':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 max-w-4xl"
            >
              <h1 className="font-space text-5xl font-bold text-textMain text-glow">
                {slide.title}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
              <div className="space-y-6">
                {slide.content?.summary.map((item: string, i: number) => (
                  <motion.div
                    key={item}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-center space-x-4 text-lg"
                  >
                    <Icons.CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-textBody">{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-primary text-xl font-semibold"
              >
                Questions & Discussion
              </motion.div>
            </motion.div>
          </div>
        );

      case 'thankyou':
        return (
          <div className="relative h-full overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-primary/30 font-mono text-lg font-bold"
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight + 50,
                    opacity: 0
                  }}
                  animate={{
                    y: -100,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </motion.div>
              ))}
            </div>
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-12"
              >
                {/* Main Title */}
                <motion.h1 
                  className="font-space text-6xl font-bold text-textMain text-glow"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {slide.title}
                </motion.h1>
                
                {/* Decorative Line */}
                <motion.div 
                  className="h-1 w-32 bg-gradient-to-r from-primary via-secondary to-primary mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: 128 }}
                  transition={{ delay: 1, duration: 1 }}
                ></motion.div>
                
                {/* Team Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <img
                    src="/bascota.png"
                    alt="Bascota Team"
                    className="w-24 h-24 mx-auto rounded-full shadow-2xl border-4 border-primary/50"
                  />
                </motion.div>
                
                {/* Team Members */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <div className="text-primary text-lg font-semibold mb-4">Présenté par :</div>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    {slide.authors?.map((author, i) => (
                      <motion.div
                        key={author}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.7 + i * 0.1, duration: 0.5 }}
                        className="text-textBody font-medium"
                      >
                        {author}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Final Message */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                  className="text-secondary text-lg font-medium"
                >
                  Questions & Discussion
                </motion.div>
              </motion.div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      key={slide.id}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeOut", type: "tween" }}
      className="absolute inset-0 p-8 md:p-16"
    >
      {renderSlideContent()}
    </motion.div>
  );
}