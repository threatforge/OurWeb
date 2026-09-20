import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Users, FolderKanban, Flag, Calendar, Activity, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalApplications: 0,
    totalProjects: 0,
    totalAchievements: 0,
    totalEvents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const { data } = await api.get('/stats');
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const statCards = [
    { label: 'MEMBERS', value: stats.totalMembers, icon: Users, color: 'text-cyan-400', border: 'border-cyan-500/30' },
    { label: 'APPLICATIONS', value: stats.totalApplications, icon: Activity, color: 'text-yellow-400', border: 'border-yellow-500/30' },
    { label: 'PROJECTS', value: stats.totalProjects, icon: FolderKanban, color: 'text-green-400', border: 'border-green-500/30' },
    { label: 'ACHIEVEMENTS', value: stats.totalAchievements, icon: Flag, color: 'text-red-400', border: 'border-red-500/30' },
    { label: 'EVENTS', value: stats.totalEvents, icon: Calendar, color: 'text-purple-400', border: 'border-purple-500/30' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-6 min-h-screen max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0 bg-black/60 border border-white/10 p-4 rounded-sm flex flex-col h-[calc(100vh-8rem)] sticky top-24">
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <ShieldAlert className="w-6 h-6 text-cyan-400" />
          <span className="font-mono font-bold text-white tracking-widest text-sm">COMMAND CENTER</span>
        </div>
        
        <nav className="flex flex-col gap-2 font-mono text-sm tracking-widest flex-grow">
          <Link to="/admin/dashboard" className="px-4 py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-sm">
            DASHBOARD
          </Link>
          <Link to="#" className="px-4 py-3 hover:bg-white/5 text-gray-400 hover:text-white rounded-sm transition-colors border border-transparent hover:border-white/10">
            APPLICATIONS
          </Link>
          <Link to="#" className="px-4 py-3 hover:bg-white/5 text-gray-400 hover:text-white rounded-sm transition-colors border border-transparent hover:border-white/10">
            TEAM ROSTER
          </Link>
          <Link to="#" className="px-4 py-3 hover:bg-white/5 text-gray-400 hover:text-white rounded-sm transition-colors border border-transparent hover:border-white/10">
            PROJECTS
          </Link>
          <Link to="#" className="px-4 py-3 hover:bg-white/5 text-gray-400 hover:text-white rounded-sm transition-colors border border-transparent hover:border-white/10">
            ACHIEVEMENTS
          </Link>
          <Link to="#" className="px-4 py-3 hover:bg-white/5 text-gray-400 hover:text-white rounded-sm transition-colors border border-transparent hover:border-white/10">
            EVENTS
          </Link>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 border border-transparent rounded-sm font-mono text-sm tracking-widest transition-colors"
          >
            <LogOut className="w-4 h-4" /> DISCONNECT
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-mono font-bold text-white mb-1 tracking-widest uppercase">System Overview</h2>
          <p className="text-gray-400 font-mono text-sm">Welcome back, Admin. All systems operational.</p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {statCards.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-black/40 border ${stat.border} p-4 rounded-sm relative overflow-hidden group`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-gray-400 tracking-widest">{stat.label}</span>
                <stat.icon className={`w-4 h-4 ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div className={`text-3xl font-mono font-bold ${stat.color}`}>
                {stat.value.toString().padStart(2, '0')}
              </div>
              <div className={`absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-tl from-current to-transparent opacity-10 ${stat.color} rounded-full blur-xl group-hover:opacity-20 transition-opacity`}></div>
            </motion.div>
          ))}
        </div>
        
        {/* Activity Panel */}
        <div className="bg-black/40 border border-white/10 rounded-sm p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="font-mono font-bold tracking-widest text-white">SYSTEM_LOGS</h3>
          </div>
          
          <div className="space-y-4 font-mono text-sm">
            <div className="flex gap-4 p-3 bg-white/5 border-l-2 border-yellow-400 hover:bg-white/10 transition-colors">
              <span className="text-gray-500 shrink-0">10:42 AM</span>
              <div>
                <span className="text-yellow-400 font-bold">NEW APPLICATION</span>
                <span className="text-gray-300 ml-2">Sami applied for Blue Team / SOC</span>
              </div>
            </div>
            <div className="flex gap-4 p-3 bg-white/5 border-l-2 border-green-400 hover:bg-white/10 transition-colors">
              <span className="text-gray-500 shrink-0">09:15 AM</span>
              <div>
                <span className="text-green-400 font-bold">PROJECT UPDATED</span>
                <span className="text-gray-300 ml-2">Threat Detection Dashboard deployed to production</span>
              </div>
            </div>
            <div className="flex gap-4 p-3 bg-white/5 border-l-2 border-cyan-400 hover:bg-white/10 transition-colors">
              <span className="text-gray-500 shrink-0">08:00 AM</span>
              <div>
                <span className="text-cyan-400 font-bold">NEW CHALLENGE</span>
                <span className="text-gray-300 ml-2">SOC Investigation #001 initialized (Medium)</span>
              </div>
            </div>
            <div className="flex gap-4 p-3 bg-white/5 border-l-2 border-gray-500 hover:bg-white/10 transition-colors">
              <span className="text-gray-500 shrink-0">Yesterday</span>
              <div>
                <span className="text-gray-400 font-bold">SYSTEM BACKUP</span>
                <span className="text-gray-300 ml-2">Automated database snapshot completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Manager (MVP placeholder) */}
        <div className="bg-black/40 border border-white/10 rounded-sm p-6 mt-8">
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <Calendar className="w-5 h-5 text-purple-400" />
            <h3 className="font-mono font-bold tracking-widest text-white">SYSTEM MANAGER</h3>
          </div>
          <p className="text-gray-400 font-mono text-sm">
            Content management capabilities (Projects, Achievements, Events) are active in the backend database. A full CRUD interface for the Admin Dashboard will be deployed in the next update.
          </p>
        </div>
        
      </div>
    </div>
  );
}