# THREATFORGE

**DETECT. ANALYZE. DEFEND.**

ThreatForge is a complete, production-ready full-stack cybersecurity team platform designed for Blue Teams, SOC environments, and CTF competitors.

## About
A cybersecurity team built to compete, build, research and defend. The platform serves as a central hub for team operations, project showcases, recruitment, and interactive challenge management.

## Features
- **Cinematic Hacker Aesthetic**: Custom Tailwind CSS theme with scanlines, glows, and Framer Motion animations.
- **Operations Dashboard**: Overview of Blue Team, SOC, and Threat Hunting activities.
- **Dynamic Team Roster**: Centralized team database fetched via REST API.
- **Project Showcase**: Display internal tools and research with interactive filtering.
- **Challenges Hub**: Platform for launching educational cybersecurity exercises.
- **Recruitment Pipeline**: Complete application submission system.
- **Command Center (Admin)**: Protected dashboard for managing users, applications, projects, and challenges.

## Tech Stack
**Frontend:**
- React (Vite)
- Tailwind CSS v4
- Framer Motion
- React Router DOM
- Axios

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs
- Helmet & Express Rate Limit

## Project Structure
```text
threatforge/
  ├── backend/               # Express API server
  │   ├── config/            # DB configuration
  │   ├── controllers/       # Route logic
  │   ├── middleware/        # Auth & Security
  │   ├── models/            # Mongoose schemas
  │   ├── routes/            # API endpoints
  │   └── server.js          # Entry point
  └── frontend/              # React UI
      ├── src/
      │   ├── components/    # Reusable UI (CyberCard, Terminal)
      │   ├── context/       # Auth state management
      │   ├── pages/         # Public & Admin views
      │   ├── services/      # Axios API service
      │   └── App.jsx        # Routing configuration
```

## Environment Variables
Create a `.env` file in the `backend` directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/threatforge
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```
*(Also reference `.env.example`)*

## Installation

### Database Setup
1. Ensure MongoDB is running locally on port `27017` or update the `MONGO_URI` to an Atlas cluster.

### Backend Setup
```bash
cd backend
npm install
npm run seed     # Seeds the initial admin user
npm run dev      # Starts the backend on port 5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Starts the Vite dev server on port 5173
```

## Admin Setup
By default, the `seeder.js` script creates an admin with the following credentials:
- **Email**: `admin@threatforge.com`
- **Password**: `threatforge2026`

Access the Command Center at `http://localhost:5173/admin/login`.

## Deployment
- **Frontend**: Ready for deployment on Vercel or Netlify. Make sure to set the `VITE_API_URL` environment variable to your production backend URL.
- **Backend**: Ready for Render, Railway, or Heroku. Ensure `MONGO_URI` and `JWT_SECRET` are configured in the host environment.
- **Database**: Compatible with MongoDB Atlas.

## Contributing
Follow standard GitHub Flow. Create a feature branch, commit changes, and open a Pull Request.

## License
© 2026 ThreatForge. All Rights Reserved.
