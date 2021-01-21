const express = require('express');
const router = express.Router();
const theatres = require('../controllers/theatres');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateTheatre } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Theatre = require('../models/theatre');

router.route('/')
    .get(catchAsync(theatres.index))
    .post(isLoggedIn, upload.array('image'), validateTheatre, catchAsync(theatres.createTheatre))


router.get('/new', isLoggedIn, theatres.renderNewForm)

router.route('/:id')
    .get(catchAsync(theatres.showTheatre))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateTheatre, catchAsync(theatres.updateTheatre))
    .delete(isLoggedIn, isAuthor, catchAsync(theatres.deleteTheatre));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(theatres.renderEditForm))



module.exports = router;