import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { Shield, Terminal, AlertTriangle, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Access keys do not match. Integrity check failed.');
    }

    setIsSubmitting(true);
    try {
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. System rejected anomaly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-gray-950 to-gray-950 -z-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-glass border-cyber p-8 relative box-glow">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>

          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 border border-cyan-500/30">
              <Terminal className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold text-center glitch tracking-wider" data-text="NEW ENTITY INIT">
              NEW ENTITY INIT
            </h1>
            <p className="text-gray-400 text-sm font-mono mt-2">
              Generate operator credentials
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 mb-6 flex items-center gap-3 font-mono text-sm"
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 mb-6 flex items-center gap-3 font-mono text-sm"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>Entity registered. Redirecting to login node...</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">Alias (Name)</label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-black/50 border border-gray-800 text-white px-4 py-3 font-mono focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                placeholder="Neo"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">Comm Link (Email)</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-black/50 border border-gray-800 text-white px-4 py-3 font-mono focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                placeholder="operator@threatforge.net"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">Access Key (Password)</label>
              <input
                type="password"
                name="password"
                required
                minLength="6"
                className="w-full bg-black/50 border border-gray-800 text-white px-4 py-3 font-mono focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">Verify Access Key</label>
              <input
                type="password"
                name="confirmPassword"
                required
                minLength="6"
                className="w-full bg-black/50 border border-gray-800 text-white px-4 py-3 font-mono focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                placeholder="••••••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full bg-cyan-500/10 border border-cyan-500 text-cyan-400 py-3 font-mono tracking-widest uppercase hover:bg-cyan-500/20 hover:box-glow transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  COMPILING...
                </>
              ) : success ? (
                'REGISTRATION COMPLETE'
              ) : (
                'EXECUTE REGISTRATION'
              )}
            </button>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-gray-800"></div>
              <span className="flex-shrink-0 mx-4 text-gray-500 font-mono text-xs tracking-widest">OR</span>
              <div className="flex-grow border-t border-gray-800"></div>
            </div>

            <button
              type="button"
              onClick={() => alert("Google OAuth integration pending API keys.")}
              className="w-full bg-white text-black py-3 font-bold font-sans tracking-wide hover:bg-gray-200 transition-all flex items-center justify-center gap-3 rounded-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              SIGN UP WITH GOOGLE
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm font-mono">
              Already have clearance?{' '}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 hover:underline hover:text-glow transition-all">
                Login here.
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
