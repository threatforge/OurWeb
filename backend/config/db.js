const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Local MongoDB connection failed (${error.message}).`);
    console.log(`Falling back to in-memory MongoDB Server...`);
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      
      const conn = await mongoose.connect(mongoUri);
      console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
      
      // Auto-seed for in-memory database
      console.log('Seeding in-memory database with initial data...');
      const User = require('../models/User');
      const TeamMember = require('../models/TeamMember');
      const Project = require('../models/Project');
      const Event = require('../models/Event');
      const Achievement = require('../models/Achievement');
      
      await User.create([
        { name: 'Admin Forge', email: 'admin@threatforge.com', passwordHash: 'threatforge2026', role: 'admin' },
        { name: 'Player One', email: 'player@threatforge.com', passwordHash: 'player2026', role: 'player' }
      ]);
      
      await TeamMember.create([
        { name: 'Sami Ullah', role: 'Cybersecurity Researcher', bio: 'Building, learning and exploring cybersecurity through practical projects, research and competitions.', skills: ['SOC', 'Blue Team', 'Security Research'], image: '/sami.jpg', featured: true },
        { name: 'Muhammad Anas Ishfaq', role: 'Cybersecurity Student / Security Researcher', bio: 'Cybersecurity student focused on networking, security operations, ethical hacking and practical security research. Building hands-on skills through cybersecurity labs, CTFs, cloud security exercises, network analysis and security projects.', skills: ['Cybersecurity', 'Networking', 'SOC', 'Ethical Hacking', 'Blue Team', 'Security Research', 'AWS S3 Security', 'Wireshark'], image: '/anas.jpg', featured: true }
      ]);
      
      await Project.create([
        { title: 'ForgeSOC', slug: 'forgesoc', description: 'A custom-built Security Operations Center monitoring solution.', category: 'BLUE TEAM', status: 'ACTIVE', technologies: ['Elasticsearch', 'Wazuh', 'Python'] }
      ]);
      
      await Event.create([
        { title: 'Cyber Defense Bootcamp', slug: 'cyber-defense-bootcamp', description: 'Intensive 3-day training on active defense.', date: new Date().toISOString(), type: 'WORKSHOP', status: 'COMPLETED' }
      ]);
      
      await Achievement.create([
        { title: 'DefCon Qualifiers Top 100', type: 'CTF', date: new Date().toISOString(), description: 'Ranked in the top 100 globally out of 2000+ teams.' }
      ]);
      
      console.log('In-memory database successfully seeded!');
    } catch (fallbackError) {
      console.error(`Error connecting to In-Memory MongoDB: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
