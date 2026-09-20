import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function CyberCard({ children, className, title, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={clsx(
        'relative bg-black/40 backdrop-blur-sm border border-white/10 p-6 group transition-all duration-300 hover:border-cyan-500/50 hover:bg-black/60',
        className
      )}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50 group-hover:border-cyan-400 transition-colors"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50 group-hover:border-cyan-400 transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50 group-hover:border-cyan-400 transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50 group-hover:border-cyan-400 transition-colors"></div>

      {title && (
        <div className="flex items-center gap-3 mb-4">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          <h3 className="text-lg font-mono tracking-widest text-white group-hover:text-glow transition-all">{title}</h3>
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-xl"></div>
    </motion.div>
  );
}
