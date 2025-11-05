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
# DigiBook - Frontend

React + Vite frontend for the DigiBook password & notes manager application. Built with React, Tailwind CSS and Lucide icons.

## Tech Stack

- **React** (JSX)
- **Vite** (dev server & bundler)
- **Tailwind CSS** (utility-first styling)
- **Lucide Icons**

## Features

- Modern, responsive UI built with Tailwind
- Password generator and clipboard copy
- Secure authentication and session handling
- CRUD for passwords and notes

## Prerequisites

- Node.js 16+
- Backend API running on http://localhost:5000

## Installation

1. Install dependencies:

```bash
npm install
```

2. Environment (optional):
Create a `.env` file in the frontend directory to set the API base URL for Vite:

```env
VITE_API_BASE_URL=http://localhost:5000
```

3. Start the dev server:

```bash
npm run dev
```

By default Vite will serve the app (commonly on `http://localhost:3000` — check the terminal output).

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — locally preview production build

## Project Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── components/
│       ├── Auth.jsx
│       ├── Passwords.jsx
│       ├── Notes.jsx
│       └── Generator.jsx
└── README.md
```

## Configuration

Set the API base URL using `VITE_API_BASE_URL` (see `.env` example above) or update the API helper in `src/lib/api.js`.

## Development Notes

- The app uses Vite + React — edit files in `src/` and Vite will HMR.
- Tailwind classes are used throughout. If you change Tailwind config, rebuild the dev server.

## Deployment

- Build with `npm run build` and deploy the generated `dist/` folder to a static host (Netlify, Vercel, etc.).
- Ensure the backend API URL is set correctly for production.

## Troubleshooting

- If the frontend can't reach the backend, verify `VITE_API_BASE_URL` or the API helper.
- Check browser console and network tab for errors.

## License

ISC

## Support

For backend usage and API details, see the `backend/README.md`.
