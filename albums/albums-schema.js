import mongoose from "mongoose";
const albumsSchema = mongoose.Schema(
  {
    name: String,
    albumId: String,
    artist: String,
    image: String,
    likes: { type: Number, default: 0 },
  },
  { collection: "albums" }
);

export default albumsSchema;
