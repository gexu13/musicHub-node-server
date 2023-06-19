import mongoose from 'mongoose';
const schema = mongoose.Schema({
  review: String,
  likes: Number,
  liked: Boolean,
}, {collection: 'reviews'});
export default schema;