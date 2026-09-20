import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, Code, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-cyan-500/30">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <div className="z-10 w-full max-w-4xl px-6 flex flex-col items-start gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 text-cyan-500/50 mb-4"
          >
            <Terminal className="w-5 h-5" />
            <span className="tracking-widest text-sm uppercase">THREATFORGE // 001</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white"
          >
            SYSTEM <span className="text-cyan-400">ONLINE</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col gap-2 text-2xl md:text-4xl font-bold tracking-widest text-gray-500 uppercase mt-4"
          >
            <span className="hover:text-cyan-400 transition-colors cursor-default">DETECT.</span>
            <span className="hover:text-cyan-400 transition-colors cursor-default">ANALYZE.</span>
            <span className="hover:text-cyan-400 transition-colors cursor-default">DEFEND.</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8"
          >
            <Link
              to="/about"
              className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-cyan-500 text-cyan-400 uppercase tracking-widest text-sm hover:bg-cyan-500 hover:text-black transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 font-bold">[ EXPLORE THREATFORGE ]</span>
              <div className="absolute inset-0 bg-cyan-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

      {/* Who We Are Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xs text-cyan-500/50 mb-12 tracking-[0.2em] uppercase">WHO WE ARE</div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
            WE ARE <span className="text-cyan-400">THREATFORGE.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl border-l-2 border-cyan-500/30 pl-6">
            A collective of cybersecurity enthusiasts, builders, and researchers dedicated to mastering the art of defense.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

      {/* Operations Section */}
      <section className="py-32 relative bg-black/40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xs text-cyan-500/50 mb-12 tracking-[0.2em] uppercase">OUR OPERATIONS</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'CYBERSECURITY', icon: Shield },
              { title: 'SECURITY RESEARCH', icon: Terminal },
              { title: 'DEVELOPMENT', icon: Code },
              { title: 'AI & AUTOMATION', icon: Cpu }
            ].map((op, idx) => (
              <div key={idx} className="group p-6 border border-white/5 hover:border-cyan-500/30 bg-white/[0.02] hover:bg-cyan-500/5 transition-all duration-300 cursor-pointer flex items-center gap-4">
                <op.icon className="w-6 h-6 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                <span className="text-lg tracking-widest text-gray-300 group-hover:text-white transition-colors">[ {op.title} ]</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

      {/* The Forge Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-xs text-cyan-500/50 mb-12 tracking-[0.2em] uppercase">THE FORGE</div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-2xl md:text-3xl font-bold tracking-widest text-gray-400 uppercase">
            <Link to="/team" className="hover:text-cyan-400 transition-colors">TEAM</Link>
            <ArrowRight className="w-6 h-6 text-cyan-500/30 hidden md:block" />
            <span className="text-cyan-500/30 md:hidden">↓</span>
            <Link to="/projects" className="hover:text-cyan-400 transition-colors">PROJECTS</Link>
            <ArrowRight className="w-6 h-6 text-cyan-500/30 hidden md:block" />
            <span className="text-cyan-500/30 md:hidden">↓</span>
            <Link to="/achievements" className="hover:text-cyan-400 transition-colors">ACHIEVEMENTS</Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

      {/* Join Section */}
      <section className="py-32 relative bg-cyan-950/20">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-8">
          <div className="text-xs text-cyan-500/50 tracking-[0.2em] uppercase">JOIN THE TEAM</div>
          <Link
            to="/join"
            className="px-6 py-4 md:px-12 md:py-6 bg-cyan-500 text-black font-black text-sm md:text-xl tracking-[0.2em] uppercase hover:bg-white transition-colors flex items-center gap-2 md:gap-4 group text-center w-full max-w-xs md:max-w-none justify-center"
          >
            <span className="truncate">[ ENTER THE FORGE ]</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform flex-shrink-0" />
          </Link>
        </div>
      </section>
      
    </div>
  );
}