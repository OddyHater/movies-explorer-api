const express = require('express');

const router = express.Router();
const { getMoiveList, createMovie, deleteMovie } = require('../controllers/movies');
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

router.get('/movies', getMoiveList);

router.patch('/movies', createMovieValidation, createMovie);

router.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
