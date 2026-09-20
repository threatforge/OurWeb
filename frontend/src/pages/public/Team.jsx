import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Link as LinkIcon, Loader } from 'lucide-react';
import api from '../../services/api';
import CyberCard from '../../components/common/CyberCard';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await api.get('/team');
        setMembers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load team data. Connection refused.');
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex justify-center items-center gap-3 mb-2">
          <Users className="text-cyan-400 w-8 h-8" />
          <h1 className="text-4xl font-mono font-bold tracking-widest text-white text-glow">
            THE FORGE
          </h1>
        </div>
        <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
          Meet the operatives behind ThreatForge.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
          <p className="text-cyan-400 font-mono text-sm animate-pulse">DECRYPTING TEAM DATA...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 border border-red-500/20 bg-red-500/5 rounded-sm">
          <p className="text-red-400 font-mono">{error}</p>
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-20 border border-cyan-500/20 bg-black/40 rounded-sm">
          <p className="text-gray-400 font-mono">NO OPERATIVES FOUND IN DATABASE.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, idx) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className="group relative bg-black border border-white/10 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden rounded-sm flex flex-col md:block md:h-[450px]">
                
                {/* Image Section */}
                <div className="relative z-0 bg-gray-900 h-64 md:absolute md:inset-0 md:h-auto transition-transform duration-700 md:group-hover:scale-105">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-top grayscale opacity-80 md:group-hover:grayscale-0 md:group-hover:opacity-20 md:group-hover:blur-sm transition-all duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-cyan-500/20 font-mono text-6xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  {/* Default gradient overlay (Desktop) */}
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:opacity-0 transition-opacity duration-500"></div>
                  {/* Default gradient overlay (Mobile) */}
                  <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col flex-1 md:absolute md:inset-0 md:justify-end">
                  {/* The sliding panel (Desktop) / Normal panel (Mobile) */}
                  <div className="bg-black/80 md:bg-black/70 backdrop-blur-md border-t border-white/10 p-5 md:transform md:translate-y-[calc(100%-5rem)] md:group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col flex-1 md:h-full">
                    
                    {/* Header: Name and Role always visible */}
                    <div className="md:h-20 flex-shrink-0 flex flex-col justify-center mb-4 md:mb-0">
                      <h3 className="text-xl font-bold text-white font-mono tracking-widest uppercase truncate text-glow">{member.name}</h3>
                      <p className="text-cyan-400 text-xs font-mono uppercase tracking-widest truncate">{member.role}</p>
                    </div>
                    
                    {/* Details: Bio and Skills */}
                    <div className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-150 flex-1 flex flex-col overflow-hidden">
                      {member.bio && (
                        <div className="md:overflow-y-auto md:pr-2 custom-scrollbar flex-shrink mb-4">
                          <p className="text-gray-300 text-xs leading-relaxed font-sans">{member.bio}</p>
                        </div>
                      )}

                      {member.skills && member.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                          {member.skills.map((skill, i) => (
                            <span key={i} className="text-[9px] font-mono tracking-widest px-1.5 py-0.5 bg-cyan-950/40 border border-cyan-500/30 text-cyan-100/90 uppercase rounded-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-auto pt-3 border-t border-white/10 flex gap-4 flex-shrink-0">
                        {member.github && (
                          <a href={member.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                            <Code className="w-4 h-4" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                            <LinkIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}