# Architecture Overview

This document describes the architecture and design of the Blog Platform with Comments.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                          │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Browser                                                   │ │
│  │  - React Components (JSX)                                  │ │
│  │  - React Router for navigation                             │ │
│  │  - Axios for API calls                                     │ │
│  │  - localStorage for session management                     │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                             ↓ HTTP/CORS ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  HTTP Server                                               │ │
│  │  - Express.js for routing                                  │ │
│  │  - JWT authentication middleware                           │ │
│  │  - CORS middleware                                         │ │
│  │  - Body parser middleware                                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Routes & Controllers                                      │ │
│  │  - /api/auth (register, login)                             │ │
│  │  - /api/users (profile)                                    │ │
│  │  - /api/posts (CRUD)                                       │ │
│  │  - /api/comments (CRUD)                                    │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Database Layer                                            │ │
│  │  - SQLite (Development)                                    │ │
│  │  - PostgreSQL (Production)                                 │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18.x
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3
- **Package Manager**: npm

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Database**: SQLite3 (dev) / PostgreSQL (prod)
- **CORS**: cors middleware
- **Environment**: dotenv

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL (hashed with bcrypt),
  createdAt DATETIME
)
```

### Posts Table
```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  userId INTEGER (Foreign Key),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME
)
```

### Comments Table
```sql
CREATE TABLE comments (
  id INTEGER PRIMARY KEY,
  postId INTEGER (Foreign Key),
  userId INTEGER (Foreign Key),
  content TEXT NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME
)
```

### Relationships
- One User can have many Posts
- One User can have many Comments
- One Post can have many Comments
- One Post's Comments cascade delete when post is deleted
- One User's Posts/Comments cascade delete when user is deleted

## Authentication Flow

### Registration
1. User submits username, email, password
2. Backend validates input
3. Password hashed with bcrypt (10 rounds)
4. User record created in database
5. JWT token generated
6. Token sent to frontend
7. Frontend stores token in localStorage

### Login
1. User submits username and password
2. Backend looks up user
3. Password compared with hash using bcrypt
4. JWT token generated with user info
5. Token sent to frontend
6. Frontend stores token in localStorage

### Authenticated Requests
1. Frontend includes token in Authorization header
   ```
   Authorization: Bearer <token>
   ```
2. Backend middleware validates token
3. User info extracted from token
4. Request allowed if valid, rejected if invalid

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login and get JWT token

### Users
- `GET /api/users` - Get current user profile (requires auth)
- `GET /api/users/:id` - Get specific user profile (public)

### Posts
- `GET /api/posts` - List all posts (public)
- `GET /api/posts/:id` - Get single post (public)
- `POST /api/posts` - Create new post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth, owner only)
- `DELETE /api/posts/:id` - Delete post (requires auth, owner only)

### Comments
- `GET /api/comments/post/:postId` - List comments for post (public)
- `POST /api/comments/post/:postId` - Add comment (requires auth)
- `PUT /api/comments/:id` - Edit comment (requires auth, owner only)
- `DELETE /api/comments/:id` - Delete comment (requires auth, owner only)

## Frontend Component Hierarchy

```
App
├── Header
├── Router
│   ├── Login
│   ├── Register
│   ├── BlogFeed
│   │   └── PostCard (multiple)
│   ├── PostDetail
│   │   ├── Post Content
│   │   └── Comments Section
│   │       ├── CommentForm
│   │       └── CommentList
│   │           └── CommentItem (multiple)
│   ├── CreatePost
│   └── EditPost
```

## State Management

### Frontend
- **Session State**: localStorage
  - JWT token
  - User info (id, username, email)
- **Component State**: React hooks (useState)
  - Form inputs
  - Loaded data
  - Loading/error states
- **Routing State**: URL parameters

### Backend
- **Request-based**: No persistent session
- **Token-based**: All auth info in JWT
- **Database**: Single source of truth

## Security Measures

### Password Security
- Passwords hashed with bcrypt (10 rounds)
- Never stored in plain text
- Never transmitted in response

### Authentication
- JWT tokens expire in 7 days
- Tokens included only in Authorization header
- Server validates token on each request

### CORS
- Whitelist allowed origins
- Prevent cross-site attacks

### Input Validation
- Backend validates all inputs
- Prevent SQL injection (parameterized queries)
- Prevent XSS attacks

### Ownership Validation
- Users can only modify own posts/comments
- Server-side verification prevents privilege escalation

## Error Handling

### HTTP Status Codes
- `200 OK` - Successful request
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - No/invalid token
- `403 Forbidden` - Not allowed (wrong owner)
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate (username/email)
- `500 Internal Server Error` - Server error

### Error Response Format
```json
{
  "error": "Descriptive error message"
}
```

## Data Flow Examples

### Creating a Post

1. **Frontend**: User fills form and submits
2. **Frontend**: Makes POST request with JWT token
3. **Backend Middleware**: Validates token
4. **Backend Handler**: Validates input
5. **Backend Handler**: Creates post in database
6. **Backend**: Returns post with ID
7. **Frontend**: Redirects to post detail
8. **Frontend**: Fetches and displays post

### Adding a Comment

1. **Frontend**: User types comment and submits
2. **Frontend**: Makes POST request with JWT token
3. **Backend Middleware**: Validates token
4. **Backend Handler**: Validates post exists
5. **Backend Handler**: Creates comment in database
6. **Backend**: Returns comment with ID
7. **Frontend**: Adds comment to UI without full refresh
8. **Backend**: Real posts show new comment

## Performance Considerations

### Frontend
- Lazy loading images (future enhancement)
- Code splitting with React Router
- Minification and compression (Vite)
- CSS is optimized
- No unnecessary re-renders

### Backend
- Database queries optimized
- Connection pooling (with PostgreSQL)
- Response compression
- Caching (could be added)
- Pagination (could be added for large datasets)

### Database
- Indexes on foreign keys
- Efficient queries with joins
- Cascade deletes to maintain referential integrity

## Scalability Considerations

### Current Limitations
- Single backend instance
- SQLite file-based database
- No caching layer
- No pagination

### Scaling Strategies
1. **Database**: Migrate to PostgreSQL with connection pooling
2. **Caching**: Add Redis for frequently accessed posts
3. **Load Balancing**: Use load balancer for multiple backend instances
4. **CDN**: Serve static assets from CDN
5. **Pagination**: Implement pagination for post/comment lists
6. **Search**: Add Elasticsearch for full-text search

## Future Enhancements

### Features
- [ ] User profiles with avatar
- [ ] Follow/unfollow users
- [ ] Like posts/comments
- [ ] Post categories and tags
- [ ] Search functionality
- [ ] Post scheduling
- [ ] Email notifications
- [ ] Comment threads
- [ ] Mention users in comments
- [ ] Rich text editor (Markdown)

### Infrastructure
- [ ] Automated testing
- [ ] CI/CD pipeline
- [ ] Monitoring and alerting
- [ ] Log aggregation
- [ ] Rate limiting
- [ ] API versioning
- [ ] GraphQL endpoint
- [ ] WebSocket support

---

Last updated: 2024
