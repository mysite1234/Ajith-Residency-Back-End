import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import residencyRoutes from './routes/residencyRoutes.js'
const app = express();

// ✅ CORS (VERY IMPORTANT)
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));


// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Backend running 🚀",
  });
});


// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Mount routes
app.use('/api/users', userRoutes);
app.use("/api/residencies", residencyRoutes);


export default app;
