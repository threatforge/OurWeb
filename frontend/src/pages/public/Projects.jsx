import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, Loader, FolderKanban } from 'lucide-react';
import api from '../../services/api';
import CyberCard from '../../components/common/CyberCard';
import clsx from 'clsx';

const CATEGORIES = ['ALL', 'CYBERSECURITY', 'BLUE TEAM', 'AI', 'WEB', 'AUTOMATION'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
        setFilteredProjects(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load project database. Connection refused.');
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === 'ALL') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category.toUpperCase() === activeCategory));
    }
  }, [activeCategory, projects]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'ACTIVE': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'COMPLETED': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'IN DEVELOPMENT': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      default: return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-2">
          <FolderKanban className="text-cyan-400 w-8 h-8" />
          <h1 className="text-4xl font-mono font-bold tracking-widest text-white text-glow">
            PROJECT_REPOSITORY
          </h1>
        </div>
        <p className="text-gray-400 font-mono text-sm max-w-2xl">
          Open-source tools, infrastructure implementations, and software built by ThreatForge.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              'px-4 py-1.5 text-xs font-mono tracking-widest border transition-all duration-300',
              activeCategory === cat
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                : 'bg-transparent border-white/10 text-gray-500 hover:border-cyan-500/50 hover:text-cyan-400'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
          <p className="text-cyan-400 font-mono text-sm animate-pulse">ACCESSING PROJECT REPOSITORY...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 border border-red-500/20 bg-red-500/5 rounded-sm">
          <p className="text-red-400 font-mono">{error}</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 border border-cyan-500/20 bg-black/40 rounded-sm">
          <p className="text-gray-400 font-mono">NO PROJECTS FOUND IN SELECTED CATEGORY.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project._id}
              >
                <div className="h-full flex flex-col p-6 bg-black/60 border border-white/5 hover:border-cyan-500/50 transition-all duration-300 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    {project.image && (
                      <div className="h-40 w-full mb-4 overflow-hidden border border-white/10 rounded-sm bg-gray-900 group-hover:border-cyan-400 transition-colors">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white font-mono tracking-wider truncate uppercase">{project.title}</h3>
                      <span className={clsx('text-[10px] px-2 py-0.5 border rounded-sm font-mono tracking-widest whitespace-nowrap', getStatusColor(project.status))}>
                        {project.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies?.slice(0,4).map(tech => (
                        <span key={tech} className="text-[10px] text-gray-300 bg-white/5 px-2 py-1 border border-white/10 uppercase tracking-widest font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 mt-auto pt-4 border-t border-white/10 w-full">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-gray-500 hover:text-cyan-400 font-mono transition-colors uppercase tracking-widest">
                          <Code className="w-4 h-4" /> SOURCE
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-gray-500 hover:text-cyan-400 font-mono transition-colors uppercase tracking-widest">
                          <ExternalLink className="w-4 h-4" /> DEMO
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}