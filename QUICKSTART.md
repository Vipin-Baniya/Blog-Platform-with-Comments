# Quick Start Guide

Get the Blog Platform up and running in minutes!

## 5-Minute Setup

### Prerequisites
- Node.js v14+ installed
- npm installed
- Git installed

### Installation & Running

**Step 1: Clone and enter directory**
```bash
git clone https://github.com/Vipin-Baniya/Blog-Platform-with-Comments.git
cd Blog-Platform-with-Comments
```

**Step 2: Install all dependencies**
```bash
npm run install-all
```

**Step 3: Start the backend (Terminal 1)**
```bash
npm run dev-backend
# Backend runs on http://localhost:5000
```

**Step 4: Start the frontend (Terminal 2)**
```bash
npm run dev-frontend
# Frontend runs on http://localhost:5173
```

**Step 5: Open in browser**
- Visit `http://localhost:5173`
- Register for a new account
- Start creating posts and commenting!

## Next Steps

### Learn More
- [Architecture Overview](ARCHITECTURE.md) - Understand system design
- [Deployment Guide](DEPLOYMENT.md) - Deploy to production
- [Contributing Guide](CONTRIBUTING.md) - Help improve the project

### Useful Commands

**Backend Commands**
```bash
cd backend
npm start          # Start server
npm run dev        # Same as start
npm install        # Install dependencies
```

**Frontend Commands**
```bash
cd frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm install        # Install dependencies
```

**Root Commands**
```bash
npm run install-all    # Install all dependencies
npm run dev            # Start both frontend and backend
npm run dev-backend    # Start only backend
npm run dev-frontend   # Start only frontend
npm run build          # Build frontend for production
npm run start          # Start backend only
```

## Features to Try

1. **Register**: Create a new account
2. **Create Post**: Write your first blog post
3. **Read Posts**: Browse other users' posts
4. **Add Comments**: Comment on posts
5. **Edit/Delete**: Manage your own posts and comments

## Directory Structure

```
Blog-Platform-with-Comments/
├── backend/          # Node.js/Express API
├── frontend/         # React application
├── README.md         # Project overview
├── DEPLOYMENT.md     # Deployment guide
├── ARCHITECTURE.md   # System design
├── CONTRIBUTING.md   # Contributing guidelines
└── package.json      # Root package.json
```

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Ensure Node.js is installed: `node --version`
- Check error message in terminal

### Frontend won't start
- Check if port 5173 is available
- Ensure npm install was successful
- Clear node_modules: `rm -rf node_modules && npm install`

### Can't connect to API
- Verify backend is running on port 5000
- Check browser console for errors
- Verify API URL in `frontend/src/services/api.js`

### Database errors
- Delete `backend/blog.db` and restart backend
- Check database file permissions

## Common Issues

**Port Already in Use**
```bash
# Change port in backend/.env
PORT=5001

# For frontend, specify port
cd frontend
npm run dev -- --port 5174
```

**Module Not Found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**CORS Errors**
- Ensure backend is running
- Check CORS is enabled in `backend/server.js`
- Verify frontend API URL

## Getting Help

1. Check existing issues on GitHub
2. Review [CONTRIBUTING.md](CONTRIBUTING.md)
3. Create a new GitHub issue with:
   - Clear description
   - Steps to reproduce
   - Error messages/logs
   - Your environment (OS, Node version, etc.)

## Next: Deploy to Production

When ready to deploy:
1. Follow [DEPLOYMENT.md](DEPLOYMENT.md)
2. Set up backend on Heroku/Railway/Render
3. Deploy frontend to GitHub Pages
4. Configure custom domain (optional)

---

**Happy blogging!** 🚀
