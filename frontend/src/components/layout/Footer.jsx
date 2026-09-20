import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Code, Camera, Link as LinkIcon, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-md pt-16 pb-8 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-4 group inline-flex">
            <Shield className="w-6 h-6 text-cyan-500" />
            <span className="font-mono font-bold tracking-widest text-white">THREATFORGE</span>
          </Link>
          <p className="text-sm text-gray-400 font-mono tracking-wide mb-6">
            DETECT. ANALYZE. DEFEND.
          </p>
          <p className="text-xs text-gray-500 max-w-sm">
            A cybersecurity team built to compete, build, research and defend. Join us in shaping the future of security operations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-mono font-bold text-white mb-4 tracking-widest text-sm">OPERATIONS</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/operations" className="hover:text-cyan-400 transition-colors">Blue Team</Link></li>
            <li><Link to="/operations" className="hover:text-cyan-400 transition-colors">Threat Hunting</Link></li>
            <li><Link to="/projects" className="hover:text-cyan-400 transition-colors">Projects</Link></li>
            <li><Link to="/challenges" className="hover:text-cyan-400 transition-colors">Challenges</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-mono font-bold text-white mb-4 tracking-widest text-sm">CONNECT</h4>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Code className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <LinkIcon className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Camera className="w-5 h-5" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-600 font-mono tracking-widest">
          © {new Date().getFullYear()} THREATFORGE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 text-xs text-gray-600 font-mono">
          <Link to="#" className="hover:text-gray-400">PRIVACY</Link>
          <Link to="#" className="hover:text-gray-400">TERMS</Link>
        </div>
      </div>
    </footer>
  );
}