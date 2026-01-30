'use client';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SiUbuntu } from 'react-icons/si';

export default function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 max-w-3xl mx-auto">
      {/* Ubuntu VM Layer */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-80 h-14 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg border-2 border-orange-400 flex items-center justify-center"
      >
        <div className="flex items-center space-x-3">
          <SiUbuntu className="w-6 h-6 text-white" />
          <span className="text-white font-semibold">Ubuntu Linux (VM)</span>
        </div>
      </motion.div>

      {/* Arrow Down */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Icons.ArrowDown className="w-6 h-6 text-primary" />
      </motion.div>

      {/* VirtualBox Layer */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-96 h-16 bg-gradient-to-r from-primary to-cyan-400 rounded-lg border-2 border-primary flex items-center justify-center"
      >
        <div className="flex items-center space-x-3">
          <Icons.Box className="w-7 h-7 text-white" />
          <span className="text-white font-semibold">Oracle VM VirtualBox</span>
        </div>
      </motion.div>

      {/* Arrow Down */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Icons.ArrowDown className="w-6 h-6 text-primary" />
      </motion.div>

      {/* Windows Host Layer */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-lg h-18 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg border-2 border-blue-400 flex items-center justify-center py-4"
      >
        <div className="flex items-center space-x-3">
          <Icons.Monitor className="w-8 h-8 text-white" />
          <span className="text-white font-semibold">Windows (Système Hôte)</span>
        </div>
      </motion.div>

      {/* Arrow Down */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4 }}
      >
        <Icons.ArrowDown className="w-6 h-6 text-primary" />
      </motion.div>

      {/* Hardware Layer */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl h-20 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg border-2 border-gray-500 flex items-center justify-center"
      >
        <div className="flex items-center space-x-4">
          <Icons.Cpu className="w-8 h-8 text-gray-300" />
          <Icons.MemoryStick className="w-8 h-8 text-gray-300" />
          <Icons.HardDrive className="w-8 h-8 text-gray-300" />
          <span className="text-white font-semibold">Matériel Physique</span>
        </div>
      </motion.div>
    </div>
  );
}