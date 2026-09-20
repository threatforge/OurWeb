const fs = require('fs');

const pages = ['Home', 'About', 'Operations', 'Team', 'Projects', 'Challenges', 'Join'];
pages.forEach(p => fs.writeFileSync(`d:/Hackaton/threatforge/frontend/src/pages/public/${p}.jsx`, `export default function ${p}() { return <div className="pt-20 px-8">${p} Page</div>; }`));

const adminPages = ['AdminLogin', 'Dashboard'];
adminPages.forEach(p => fs.writeFileSync(`d:/Hackaton/threatforge/frontend/src/pages/admin/${p}.jsx`, `export default function ${p}() { return <div className="pt-20 px-8">${p} Admin Page</div>; }`));

fs.writeFileSync(`d:/Hackaton/threatforge/frontend/src/components/layout/Navbar.jsx`, `export default function Navbar() { return <nav className="fixed w-full z-50 h-16 border-b border-white/10 bg-black/50 backdrop-blur-md flex items-center px-8 text-cyan-500 font-bold tracking-widest">THREATFORGE</nav>; }`);

fs.writeFileSync(`d:/Hackaton/threatforge/frontend/src/components/layout/Footer.jsx`, `export default function Footer() { return <footer className="h-16 border-t border-white/10 flex items-center justify-center text-sm text-gray-500 mt-20">© 2026 ThreatForge</footer>; }`);
