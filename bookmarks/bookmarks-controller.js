import * as bookmarkDao from './bookmarks-dao.js';

const BookmarksController = (app) => {

  const findMyBookmark = async (req, res) => {
    console.log("12345");
    const currentUser = req.session["currentUser"];
    const bookmarks = await bookmarkDao.findBookmarkByAuthorId(currentUser._id); 
    //console.log("currentUser._id");
    res.json(bookmarks); 
  } 

  const createBookmark = async (req, res) => {
    const newBookmark = req.body;
    const currentUser = req.session["currentUser"];
    newBookmark.author = currentUser._id;
    newBookmark.albumId = req.body.albumId;
    const insertedBookmark = await bookmarkDao.createBookmark(newBookmark);
    res.json(insertedBookmark);
  };
  
  const deleteBookmark = async (req, res) => {
    const bookmarkIdToDelete = req.params.rid;
    const status = await bookmarkDao.deleteBookmark(bookmarkIdToDelete);
    res.json(status);
  }
 
    app.post('/api/bookmarks', createBookmark);
    app.delete('/api/bookmarks/:rid', deleteBookmark);
    app.get('/api/bookmarks/my-bookmarks', findMyBookmark);
  }
  
 export default BookmarksController;