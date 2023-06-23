import * as reviewsDao from './reviews-dao.js';

const ReviewController = (app) => {

  const findReview = async (req, res) => {
    const albumId = req.query.albumId;
    const reviews = await reviewsDao.findReview(albumId);
    res.json(reviews);
  }

  const findReviewByAuthorId = async (req, res) => {
    const author = req.params.uid;
    const reviews = await reviewsDao.findReviewByAuthorId(author);
    res.json(reviews);
  } 

  const findMyReview = async (req, res) => {
    console.log("findMyReview");
    const currentUser = req.session["currentUser"];
    const reviews = await reviewsDao.findReviewByAuthorId(currentUser._id);
    console.log(reviews);
    console.log("currentUser._id");
    res.json(reviews); 
  }

  const createReview = async (req, res) => {
    const newReview = req.body; 
    const currentUser = req.session["currentUser"];
    newReview.author = currentUser._id;
    newReview.likes = 0;
    newReview.liked = false;
    newReview.albumId = req.body.albumId; 
    const insertedReview = await reviewsDao.createReview(newReview);
    res.json(insertedReview); 
  }

  const deleteReview = async (req, res) => {
    const reviewIdToDelete = req.params.rid;
    const status = await reviewsDao.deleteReview(reviewIdToDelete);
    res.json(status);
  }

  const updateReview = async (req, res) => {
    const reviewIdToUpdate = req.params.rid;
    const updates = req.body;
    const status = await reviewsDao.updateReview(reviewIdToUpdate, updates);
    res.json(status);
  }

    app.post('/api/reviews', createReview);
    app.get('/api/reviews', findReview);
    app.get('/api/reviews/author/:uid', findReviewByAuthorId);
    app.put('/api/reviews/:rid', updateReview);
    app.delete('/api/reviews/:rid', deleteReview);
    app.get('/api/reviews/my-reviews', findMyReview);
  }
  
 export default ReviewController;