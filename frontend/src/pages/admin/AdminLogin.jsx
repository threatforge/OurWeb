import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Terminal, KeyRound } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError('');
    
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('ACCESS DENIED: NOT AUTHORIZED');
        setIsAuthenticating(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'AUTHENTICATION FAILED');
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 p-8 shadow-[0_0_30px_rgba(0,240,255,0.1)] relative overflow-hidden">
          {/* Scanline overlay */}
          <div className="absolute inset-0 scanlines pointer-events-none opacity-50"></div>
          
          <div className="relative z-10 text-center mb-8">
            <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-2xl font-mono font-bold tracking-widest text-white mb-2">
              THREATFORGE
            </h1>
            <h2 className="text-sm font-mono text-cyan-400 tracking-widest">
              // COMMAND CENTER
            </h2>
          </div>

          <div className="relative z-10 mb-6 bg-cyan-500/10 border border-cyan-500/20 p-3 text-center">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              AUTHENTICATION REQUIRED
            </span>
          </div>

          {error && (
            <div className="relative z-10 mb-6 bg-red-500/10 border border-red-500/30 p-3 text-center">
              <span className="text-red-400 font-mono text-xs tracking-widest uppercase animate-pulse">
                [ {error} ]
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-mono tracking-widest text-gray-400 mb-2">
                <Terminal className="w-4 h-4 text-cyan-500" /> USERNAME (EMAIL):
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/60 border border-white/20 focus:border-cyan-500/80 rounded-none p-3 text-cyan-300 font-mono text-sm outline-none transition-colors" 
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-xs font-mono tracking-widest text-gray-400 mb-2">
                <KeyRound className="w-4 h-4 text-cyan-500" /> PASSWORD:
              </label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/60 border border-white/20 focus:border-cyan-500/80 rounded-none p-3 text-cyan-300 font-mono text-sm outline-none transition-colors tracking-[0.2em]" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isAuthenticating}
              className="w-full py-4 mt-4 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 hover:text-white font-mono tracking-widest text-sm uppercase transition-all flex justify-center gap-3 items-center group"
            >
              {isAuthenticating ? (
                <>
                  <span className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  [ AUTHENTICATE ]
                </>
              )}
            </button>
          </form>
          
          <div className="relative z-10 mt-8 text-center border-t border-white/10 pt-4">
            <p className="text-[10px] font-mono text-gray-600 tracking-widest">
              UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}