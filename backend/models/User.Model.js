import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["user", "staff", "manager", "admin"],
            default: "user",
        },
    },
    {timestamps: true}
);

const User = mongoose.model("User",UserSchema);
export default User;