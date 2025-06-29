// server/models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    age: { type: Number },
    gender: { type: String },
    address: {
        street: { type: String },
        apartment: { type: String }, // optional
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
    },
    country: { type: String },
    phone: { type: String },
    profilePicture: { type: String }, // URL to the profile picture
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;