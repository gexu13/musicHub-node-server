import mongoose from 'mongoose';

const bookmarkSchema = mongoose.Schema({
  albumId: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  postTime: {type: Date, default: Date.now},
}, {collection: 'bookmarks'});
export default bookmarkSchema;  