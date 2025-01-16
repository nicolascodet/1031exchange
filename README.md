# PropExchange - 1031 Exchange Platform

A modern platform for managing 1031 property exchanges, built with FastAPI and Next.js.

## Features

- 🏢 Property listing and management
- 💼 1031 exchange tracking
- 👥 Multi-user support (Investors and Qualified Intermediaries)
- 🔒 Secure authentication
- 📱 Responsive design

## Tech Stack

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- Alembic
- JWT Authentication

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/propexchange.git
cd propexchange
```

2. Make the run script executable:
```bash
chmod +x run.sh
```

3. Start the development environment:
```bash
./run.sh
```

The script will:
- Check PostgreSQL status
- Create the database if needed
- Install dependencies
- Run migrations
- Start both frontend and backend servers

### Manual Setup

If you prefer to run the servers separately:

#### Backend
```bash
cd backend
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure the following settings:
   - Framework Preset: Next.js
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: .next

### Backend (Your choice of hosting)

1. Set up a PostgreSQL database
2. Configure environment variables
3. Run migrations
4. Start the FastAPI server

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 