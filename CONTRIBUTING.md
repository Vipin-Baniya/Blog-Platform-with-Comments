# Contributing to Blog Platform with Comments

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

Please be respectful and constructive in all interactions. We value:
- Respectful communication
- Constructive feedback
- Inclusive environment
- Professional behavior

## Getting Started

### Prerequisites
- Node.js v14 or higher
- Git
- Basic understanding of JavaScript, React, and Node.js

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/Blog-Platform-with-Comments.git
   cd Blog-Platform-with-Comments
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

## Development Workflow

### Running Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

### Making Changes

1. **Create a descriptive branch name**
   ```bash
   git checkout -b feature/add-search-functionality
   # or
   git checkout -b fix/comment-edit-bug
   ```

2. **Make your changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Keep commits focused and atomic

3. **Test your changes**
   - Test locally in browser
   - Test different scenarios
   - Check console for errors

4. **Commit with clear messages**
   ```bash
   git commit -m "Add: Search functionality for blog posts"
   ```

## Code Style Guidelines

### JavaScript

- Use consistent indentation (2 spaces)
- Use meaningful variable names
- Add comments for complex logic
- Follow the existing code patterns

**Example:**
```javascript
// Good
function createPost(title, content) {
  if (!title || !content) {
    return null;
  }
  return db.run('INSERT INTO posts...', [title, content]);
}

// Avoid
function cp(t, c) {
  const p = new post(t, c);
  return p;
}
```

### React Components

- Use functional components
- Use meaningful component names
- Keep components focused and reusable
- Use destructuring for props

**Example:**
```javascript
// Good
export default function BlogPostCard({ post, onDelete }) {
  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      {/* ... */}
    </article>
  );
}

// Avoid
export default function Card(props) {
  return <article>{props.p.t}</article>;
}
```

### CSS

- Use semantic class names
- Organize styles logically
- Use CSS variables for consistency
- Mobile-first responsive design

## Commit Message Format

```
Type: Brief description

Longer explanation if needed. Explain what changed and why.

Example:
Add: User search functionality
Implements full-text search across blog posts and authors.
Allows users to quickly find relevant content.
```

### Types:
- **Add**: New feature
- **Fix**: Bug fix
- **Improve**: Enhancement to existing feature
- **Refactor**: Code reorganization
- **Docs**: Documentation updates
- **Style**: Formatting or style changes
- **Test**: Adding or updating tests

## Testing

Before submitting a PR:

1. **Manual Testing**
   - Test all user flows
   - Check on mobile devices
   - Test edge cases

2. **Browser Testing**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

## Submitting a Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Add descriptive title
   - Fill in description template

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] Enhancement
   - [ ] Documentation

   ## Related Issues
   Fixes #(issue number)

   ## Testing
   How to test the changes

   ## Screenshots (if applicable)
   Add relevant screenshots

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex logic
   - [ ] No console errors
   - [ ] Tested locally
   ```

## Pull Request Reviews

- Be open to feedback
- Respond to review comments
- Update code based on suggestions
- Re-request review after changes

## Feature Ideas

Areas for contribution:

### Backend
- [ ] Add email verification
- [ ] Implement post categories/tags
- [ ] Add post scheduling
- [ ] Implement user following system
- [ ] Add analytics/view counter
- [ ] Search functionality
- [ ] Admin panel features

### Frontend
- [ ] Dark mode theme
- [ ] Post draft feature
- [ ] Rich text editor (Markdown)
- [ ] User profiles with bio
- [ ] Search UI
- [ ] Notification bell
- [ ] Better mobile responsiveness

### General
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Improve documentation
- [ ] Add examples
- [ ] Create tutorials

## Report Bugs

Found a bug? Please create an issue with:

1. **Title**: Brief description
2. **Environment**: 
   - OS and browser version
   - Node.js version
3. **Steps to Reproduce**: 
   - Clear, step-by-step instructions
4. **Expected Behavior**: 
   - What should happen
5. **Actual Behavior**: 
   - What actually happens
6. **Screenshots/Logs**: 
   - If applicable

## Questions?

If you have questions:
1. Check existing issues/discussions
2. Create a discussion
3. Comment on related issues

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

---

Thank you for contributing! 🎉
