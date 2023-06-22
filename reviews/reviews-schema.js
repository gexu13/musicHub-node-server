import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  review: String,
  likes: Number,
  liked: Boolean,
  albumId: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  postTime: {type: Date, default: Date.now},
}, {collection: 'reviews'});
export default reviewSchema;