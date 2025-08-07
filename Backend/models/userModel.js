import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    
    admin: {
        type: Boolean,
        default: false,
    },
},{timestamps: true});

export default mongoose.model('User',userSchema)