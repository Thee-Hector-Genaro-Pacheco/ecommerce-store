// Import mongoose to define schema and model
import mongoose from "mongoose";

// Define the User schema (structure of each document in the 'users' collection)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true},              // Username must be provided
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, default: false }              // Default to false, can be set to true for admin users
}, { timestamps: true});                                    // Adds created and updatedAt fields

export default mongoose.model('User', userSchema)

