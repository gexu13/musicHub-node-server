import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  review: String,
  likes: Number,
  liked: Boolean,
  albumId: String,
}, {collection: 'reviews'});
export default reviewSchema;