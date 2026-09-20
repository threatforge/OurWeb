import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Loader, ExternalLink, Calendar } from 'lucide-react';
import api from '../../services/api';
import clsx from 'clsx';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data } = await api.get('/achievements');
        setAchievements(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load achievements. Connection refused.');
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const getTypeColor = (type) => {
    switch(type) {
      case 'HACKATHON': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'CTF': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      case 'WORKSHOP': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'INITIATIVE': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      default: return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex justify-center items-center gap-3 mb-2">
          <Trophy className="text-cyan-400 w-8 h-8" />
          <h1 className="text-4xl font-mono font-bold tracking-widest text-white text-glow uppercase">
            Timeline of Excellence
          </h1>
        </div>
        <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
          Our track record in global competitions, CTFs, and community initiatives.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
          <p className="text-cyan-400 font-mono text-sm animate-pulse">FETCHING RECORDS...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 border border-red-500/20 bg-red-500/5 rounded-sm">
          <p className="text-red-400 font-mono">{error}</p>
        </div>
      ) : achievements.length === 0 ? (
        <div className="text-center py-20 border border-cyan-500/20 bg-black/40 rounded-sm">
          <p className="text-gray-400 font-mono">NO RECORDS FOUND.</p>
        </div>
      ) : (
        <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 py-4 space-y-12">
          {achievements.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-black border-2 border-cyan-500 group-hover:bg-cyan-500 transition-colors shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
              
              <div className="bg-black/60 border border-white/5 p-6 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white font-mono tracking-wider uppercase">{item.title}</h3>
                    <span className={clsx('text-[10px] px-2 py-0.5 border rounded-sm font-mono tracking-widest uppercase', getTypeColor(item.type))}>
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm font-mono uppercase">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
                
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors uppercase tracking-widest border border-cyan-500/30 bg-cyan-500/5 px-3 py-1.5 hover:bg-cyan-500/20">
                    <ExternalLink className="w-4 h-4" /> VIEW RECORD
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
