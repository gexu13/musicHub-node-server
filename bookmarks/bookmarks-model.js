import mongoose from "mongoose";
import bookmarkSchema from "./bookmarks-schema.js";

const bookmarkModel = mongoose.model("Bookmarks", bookmarkSchema);

export default bookmarkModel;  