import mongoose from "mongoose";
import albumsSchema from "./albums-schema.js";

const albumsModel = mongoose.model("Album", albumsSchema);

export default albumsModel;