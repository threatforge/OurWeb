import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Search, Cpu, Code, Trophy, Activity, Terminal } from 'lucide-react';
import CyberCard from '../../components/common/CyberCard';

export default function Operations() {
  const operations = [
    {
      title: 'BLUE TEAM',
      icon: Shield,
      desc: 'Security monitoring, detection and defensive operations against active threats.'
    },
    {
      title: 'SOC',
      icon: Activity,
      desc: 'Security alerts, log analysis, continuous monitoring and incident response.'
    },
    {
      title: 'THREAT HUNTING',
      icon: Target,
      desc: 'Identify suspicious activity and investigate advanced indicators of compromise.'
    },
    {
      title: 'SECURITY RESEARCH',
      icon: Search,
      desc: 'Explore vulnerabilities, attack techniques and develop defensive strategies.'
    },
    {
      title: 'AI & AUTOMATION',
      icon: Cpu,
      desc: 'Leverage artificial intelligence and automation to improve security workflows.'
    },
    {
      title: 'SECURE DEVELOPMENT',
      icon: Code,
      desc: 'Build applications with security in mind, implementing shift-left paradigms.'
    },
    {
      title: 'CTF & HACKATHONS',
      icon: Trophy,
      desc: 'Participate in technical competitions and build real cybersecurity solutions.'
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-2">
          <Terminal className="text-cyan-400 w-6 h-6" />
          <h1 className="text-3xl md:text-4xl font-mono font-bold tracking-widest text-white text-glow">
            OPERATIONS_DASHBOARD
          </h1>
        </div>
        <p className="text-gray-400 font-mono text-sm max-w-2xl">
          Overview of ThreatForge primary capabilities and active engagement sectors.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operations.map((op, idx) => (
          <CyberCard 
            key={op.title} 
            title={op.title} 
            icon={op.icon} 
            delay={idx * 0.1}
            className="h-full"
          >
            <p className="text-gray-400 text-sm leading-relaxed">
              {op.desc}
            </p>
          </CyberCard>
        ))}
      </div>
    </div>
  );
}