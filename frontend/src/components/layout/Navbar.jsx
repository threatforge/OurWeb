import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Projects', path: '/projects' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Events', path: '/events' },
    { name: 'Join', path: '/join' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-black/70 backdrop-blur-md border-cyan-500/20 py-3'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <Shield className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <span className="font-mono font-bold text-xl tracking-widest text-white group-hover:text-glow transition-all">
            THREATFORGE
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={clsx(
                'text-sm font-mono tracking-wide uppercase transition-colors',
                location.pathname === link.path
                  ? 'text-cyan-400 text-glow'
                  : 'text-gray-400 hover:text-cyan-300'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth CTA / Profile */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-wide hover:text-cyan-300 transition-colors">
                <UserIcon className="w-4 h-4" />
                <span className="uppercase">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-400 font-mono text-sm tracking-widest uppercase hover:bg-red-500/20 hover:text-red-300 transition-all rounded-sm flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                DISCONNECT
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-300 font-mono text-sm tracking-widest uppercase hover:text-cyan-400 transition-all"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-transparent border border-cyan-500 text-cyan-400 font-mono text-sm tracking-widest uppercase hover:bg-cyan-500/10 hover:box-glow transition-all rounded-sm"
              >
                INIT ENTITY
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-cyan-400"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-cyan-500/20 py-4 flex flex-col gap-4 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={clsx(
                'text-sm font-mono tracking-wide uppercase py-2',
                location.pathname === link.path
                  ? 'text-cyan-400'
                  : 'text-gray-400'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="border-t border-gray-800 my-2 pt-4 flex flex-col gap-4">
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-wide">
                  <UserIcon className="w-4 h-4" />
                  <span className="uppercase">{user.name}</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-6 py-3 text-center bg-red-500/10 border border-red-500/50 text-red-400 font-mono text-sm tracking-widest uppercase rounded-sm flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  DISCONNECT
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-3 text-center border border-gray-600 text-gray-300 font-mono text-sm tracking-widest uppercase rounded-sm"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-3 text-center bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-mono text-sm tracking-widest uppercase rounded-sm"
                >
                  INIT ENTITY
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}