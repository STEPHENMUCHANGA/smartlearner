// ======================================
// 🌱 SMARTLEARNER BACKEND SERVER
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
require("./config/passport");

const app = express();
const PORT = process.env.PORT || 5000;

// ======================================
// ✅ 1. Middleware Configuration
// ======================================
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration (Frontend ↔ Backend)
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "https://smartlearner.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow tools like Postman (no origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  })
);

// Initialize Passport
app.use(passport.initialize());

// ======================================
// ✅ 2. API Routes
// ======================================
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const lessonRoutes = require("./routes/lessons");

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);

// ======================================
// ✅ 3. Static File Handling
// ======================================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", process.env.UPLOAD_DIR || "uploads"))
);

// ======================================
// ✅ 4. Health Check Endpoint
// ======================================
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "✅ SmartLearner API is running successfully",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// ======================================
// ✅ 5. Error Handling Middleware
// ======================================
app.use((err, req, res, next) => {
  console.error("⚠️ Error:", err.message);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Internal server error" });
});

// ======================================
// ✅ 6. MongoDB Connection
// ======================================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server is running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ======================================
// ✅ 7. Graceful Shutdown
// ======================================
process.on("SIGINT", async () => {
  console.log("🛑 Gracefully shutting down...");
  await mongoose.connection.close();
  process.exit(0);
});
