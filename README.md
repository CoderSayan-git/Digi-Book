# Password & Notes Manager

A full-stack web application for securely managing passwords and notes with user authentication. Built with a modern MERN-style architecture using MongoDB, Express.js, and vanilla JavaScript.

## 🌟 Features

### 🔐 User Authentication
- Secure user registration and login
- Password hashing with bcrypt
- Session-based authentication with MongoDB store
- Automatic session management

### 🔑 Password Management
- Save passwords with titles and descriptions
- View saved passwords with toggle visibility
- Edit and delete passwords
- User-specific password storage

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

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: express-session with connect-mongo
- **Security**: bcryptjs, CORS
- **Environment**: dotenv

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern responsive design
- **JavaScript**: Vanilla ES6+
- **Server**: http-server for development

## 📁 Project Structure

```
Password Generator/
├── backend/                 # Backend API
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── middleware/
│   │   └── auth.js         # Authentication middleware
│   ├── models/
│   │   ├── User.js         # User model
│   │   ├── Password.js     # Password model
│   │   └── Note.js         # Note model
│   ├── routes/
│   │   ├── auth.js         # Auth routes
│   │   ├── passwords.js    # Password routes
│   │   └── notes.js        # Note routes
│   ├── .env                # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── server.js           # Main server file
│   └── README.md
│
├── frontend/                # Frontend UI
│   ├── app.js              # Main application logic
│   ├── config.js           # API configuration
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Styling
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
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

# Start the frontend server
npm start
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
2. Click "Register" tab
3. Create an account (username: min 3 chars, password: min 6 chars)
4. You'll be automatically logged in

### Managing Passwords
1. Navigate to "Passwords" tab
2. Click "+ Add Password"
3. Fill in title, password, and optional description
4. Click "Save"
5. Use eye icon to show/hide passwords
6. Edit or delete using the buttons

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
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### Frontend (config.js)
```javascript
const API_CONFIG = {
  BASE_URL: 'http://localhost:5000',
  // ... endpoints
};
```

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- Session-based authentication
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
- Verify API_CONFIG.BASE_URL in frontend/config.js
- Check CORS settings in backend

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
npm start  # Serves on port 3000
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
- Use services like: Netlify, Vercel, GitHub Pages
- Update `config.js` with production API URL
- Ensure CORS is configured for production domain

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

Your Name

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the backend logs in the terminal
2. Check the browser console for errors
3. Verify MongoDB is running
4. Ensure all dependencies are installed
5. Check that both servers are running on correct ports

**Enjoy your secure password and notes manager! 🔐📝**
