const Theatre = require('../models/theatre');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const theatre = await Theatre.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await theatre.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/theatre/${theatre._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Theatre.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/theatre/${id}`);
}
