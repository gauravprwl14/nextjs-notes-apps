import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
});







export default mongoose.models.User || mongoose.model("User", UserSchema);