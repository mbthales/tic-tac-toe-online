# Tic Tac Toe Online

A real-time multiplayer tic-tac-toe game built with Vue.js and Bun. Find online players and challenge them for quick matches!

**[Play Online](https://mbtictactoeonline.netlify.app)**

## Features

- **Real-time multiplayer** - WebSocket for instant communication
- **Automatic matchmaking** - Player matching system
- **Responsive** - Works perfectly on mobile and desktop
- **Real-time statistics** - Connected players and searching for matches

## Technologies

### Frontend

- **Vue 3**
- **TypeScript**
- **Pinia**
- **Tailwind CSS**
- **Vite**

### Backend

- **Bun**
- **WebSocket**
- **TypeScript**
- **Pino**
- **Docker**

## Installation and Setup

### Prerequisites

- **Node.js** (v18+)
- **Bun** (v1.0+)
- **Docker** (optional)

### Backend

```bash
# Clone repository
git clone https://github.com/yourusername/tic-tac-toe-online.git
cd tic-tac-toe-online/backend

# Install dependencies
bun install

# Configure environment variables
cp .env.example .env

# Run in development
bun run dev

# Or run in production
bun run build
bun run start
```

### Frontend

```bash
cd frontend

# Install dependencies
bun install

# Configure environment variables
cp .env.example .env

# Run in development
bun run dev

# Build for production
bun run build
bun run preview
```

### Docker (Optional)

```bash
# Backend
cd backend
docker build -t tic-tac-toe-backend .
docker run -p 3000:3000 tic-tac-toe-backend
```

## Local Configuration

### Backend (.env)

```bash
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

## Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
