const express = require('express');

const router = express.Router();
const { getMoiveList, createMovie, deleteMovie } = require('../controllers/movies');
const {
  getMovieListValidation,
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

router.get('/movies', getMovieListValidation, getMoiveList);

router.patch('/movies', createMovieValidation, createMovie);

router.delete('/movies/_id', deleteMovieValidation, deleteMovie);

module.exports = router;
