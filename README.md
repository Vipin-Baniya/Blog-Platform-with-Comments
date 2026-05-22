# Blog Platform with Comments

A full-stack blogging platform where users can create posts and interact through comments. Built with Node.js/Express backend and React frontend.

## Features

### Authentication & User Management
- User registration and login
- JWT token-based authentication
- User profile endpoints
- Secure password hashing with bcrypt

### Blog Posts
- Create, read, update, and delete blog posts
- Post ownership validation
- Display all posts with author information
- Edit and delete own posts

### Comments System
- Add comments to blog posts
- Edit and delete own comments
- View all comments on a post
- Nested display with author information

### Frontend
- Responsive React-based user interface
- Real-time comment updates
- Navigation between posts
- Session management with localStorage

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Frontend**: React, React Router, Axios
- **Build Tool**: Vite
- **Styling**: CSS3

## Project Structure

```
Blog-Platform-with-Comments/
├── backend/
│   ├── routes/
│   │   ├── auth.js       # Authentication endpoints
│   │   ├── users.js      # User profile endpoints
│   │   ├── posts.js      # Post CRUD endpoints
│   │   └── comments.js   # Comment CRUD endpoints
│   ├── middleware/
│   │   └── auth.js       # JWT authentication middleware
│   ├── db.js             # Database initialization
│   ├── server.js         # Express server setup
│   ├── .env              # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── BlogFeed.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   └── EditPost.jsx
│   │   ├── services/
│   │   │   └── api.js    # API communication
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── Header.css
│   │   │   ├── Auth.css
│   │   │   ├── BlogFeed.css
│   │   │   ├── PostDetail.css
│   │   │   └── CreatePost.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

#### Backend Setup
```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:5000`

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get current user profile
- `GET /api/users/:id` - Get user profile by ID

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)

### Comments
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments/post/:postId` - Create comment (requires auth)
- `PUT /api/comments/:id` - Update comment (requires auth)
- `DELETE /api/comments/:id` - Delete comment (requires auth)

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Posts**: View all blog posts on the feed
3. **Create Post**: Click "Create Post" to write a new blog post
4. **Read Post**: Click on any post to view its full content and comments
5. **Add Comments**: Comment on any post (requires login)
6. **Manage Content**: Edit or delete your own posts and comments

## Environment Variables

### Backend (.env)
```
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
DATABASE_URL=./blog.db
NODE_ENV=development
```

## Future Enhancements

- User profiles with follower system
- Like/favorite posts and comments
- Search functionality
- Tags and categories for posts
- Email notifications
- Real-time updates with WebSockets
- User avatar uploads
- Post preview/draft feature
- Social media sharing

## Deployment

### Frontend (GitHub Pages)
1. Build the React app: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

### Backend
1. Deploy to Heroku or similar service
2. Set up production database
3. Configure environment variables for production
4. Update frontend API URL in production

## License

MIT License

## Author

Vipin Baniya