# Password & Notes Manager

A secure, modern web application for managing passwords and personal notes with strong encryption and user authentication. Built with React and Node.js, it offers an intuitive interface for storing sensitive information safely.

### 🔐 User Authentication
- Secure user registration with email and username
- Strong password requirements (8+ chars, uppercase, lowercase, digit, symbol)
- Password hashing with bcrypt (10 salt rounds)
- Session-based authentication with MongoDB store
- Automatic session management

### 🔑 Password Management
- Save passwords with titles, URLs, and descriptions
- AES-256-GCM encryption for all stored passwords
- View saved passwords with toggle visibility
- Edit and delete passwords
- User-specific password storage with encryption

### ⚙️ Password Generator
- Generate strong random passwords
- Customizable options:
  - Length (8-32 characters)
  - Include/exclude uppercase, lowercase, numbers, symbols
- Copy to clipboard
- Save directly to password collection

### 📝 Notes Management
- Create and organize personal notes
- Edit and update notes
- Delete notes
- User-specific note storage
├── index.html          # Main HTML file (Vite entry)
├── package.json        # Frontend dependencies & scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind config
├── src/                # React source
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/     # React components (Auth, Passwords, Notes, Generator, Logo)
│   └── lib/            # API utilities
├── public/             # Static assets (favicon.svg)
└── README.md

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: express-session with connect-mongo
- **Security**: bcryptjs (password hashing), AES-256-GCM (password encryption), CORS
- **Environment**: dotenv

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

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

The frontend will start on **http://localhost:5173** (Vite default port)

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
   http://localhost:5173
   ```

### First Time Setup
1. Open http://localhost:5173
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
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/status` - Check auth status

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
SESSION_SECRET=your-secret-key
ENCRYPTION_KEY=your-encryption-key-32-chars-hex
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env - optional)
```env
VITE_API_BASE_URL=http://localhost:5000
```

Note: If not set, defaults to `http://localhost:5000`

## 🔒 Security Features

- **User passwords**: Hashed with bcrypt (10 salt rounds)
- **Saved passwords**: Encrypted with AES-256-GCM
- **Strong password policy**: 8+ chars with uppercase, lowercase, digit, and symbol
- **Email validation**: Proper email format required
- Session-based authentication with MongoDB store
- HTTP-only cookies
- CORS protection
- User-specific data isolation
- Input validation on both frontend and backend
- XSS protection via HTML escaping

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
- Check CORS settings in backend (should allow http://localhost:5173)
- Check browser console for CORS errors

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
npm run dev  # Vite dev server on port 5173
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
- [ ] Two-factor authentication
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
