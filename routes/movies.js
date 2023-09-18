const express = require('express');

const router = express.Router();
const { getMoiveList, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMoiveList);

router.patch('/movies', createMovie);

router.delete('/movies/_id', deleteMovie);

module.exports = router;
