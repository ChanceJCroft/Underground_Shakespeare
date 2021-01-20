const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/theatres');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))


router.get('/new', isLoggedIn, theatre.renderNewForm)

router.route('/:id')
    .get(catchAsync(theatre.showTheatre))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateTheatre, catchAsync(theatres.updateTheatre))
    .delete(isLoggedIn, isAuthor, catchAsync(theatres.deleteTheatre));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(theatres.renderEditForm))



module.exports = router;