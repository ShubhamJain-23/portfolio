# Backend & Contact Form Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas cloud)
- npm or bun package manager

## Backend Setup

### 1. Install Dependencies
```bash
cd server
npm install
# or
bun install
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
PORT=5000
NODE_ENV=development
```

**MongoDB Connection Options:**

#### Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```

#### MongoDB Atlas (Recommended)
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string and replace credentials
4. Example: `mongodb+srv://user:pass@cluster.mongodb.net/portfolio`

### 3. Start Backend Server
```bash
# In server directory
npm run dev
# or
bun run dev
```

The server will run on `http://localhost:5000`

## Frontend Setup

### 1. Create `.env` file in project root
```env
VITE_API_URL=http://localhost:5000
```

### 2. Start Development Server
```bash
npm run dev
# or
bun run dev
```

## API Endpoints

### Submit Contact Form
**POST** `/api/contact`

Request body:
```json
{
  "name": "Your Name",
  "email": "your@email.com",
  "message": "Your message here (min 10 chars)"
}
```

Response:
```json
{
  "success": true,
  "message": "Contact message received successfully",
  "data": {
    "_id": "...",
    "name": "Your Name",
    "email": "your@email.com",
    "message": "Your message",
    "createdAt": "2026-04-12T10:00:00Z"
  }
}
```

### Get All Messages (Admin)
**GET** `/api/contact`

### Health Check
**GET** `/api/health`

## Validation Rules
- **Name**: Required, trimmed
- **Email**: Required, valid email format
- **Message**: Required, minimum 10 characters

## Troubleshooting

### MongoDB Connection Errors
- Ensure MongoDB service is running locally, or MongoDB Atlas cluster is active
- Check connection string in `.env`
- Verify IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)

### CORS Errors
- Backend has CORS enabled for all origins
- Check that `VITE_API_URL` matches your backend port

### Port Already in Use
- Change `PORT` in `server/.env` to a different port (e.g., 5001)
- Update `VITE_API_URL` accordingly

## Project Structure
```
portfolio/
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   └── Contact.js
│   │   ├── routes/
│   │   │   └── contact.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── src/
│   ├── components/
│   │   └── ContactSection.tsx (updated)
│   └── ...
├── .env
└── ...
```

## Next Steps
1. Create MongoDB Atlas account and cluster
2. Copy connection string to `server/.env`
3. Install backend dependencies
4. Run backend: `npm run dev` in server folder
5. Run frontend: `npm run dev` in root folder
6. Test contact form at `http://localhost:8080`
