const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // ✅ not required, since Google users don’t have passwords
    googleId: { type: String }, // ✅ for OAuth
    avatar: { type: String },   // ✅ profile photo
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

// ✅ Hash password before save (only if modified and not empty)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Compare plain password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false; // prevents bcrypt on null
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
