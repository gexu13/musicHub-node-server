import * as reviewsDao from './reviews-dao.js';

const findReview = async (req, res) => {
  const reviews = await reviewsDao.findReview();
  res.json(reviews);
}

const createReview = async (req, res) => {
  const newReview = req.body;
  newReview.likes = 0;
  newReview.liked = false;
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
  app.post('/api/tuits', createReview);
  app.get('/api/tuits', findReview);
  app.put('/api/tuits/:tid', updateReview);
  app.delete('/api/tuits/:tid', deleteReview);
 }