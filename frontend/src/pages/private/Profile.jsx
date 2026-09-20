import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Code, Link as LinkIcon, BookOpen, BrainCircuit } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import CyberCard from '../../components/common/CyberCard';
import api from '../../services/api';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/users/${user._id}`);
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) {
      fetchProfile();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6 flex justify-center">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="text-xs text-cyan-500/50 mb-2 tracking-[0.2em] uppercase">COMMUNITY.PROFILE</div>
        <h1 className="text-3xl font-mono font-bold tracking-widest text-white uppercase text-glow">
          {profile.name}
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Basic Info */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-1 space-y-6"
        >
          <CyberCard className="flex flex-col items-center p-6 text-center">
            <div className="w-32 h-32 rounded-sm bg-gray-900 border border-cyan-500/50 mb-6 flex items-center justify-center overflow-hidden">
              {profile.profilePicture ? (
                <img src={profile.profilePicture} alt="Avatar" className="w-full h-full object-cover grayscale" />
              ) : (
                <User className="w-12 h-12 text-cyan-500/50" />
              )}
            </div>
            <h2 className="text-xl font-bold font-mono tracking-wider text-white uppercase mb-1">{profile.name}</h2>
            <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4">{profile.role}</p>
            
            <div className="w-full h-px bg-white/10 mb-4"></div>
            
            <div className="flex justify-center gap-4 w-full">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                  <Code className="w-5 h-5" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                  <LinkIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </CyberCard>
        </motion.div>

        {/* Right Column: Details & Bio */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 space-y-6"
        >
          <CyberCard className="p-6">
            <h3 className="text-xs text-cyan-500/50 tracking-[0.2em] uppercase mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> IDENTITY DATA
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-1">UNIVERSITY</span>
                <span className="text-gray-300 font-mono">{profile.university || 'NOT SPECIFIED'}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-1">SEMESTER</span>
                <span className="text-gray-300 font-mono">{profile.semester || 'NOT SPECIFIED'}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-1">INTERESTED DOMAIN</span>
                <span className="text-cyan-400 font-mono uppercase tracking-widest">{profile.interestedDomain || 'CYBERSECURITY'}</span>
              </div>
            </div>
          </CyberCard>

          <CyberCard className="p-6">
            <h3 className="text-xs text-cyan-500/50 tracking-[0.2em] uppercase mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" /> BIOMETRICS & SKILLS
            </h3>
            
            <div className="mb-6">
              <span className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-2">BIO</span>
              <p className="text-gray-300 text-sm leading-relaxed">{profile.bio || 'No biometrics data available.'}</p>
            </div>
            
            <div>
              <span className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-2">SKILLS</span>
              {profile.skills && profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, idx) => (
                    <span key={idx} className="text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-gray-300 px-3 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500 font-mono text-sm">NO SKILLS REGISTERED</span>
              )}
            </div>
          </CyberCard>
        </motion.div>
      </div>
    </div>
  );
}
