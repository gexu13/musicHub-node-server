import exp from 'constants';
import bookmarkModel from './bookmarks-model.js';
export const findBookmarkByAuthorId = (author) => bookmarkModel.find({author});
export const deleteBookmark = (rid) => bookmarkModel.deleteOne({_id: rid});
export const createBookmark = (bookmark) => bookmarkModel.create(bookmark);


 