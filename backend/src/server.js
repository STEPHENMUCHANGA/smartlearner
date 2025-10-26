// ======================================
// 🌱 SMARTLEARNER BACKEND SERVER (FINAL PRODUCTION VERSION)
// ======================================

// Load environment variables
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const passport = require("passport");

// Load Passport config
require("./config/passport.js");

const app = express();
const PORT = process.env.PORT || 5000;

// ======================================
// ✅ 1. Express & Proxy Configuration
// ======================================
app.set("trust proxy", 1); // Required for Render & Vercel proxies
app.use(express.json());
app.use(cookieParser());

// ======================================
// ✅ 2. CORS Configuration (Improved & Strict Whitelist)
// ======================================
const allowedOrigins = [
  'http://localhost:5173',              // Local dev
  'http://127.0.0.1:5173',              // Alternative localhost
  'https://smartlearner-stephen.vercel.app', // ✅ Your deployed frontend
  'https://smartlearner-frontend.vercel.app', // Optional secondary frontend
  'https://smartlearner-8tgb.onrender.com/api', // ✅ Your deployed backend
  process.env.FRONTEND_URL,             // Optional env URLs
  process.env.FRONTEND_URL_PROD,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // ✅ Required for cookies or auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());


// ✅ 3. Request Logger (for debugging)
// ======================================
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Initialize Passport for OAuth
app.use(passport.initialize());

// ======================================
// ✅ 4. Route Imports
// ======================================
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const lessonRoutes = require("./routes/lessons");

// Map routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);

// ======================================
// ✅ 5. Static File Handling
// ======================================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", process.env.UPLOAD_DIR || "uploads"))
);

// ======================================
// ✅ 6. Health Check & Test Routes
// ======================================
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "✅ SmartLearner API is running successfully",
    environment: process.env.NODE_ENV || "development",
    allowedOrigins,
    timestamp: new Date().toISOString(),
  });
});

// Simple test route for verifying deployment
app.get("/api/test", (req, res) => {
  res.json({
    message: "🚀 SmartLearner backend test route is working correctly!",
    time: new Date().toISOString(),
  });
});

// ======================================
// ✅ 7. Error Handling Middleware
// ======================================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});

// ======================================
// ✅ 8. MongoDB Connection
// ======================================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 SmartLearner backend running on port ${PORT}`);
      console.log(`🌐 Accessible at: http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  });

// ======================================
// ✅ 9. Graceful Shutdown
// ======================================
process.on("SIGINT", async () => {
  console.log("🛑 Gracefully shutting down...");
  await mongoose.connection.close();
  process.exit(0);
});