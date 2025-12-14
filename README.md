# Password & Notes Manager

A secure, modern web application for managing passwords and personal notes with strong encryption and user authentication. Built with React and Node.js, it offers an intuitive interface for storing sensitive information safely.

### 🔐 User Authentication
- Secure user registration with email and username validation
- Strong password requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one digit
  - At least one symbol (!@#$%^&*...)
- Password hashing with bcrypt (10 salt rounds)
- Session-based authentication with MongoDB store (connect-mongo)
- 24-hour session persistence
- HTTP-only cookies with secure settings for production
- Auto-logout functionality

### 🔑 Password Management
- Save passwords with titles, URLs (optional), and descriptions (optional)
- Automatic AES-256-GCM encryption for all stored passwords
- Toggle password visibility with eye icon
- Copy passwords to clipboard
- Edit and update existing passwords
- Delete passwords
- User-specific password isolation (users only see their own passwords)
- Automatic timestamp tracking (createdAt, updatedAt)

### ⚙️ Password Generator
- Generate strong random passwords
- Customizable options:
  - Length (8-32 characters)
  - Include/exclude uppercase letters
  - Include/exclude lowercase letters
  - Include/exclude numbers
  - Include/exclude symbols
- Copy to clipboard functionality
- Save directly to password vault

### 📝 Notes Management
- Create personal notes with title and content
- Edit and update existing notes
- Delete notes
- User-specific note storage (users only see their own notes)
- Maximum 200 characters for titles
- Maximum 10,000 characters for content
- Automatic timestamp tracking (createdAt, updatedAt)
├── index.html          # Main HTML file (Vite entry)
├── package.json        # Frontend dependencies & scripts
├── vite.config.js      # Vite configuration (port 3000)
├── tailwind.config.js  # Tailwind config
├── postcss.config.js   # PostCSS configuration
├── vercel.json         # Vercel deployment config
├── src/                # React source
│   ├── main.jsx        # Entry point
│   ├── App.jsx         # Main app component with routing
│   ├── index.css       # Global styles with Tailwind
│   ├── components/     # React components
│   │   ├── Auth.jsx    # Login/Register component
│   │   ├── Passwords.jsx # Password manager component
│   │   ├── Notes.jsx   # Notes manager component
│   │   ├── Generator.jsx # Password generator component
│   │   └── Logo.jsx    # Custom logo component
│   └── lib/            # API utilities
│       └── api.js      # API client with fetch
├── public/             # Static assets
│   └── favicon.svg     # Custom favicon
└── README.md

### Backend
- **Framework**: Express.js 4.18+
- **Database**: MongoDB with Mongoose 8.0+
- **Authentication**: express-session 1.17+ with connect-mongo 5.1+
- **Security**: 
  - bcryptjs 2.4+ (user password hashing with 10 salt rounds)
  - AES-256-GCM (stored password encryption using crypto module)
  - CORS 2.8+ (cross-origin resource sharing)
- **Middleware**: body-parser 1.20+
- **Environment**: dotenv 16.3+

### Frontend
- **Framework**: React 18.3+
- **Build Tool**: Vite 5.4+ (configured for port 3000)
- **Styling**: Tailwind CSS 3.4+ with PostCSS and Autoprefixer
- **Icons**: Lucide React 0.473+
- **Utilities**: clsx 2.1+ (conditional class names)
- **HTTP Client**: Native Fetch API
- **UI Features**: Gradient backgrounds, backdrop blur, responsive design

## 📁 Project Structure

```
Digi-Book/
├── backend/                 # Backend API
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── middleware/
│   │   └── auth.js         # Authentication middleware
│   ├── models/
│   │   ├── User.js         # User model (with email)
│   │   ├── Password.js     # Password model (with encryption)
│   │   └── Note.js         # Note model
│   ├── routes/
│   │   ├── auth.js         # Auth routes (login, register, logout)
│   │   ├── passwords.js    # Password routes
│   │   └── notes.js        # Note routes
│   ├── utils/
│   │   └── encryption.js   # AES-256-GCM encryption utilities
│   ├── .env                # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── server.js           # Main server file
│   └── README.md
│
├── frontend/                # Frontend UI (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx    # Authentication component
│   │   │   ├── Passwords.jsx # Password manager
│   │   │   ├── Notes.jsx   # Notes manager
│   │   │   ├── Generator.jsx # Password generator
│   │   │   └── Logo.jsx    # Custom logo component
│   │   ├── lib/
│   │   │   └── api.js      # API client
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── public/
│   │   └── favicon.svg     # Custom favicon
│   ├── index.html          # HTML entry point
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind configuration
│   ├── postcss.config.js   # PostCSS configuration
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── .gitignore              # Root gitignore
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** - One of the following:
   - Local MongoDB installation
   - MongoDB Atlas (cloud)
   - Docker MongoDB container

### Installation

#### 1. Install MongoDB (if not already installed)

**Option A: Local Installation**
- Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- Mac: `brew install mongodb-community`
- Linux: Follow [official guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

**Option B: MongoDB Atlas (Cloud - Recommended for beginners)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string

**Option C: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your settings:
# - Update MONGODB_URI if using Atlas or custom setup
# - Change SESSION_SECRET for production
# - Change ENCRYPTION_KEY for production (used for password encryption)

# Start the backend server
npm start

# Or for development with auto-reload
npm run dev
```

The backend will start on **http://localhost:5000**

#### 3. Setup Frontend

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend will start on **http://localhost:3000**

#### 4. Access the Application

Open your browser and go to: **http://localhost:3000**

## 📖 Usage Guide

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **For development with auto-reload:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

### First Time Setup
1. Open http://localhost:3000
2. Click "Register" button
3. Create an account:
   - Username: min 3 characters
   - Email: valid email address
   - Password: min 8 characters with uppercase, lowercase, digit, and symbol
4. You'll be automatically logged in

### Managing Passwords
1. Navigate to "Passwords" tab
2. Click "+ Add Password"
3. Fill in title, password, URL (optional), and description (optional)
4. Click "Save" (passwords are automatically encrypted)
5. Use eye icon to show/hide passwords
6. Click copy icon to copy password to clipboard
7. Edit or delete using the buttons

### Generating Passwords
1. Navigate to "Password Generator" tab
2. Adjust length and character types
3. Click "Generate Password"
4. Copy or save to your passwords

### Managing Notes
1. Navigate to "Notes" tab
2. Click "+ Add Note"
3. Enter title and content
4. Click "Save"
5. Edit or delete using the buttons

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (email, username, password)
- `POST /api/auth/login` - Login user (email, password)
- `POST /api/auth/logout` - Logout user and destroy session
- `GET /api/auth/status` - Check authentication status
- `GET /api/health` - Server health check

### Passwords
- `GET /api/passwords` - Get all passwords
- `GET /api/passwords/:id` - Get single password
- `POST /api/passwords` - Create password
- `PUT /api/passwords/:id` - Update password
- `DELETE /api/passwords/:id` - Delete password

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## ⚙️ Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/password-notes-db
SESSION_SECRET=your-secret-key-change-this
ENCRYPTION_KEY=your-encryption-key-32-chars-hex
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

**Important Notes:**
- `ENCRYPTION_KEY`: Must be a 64-character hex string (32 bytes). Use `crypto.randomBytes(32).toString('hex')` to generate one
- `SESSION_SECRET`: Change this to a strong random value for production
- `CORS_ORIGIN`: Set to your frontend URL (defaults support both 3000 and 5173)

### Frontend (.env - optional)
```env
VITE_API_BASE_URL=http://localhost:5000
```

Note: If not set, defaults to `http://localhost:5000`

## 🔒 Security Features

### Authentication Security
- **User password hashing**: bcrypt with 10 salt rounds
- **Strong password policy enforcement**:
  - Minimum 8 characters
  - Must include uppercase letter
  - Must include lowercase letter
  - Must include digit
  - Must include special symbol
- **Email validation**: Regex validation for proper email format
- **Session-based authentication**: express-session with MongoDB store
- **Secure session cookies**:
  - HTTP-only (prevents XSS attacks)
  - Secure flag in production (HTTPS only)
  - SameSite protection (CSRF prevention)
  - 24-hour expiration
  - Custom cookie name for security

### Data Encryption
- **Stored passwords**: AES-256-GCM encryption
  - Unique IV (Initialization Vector) for each password
  - Authentication tags to detect tampering
  - PBKDF2 key derivation (100,000 iterations)
  - Automatic encryption on save, decryption on retrieval

### Application Security
- **CORS protection**: Whitelist-based origin validation
- **User data isolation**: Users can only access their own data
- **Input validation**: Server-side validation for all inputs
- **Error handling**: Prevents information leakage
- **Trust proxy**: Configured for secure cookies behind proxies

## 🚨 Troubleshooting

### Backend won't start
- **MongoDB not running**: Start MongoDB service
  ```bash
  # Windows
  net start MongoDB
  
  # Mac/Linux
  brew services start mongodb-community
  # or
  sudo systemctl start mongod
  ```
- **Port 5000 in use**: Change PORT in backend/.env

### Frontend can't connect to backend
- Check if backend is running on port 5000
- Verify `VITE_API_BASE_URL` in frontend (defaults to http://localhost:5000)
- Check CORS settings in backend (should allow http://localhost:3000)
- Check browser console for CORS errors
- Ensure credentials are being sent with requests

### Session not persisting
- Clear browser cookies
- Check MongoDB connection
- Verify session configuration

## 📝 Development

### Backend Development
```bash
cd backend
npm run dev  # Auto-reload with nodemon
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server on port 3000
npm run build  # Build for production
npm run preview  # Preview production build
```

## 🌐 Production Deployment

### Backend Deployment
- Use services like: Heroku, DigitalOcean, AWS, Railway
- Set environment variables on the platform
- Use MongoDB Atlas for production database
- Enable HTTPS
- Set `NODE_ENV=production`
- Change `SESSION_SECRET` to a strong random value

### Frontend Deployment
- Build the app: `npm run build` (creates `dist/` folder)
- Use services like: Netlify, Vercel, GitHub Pages, Cloudflare Pages
- Set `VITE_API_BASE_URL` environment variable to production API URL
- Ensure CORS is configured for production domain in backend

## 📦 Future Enhancements

- [ ] Password strength indicator
- [ ] Search and filter functionality
- [ ] Tags and categories for notes
- [ ] Rich text editor for notes
- [ ] Password sharing (encrypted)
- [ ] Export/Import data
- [ ] Dark mode
- [ ] Mobile app
- [ ] Browser extension

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👤 Author

Sayan Dhara

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the backend logs in the terminal
2. Check the browser console for errors
3. Verify MongoDB is running
4. Ensure all dependencies are installed
5. Check that both servers are running on correct ports

**Enjoy your secure password and notes manager! 🔐📝**
