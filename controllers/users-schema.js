import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    avatar: String,
    userType: {type: String, enum: ["ADMIN", "USER","ARTIST"], default: "USER"},
}, {collection: "users"});

export default usersSchema;