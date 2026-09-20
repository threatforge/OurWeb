import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, CheckCircle, Loader } from 'lucide-react';
import api from '../../services/api';
import CyberCard from '../../components/common/CyberCard';
import clsx from 'clsx';

export default function Join() {
  const [formData, setFormData] = useState({
    name: '', email: '', university: '', semester: '',
    interestedDomain: 'Cybersecurity', skills: '',
    github: '', linkedin: '', portfolio: '', motivation: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [appId, setAppId] = useState('');

  const domains = [
    'Cybersecurity', 'Blue Team / SOC', 'Security Research',
    'Web Development', 'AI & Automation', 'CTFs & Hackathons'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/applications', formData);
      setAppId(data._id);
      setSuccess(true);
      setFormData({
        name: '', email: '', university: '', semester: '',
        interestedDomain: 'Cybersecurity', skills: '',
        github: '', linkedin: '', portfolio: '', motivation: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-widest text-white text-glow mb-4 uppercase">
          JOIN THE FORGE
        </h1>
        <p className="text-cyan-400 font-mono tracking-widest text-lg">
          Build. Learn. Compete. Defend.
        </p>
      </motion.div>

      {success ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <CyberCard className="text-center p-12 border-green-500/30">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-mono font-bold text-white mb-2 tracking-widest">APPLICATION RECEIVED</h2>
            <p className="text-gray-400 mb-6 font-mono">Your application has entered the Forge.</p>
            <div className="bg-black/50 p-4 border border-white/10 rounded-sm inline-block mx-auto">
              <p className="text-xs text-gray-500 font-mono mb-1">REFERENCE ID:</p>
              <p className="text-cyan-400 font-mono tracking-widest">{appId || 'TF-APPLICATION-001'}</p>
            </div>
            <button 
              onClick={() => setSuccess(false)}
              className="block mx-auto mt-8 text-sm font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              Submit another application
            </button>
          </CyberCard>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <CyberCard>
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span className="font-mono text-sm tracking-widest text-white">RECRUITMENT_FORM.exe</span>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 mb-6 text-sm font-mono rounded-sm">
                [ERROR] {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 mb-2">FULL NAME *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 rounded-sm p-3 text-white font-mono text-sm outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 mb-2">EMAIL *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 rounded-sm p-3 text-white font-mono text-sm outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 mb-2">UNIVERSITY *</label>
                  <input required type="text" name="university" value={formData.university} onChange={handleChange} className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 rounded-sm p-3 text-white font-mono text-sm outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 mb-2">SEMESTER *</label>
                  <input required type="text" name="semester" value={formData.semester} onChange={handleChange} className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 rounded-sm p-3 text-white font-mono text-sm outline-none transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-mono tracking-widest text-gray-400 mb-2">INTERESTED DOMAIN *</label>
                  <select name="interestedDomain" value={formData.interestedDomain} onChange={handleChange} className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 rounded-sm p-3 text-white font-mono text-sm outline-none transition-colors appearance-none">
                    {domains.map(r => <option key={r} value={r} className="bg-gray-900">{r}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-400 mb-2">KEY SKILLS *</label>
                <input required type="text" name="skills" placeholder="e.g. Python, React, TryHackMe, Docker..." value={formData.skills} onChange={handleChange} className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 rounded-sm p-3 text-white font-mono text-sm outline-none transition-colors" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 mb-2">GITHUB URL</label>
                  <input type="url" name="github" value={formData.github} onChange={handleChange} className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 rounded-sm p-3 text-white font-mono text-sm outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 mb-2">LINKEDIN URL</label>
                  <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 rounded-sm p-3 text-white font-mono text-sm outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 mb-2">PORTFOLIO URL</label>
                  <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 rounded-sm p-3 text-white font-mono text-sm outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-400 mb-2">WHY DO YOU WANT TO JOIN THREATFORGE? *</label>
                <textarea required name="motivation" rows="3" value={formData.motivation} onChange={handleChange} className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 rounded-sm p-3 text-white font-mono text-sm outline-none transition-colors resize-none"></textarea>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={clsx(
                    "w-full py-4 border font-mono tracking-widest text-sm transition-all flex items-center justify-center gap-3",
                    loading 
                      ? "border-cyan-500/20 text-cyan-500/50 bg-black cursor-not-allowed" 
                      : "border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:box-glow"
                  )}
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {loading ? 'TRANSMITTING...' : 'SUBMIT APPLICATION'}
                </button>
              </div>
            </form>
          </CyberCard>
        </motion.div>
      )}
    </div>
  );
}