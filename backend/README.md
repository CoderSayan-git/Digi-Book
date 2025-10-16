# Password & Notes Manager - Backend API

RESTful API backend for the Password & Notes Manager application built with Node.js, Express, and MongoDB.

## Features

- User authentication with sessions
- Password management (CRUD operations)
- Notes management (CRUD operations)
- MongoDB database with Mongoose ODM
- Session storage in MongoDB
- CORS enabled for frontend communication
- Environment-based configuration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: express-session with connect-mongo
- **Security**: bcryptjs for password hashing
- **Environment**: dotenv for configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env` file and update the values:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/password-notes-db
   SESSION_SECRET=your-secret-key
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Start MongoDB:**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas and update `MONGODB_URI`

4. **Run the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | No |
| GET | `/api/auth/status` | Check auth status | No |

### Password Routes (`/api/passwords`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/passwords` | Get all passwords | Yes |
| GET | `/api/passwords/:id` | Get single password | Yes |
| POST | `/api/passwords` | Create password | Yes |
| PUT | `/api/passwords/:id` | Update password | Yes |
| DELETE | `/api/passwords/:id` | Delete password | Yes |

### Note Routes (`/api/notes`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notes` | Get all notes | Yes |
| GET | `/api/notes/:id` | Get single note | Yes |
| POST | `/api/notes` | Create note | Yes |
| PUT | `/api/notes/:id` | Update note | Yes |
| DELETE | `/api/notes/:id` | Delete note | Yes |

## Request Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securePassword123"
}
```

### Create Password
```bash
POST /api/passwords
Content-Type: application/json
Cookie: connect.sid=...

{
  "title": "Gmail Account",
  "password": "mySecurePass123",
  "description": "My personal email"
}
```

### Create Note
```bash
POST /api/notes
Content-Type: application/json
Cookie: connect.sid=...

{
  "title": "Meeting Notes",
  "content": "Important discussion points..."
}
```

## Database Schema

### User Model
```javascript
{
  username: String (unique, required),
  password: String (hashed, required),
  createdAt: Date
}
```

### Password Model
```javascript
{
  user: ObjectId (ref: User),
  title: String (required),
  password: String (required),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Note Model
```javascript
{
  user: ObjectId (ref: User),
  title: String (required),
  content: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- Session-based authentication
- HTTP-only cookies
- CORS protection
- User-specific data isolation
- Input validation

## Project Structure

```
backend/
├── config/
│   └── database.js       # MongoDB connection
├── middleware/
│   └── auth.js           # Authentication middleware
├── models/
│   ├── User.js           # User model
│   ├── Password.js       # Password model
│   └── Note.js           # Note model
├── routes/
│   ├── auth.js           # Auth routes
│   ├── passwords.js      # Password routes
│   └── notes.js          # Note routes
├── .env                  # Environment variables
├── .gitignore
├── package.json
├── server.js             # Main server file
└── README.md
```

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message description"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Development

```bash
# Install nodemon for development
npm install -D nodemon

# Run in development mode
npm run dev
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/password-notes-db |
| SESSION_SECRET | Secret for session encryption | (required) |
| CORS_ORIGIN | Allowed frontend origin | http://localhost:3000 |
| NODE_ENV | Environment mode | development |

## License

ISC
