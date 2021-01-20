const Campground = require('../models/campground');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const theatres = await Theatre.find({}).populate('popupText');
    res.render('theatres/index', { theatres })
}

module.exports.renderNewForm = (req, res) => {
    res.render('theatres/new');
}

module.exports.createTheatre = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    const theatre = new Theatre(req.body.theatre);
    theatre.geometry = geoData.body.features[0].geometry;
    theatre.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    theatre.author = req.user._id;
    await theatre.save();
    console.log(theatre);
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/theatres/${theatre._id}`)
}

module.exports.showTheatre = async (req, res,) => {
    const theatre = await Theatre.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!theatre) {
        req.flash('error', 'Cannot find that theatre!');
        return res.redirect('/theatres');
    }
    res.render('theatres/show', { theatre });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const theatre = await Theatre.findById(id)
    if (!theatre) {
        req.flash('error', 'Cannot find that theatre!');
        return res.redirect('/theatres');
    }
    res.render('theatres/edit', { theatres });
}

module.exports.updateTheatre = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const theatre = await Theatre.findByIdAndUpdate(id, { ...req.body.theatre });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    theatre.images.push(...imgs);
    await theatre.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated theatre!');
    res.redirect(`/theatres/${theatre._id}`)
}

module.exports.deleteTheatre = async (req, res) => {
    const { id } = req.params;
    await Theatre.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted theatre')
    res.redirect('/theatres');
}