import * as reviewsDao from './reviews-dao.js';

const findReview = async (req, res) => {
  const albumId = req.query.albumId;
  const reviews = await reviewsDao.findReview(albumId);
  res.json(reviews);
}

const createReview = async (req, res) => {
  const newReview = req.body;
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

export default (app) => {
  app.post('/api/reviews', createReview);
  app.get('/api/reviews', findReview);
  app.put('/api/reviews/:rid', updateReview);
  app.delete('/api/reviews/:rid', deleteReview);
 }