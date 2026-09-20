import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Loader, ExternalLink } from 'lucide-react';
import api from '../../services/api';
import clsx from 'clsx';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load events. Connection refused.');
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'ACTIVE': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'COMPLETED': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'UPCOMING': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      default: return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex justify-center items-center gap-3 mb-2">
          <Calendar className="text-cyan-400 w-8 h-8" />
          <h1 className="text-4xl font-mono font-bold tracking-widest text-white text-glow uppercase">
            Operations & Events
          </h1>
        </div>
        <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
          Workshops, bootcamps, and speaking engagements organized by ThreatForge.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
          <p className="text-cyan-400 font-mono text-sm animate-pulse">SCANNING EVENT DATABASES...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 border border-red-500/20 bg-red-500/5 rounded-sm">
          <p className="text-red-400 font-mono">{error}</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 border border-cyan-500/20 bg-black/40 rounded-sm">
          <p className="text-gray-400 font-mono">NO EVENTS SCHEDULED AT THIS TIME.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="h-full flex flex-col p-6 bg-black/60 border border-white/5 hover:border-cyan-500/50 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col h-full">
                {event.image && (
                  <div className="h-48 w-full mb-6 overflow-hidden border border-white/10 rounded-sm bg-gray-900 group-hover:border-cyan-400 transition-colors">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white font-mono tracking-wider uppercase pr-4">{event.title}</h3>
                  <span className={clsx('text-[10px] px-2 py-0.5 border rounded-sm font-mono tracking-widest uppercase whitespace-nowrap', getStatusColor(event.status))}>
                    {event.status}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-gray-400 font-mono text-xs uppercase tracking-widest">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  )}
                </div>
                
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{event.description}</p>
                
                {event.registrationUrl && event.status === 'UPCOMING' && (
                  <div className="mt-auto pt-4 border-t border-white/10 w-full">
                    <a href={event.registrationUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-black transition-colors font-mono font-bold text-sm uppercase tracking-widest border border-cyan-500/30 group">
                      <ExternalLink className="w-4 h-4 group-hover:animate-bounce" /> REGISTER NOW
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
