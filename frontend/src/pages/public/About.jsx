import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Wrench, Terminal, Cpu, Trophy, Target, Eye } from 'lucide-react';
import CyberCard from '../../components/common/CyberCard';

export default function About() {
  const domains = [
    { title: 'CYBERSECURITY', icon: Shield, desc: 'Core fundamentals of defensive and offensive security operations.' },
    { title: 'BLUE TEAM / SOC', icon: Eye, desc: 'Monitoring, incident response, and building resilient security architectures.' },
    { title: 'SECURITY RESEARCH', icon: BookOpen, desc: 'Analyzing vulnerabilities, malware, and emerging threat vectors.' },
    { title: 'WEB DEVELOPMENT', icon: Wrench, desc: 'Creating secure, scalable platforms and automated security tools.' },
    { title: 'AI & AUTOMATION', icon: Cpu, desc: 'Leveraging machine learning for threat detection and response automation.' },
    { title: 'CTFS & HACKATHONS', icon: Trophy, desc: 'Competing globally to sharpen skills in high-pressure environments.' }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6 font-mono text-white selection:bg-cyan-500/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-20 max-w-3xl"
      >
        <div className="text-xs text-cyan-500/50 mb-4 tracking-[0.2em] uppercase">SYSTEM.ABOUT</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 text-glow">
          THREAT<span className="text-cyan-400">FORGE</span>
        </h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed border-l-2 border-cyan-500/30 pl-6">
          <p>
            <strong className="text-cyan-400 font-bold uppercase tracking-widest">Who We Are:</strong> A collective of cybersecurity enthusiasts, builders, and researchers dedicated to mastering the art of defense and security innovation.
          </p>
          <p>
            <strong className="text-cyan-400 font-bold uppercase tracking-widest">Our Mission:</strong> To bridge the gap between theoretical security and practical application. We don't just study vulnerabilities; we build the tools to detect them and the architectures to withstand them.
          </p>
          <p>
            <strong className="text-cyan-400 font-bold uppercase tracking-widest">Our Vision:</strong> To cultivate a community of elite security professionals capable of securing the next generation of digital infrastructure against sophisticated adversaries.
          </p>
          <p>
            <strong className="text-cyan-400 font-bold uppercase tracking-widest">What We Believe:</strong> Security is a mindset, not a checklist. Continuous learning, hands-on experimentation, and collaborative defense are the keys to staying ahead of the threat landscape.
          </p>
        </div>
      </motion.div>

      <div>
        <div className="text-xs text-cyan-500/50 mb-8 tracking-[0.2em] uppercase border-b border-white/10 pb-4">OUR DOMAINS</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, idx) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <domain.icon className="w-8 h-8 text-gray-600 group-hover:text-cyan-400 mb-4 transition-colors" />
              <h3 className="text-lg font-bold tracking-widest text-white mb-2">{domain.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{domain.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}