# DigiBook - Frontend

Modern, responsive React frontend for the DigiBook password and notes manager application.

## Tech Stack

- **React**: Modern UI library
- **Vite**: Next generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful, consistent icons

## Features

- Clean, modern UI with Tailwind CSS
- Responsive design with animations
- Real-time password generation
- Secure authentication
- CRUD operations for passwords and notes
- Password visibility toggle
- Copy to clipboard functionality

## Prerequisites

- Node.js 16+
- Backend API running on http://localhost:5000
- MongoDB running locally or accessible

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## Configuration

Edit `config.js` to change API settings:

```javascript
const API_CONFIG = {
  BASE_URL: 'http://localhost:5000',
  // ... endpoints
};
```

## Project Structure

```
frontend/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── app.js              # Main application logic
├── config.js           # API configuration
├── package.json        # Dependencies
├── .gitignore
└── README.md
```

## Features Overview

### Authentication
- User registration with validation
- Secure login
- Session management
- Auto-login on page load if session exists

### Password Management
- Create, read, update, delete passwords
- Toggle password visibility
- Search and filter (coming soon)
- Password strength indicator (coming soon)

### Password Generator
- Customizable length (8-32 characters)
- Character type options:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special symbols
- Copy to clipboard
- Save directly to passwords

### Notes Management
- Create, read, update, delete notes
- Rich text support (coming soon)
- Tags and categories (coming soon)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

The frontend uses vanilla JavaScript with no build process required. Simply edit the files and refresh the browser.

### File Organization

- **index.html**: Page structure and layout
- **styles.css**: All styling including responsive design
- **config.js**: API endpoints and configuration
- **app.js**: Application logic, API calls, DOM manipulation

### API Communication

All API requests use the Fetch API with proper error handling:

```javascript
async function apiRequest(endpoint, options = {}) {
  // Includes credentials (cookies) for session management
  // Handles errors and returns parsed JSON
}
```

## Customization

### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --primary-color: #4f46e5;
  --secondary-color: #64748b;
  /* ... more colors */
}
```

### Changing API URL

Edit `config.js`:

```javascript
const API_CONFIG = {
  BASE_URL: 'http://your-api-url.com',
  // ...
};
```

## Security Notes

- All passwords are transmitted over HTTPS (use in production)
- Session cookies are HTTP-only
- XSS protection via HTML escaping
- CORS configured for specific origin

## Deployment

For production deployment:

1. Build a static server or use services like:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront

2. Update `config.js` with production API URL

3. Ensure CORS is properly configured on backend

## Troubleshooting

### Can't connect to API
- Check if backend is running on port 5000
- Check CORS settings in backend
- Verify API_CONFIG.BASE_URL in config.js

### Session not persisting
- Ensure `credentials: 'include'` in fetch requests
- Check browser cookie settings
- Verify backend session configuration

### Styles not loading
- Clear browser cache
- Check browser console for errors
- Verify styles.css path

## License

ISC

## Support

For issues and questions, please check the backend README or create an issue in the repository.
