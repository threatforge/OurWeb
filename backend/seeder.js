const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import models
const User = require('./models/User');
const Project = require('./models/Project');
const TeamMember = require('./models/TeamMember');
const Challenge = require('./models/Challenge');
const Event = require('./models/Event');
const Article = require('./models/Article');
const Quiz = require('./models/Quiz');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear all existing data
    await User.deleteMany();
    await Project.deleteMany();
    await TeamMember.deleteMany();
    await Challenge.deleteMany();
    await Event.deleteMany();
    await Article.deleteMany();
    await Quiz.deleteMany();

    // Create Admin User
    const createdUsers = await User.create([
      {
        name: 'Admin Forge',
        email: 'admin@threatforge.com',
        passwordHash: 'threatforge2026',
        role: 'admin',
      },
      {
        name: 'Player One',
        email: 'player@threatforge.com',
        passwordHash: 'player2026',
        role: 'player',
        points: 50,
        streak: 3
      },
      {
        name: 'Cyber Ninja',
        email: 'ninja@threatforge.com',
        passwordHash: 'ninja2026',
        role: 'player',
        points: 120,
        streak: 7
      }
    ]);

    // Create SEO Articles
    await Article.create([
      {
        title: 'SOC Analyst Roadmap: From Beginner to Pro',
        slug: 'soc-analyst-roadmap',
        content: '# The Ultimate SOC Analyst Roadmap\n\nSecurity Operations Center (SOC) analysts are the frontline defenders in cybersecurity. They monitor, detect, investigate, and respond to cyber threats.\n\n## 1. Fundamentals\n- Networking (TCP/IP, UDP, DNS)\n- Operating Systems (Linux, Windows)\n\n## 2. Security Concepts\n- SIEM (Security Information and Event Management)\n- Incident Response Lifecycle\n- Threat Intelligence\n\nStart learning today!',
        tags: ['SOC', 'Career', 'Guide']
      },
      {
        title: 'Understanding Nmap: The Ultimate Network Scanner',
        slug: 'understanding-nmap',
        content: '# Mastering Nmap\n\nNmap is a free, open-source utility for network discovery and security auditing.\n\n### Common Commands\n- `nmap -sS <target>`: Stealth SYN scan\n- `nmap -sV <target>`: Service version detection\n- `nmap -O <target>`: OS detection\n\nPractice these in a safe, controlled environment.',
        tags: ['Nmap', 'Networking', 'Tools']
      }
    ]);

    // Create Daily Quiz
    const today = new Date().toISOString().split('T')[0];
    await Quiz.create([
      {
        question: 'Which port does SSH commonly use?',
        options: ['21', '22', '80', '443'],
        correctOptionIndex: 1,
        category: 'Networking',
        difficulty: 'EASY',
        date: today
      }
    ]);

    // Create Gamified Challenges
    await Challenge.create([
      {
        title: 'Day 07 — Linux Investigation',
        slug: 'day-07-linux',
        description: 'Find the process ID (PID) of the application consuming the most CPU in a Linux environment. Which command would you use to continuously monitor this?',
        category: 'Linux',
        difficulty: 'EASY',
        points: 10,
        type: 'COMMAND',
        commandExpected: 'top',
        status: 'ACTIVE'
      },
      {
        title: 'Nmap Stealth Scan',
        slug: 'nmap-stealth',
        description: 'You need to perform a stealth SYN scan on the target IP 192.168.1.100. What is the exact nmap command?',
        category: 'Networking',
        difficulty: 'MEDIUM',
        points: 20,
        type: 'COMMAND',
        commandExpected: 'nmap -sS 192.168.1.100',
        status: 'ACTIVE'
      },
      {
        title: 'Base64 Decode CTF',
        slug: 'base64-decode',
        description: 'Decode this string to find the flag: VEhSRUFURk9SR0V7QjRTMjY0X0g0Q0szUn0=',
        category: 'Cryptography',
        difficulty: 'EASY',
        points: 15,
        type: 'FLAG',
        flag: 'THREATFORGE{B4S264_H4CK3R}',
        status: 'ACTIVE'
      }
    ]);

    console.log('Data Imported successfully! Including Phase 2 Gamification Models.');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();
    await TeamMember.deleteMany();
    await Challenge.deleteMany();
    await Event.deleteMany();
    await Article.deleteMany();
    await Quiz.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
