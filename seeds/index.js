const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Theatre = require('../models/theatre');

mongoose.connect('mongodb://localhost:27017/theatre-review', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Theatre.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const theatre = new Theatre({
            //YOUR USER ID
            author: '5fc2b35a91f59702424bbc7e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701356/YelpCamp/12_wnov9a.jpg',
                    filename: 'YelpCamp/12_wnov9a'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701362/YelpCamp/1_lnxtzb.jpg',
                    filename: 'YelpCamp/1_lnxtzb'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701364/YelpCamp/2_jgnqmo.jpg',
                    filename: 'YelpCamp/2_jgnqmo'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701364/YelpCamp/3_pmlqmc.jpg',
                    filename: 'YelpCamp/3_pmlqmc'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701381/YelpCamp/4_qv3c8v.jpg',
                    filename: 'YelpCamp/4_qv3c8v'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701366/YelpCamp/5_mfitfg.jpg',
                    filename: 'YelpCamp/5_mfitfg'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701372/YelpCamp/6_opmyug.jpg',
                    filename: 'YelpCamp/6_opmyug'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701356/YelpCamp/12_wnov9a.jpg',
                    filename: 'YelpCamp/12_wnov9a'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701382/YelpCamp/7_gq4oh1.jpg',
                    filename: 'YelpCamp/7_gq4oh1'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701379/YelpCamp/8_ugcuwq.jpg',
                    filename: 'YelpCamp/8_ugcuwq'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701379/YelpCamp/9_hqim5i.jpg',
                    filename: 'YelpCamp/9_hqim5i'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701378/YelpCamp/10_swkwgv.jpg',
                    filename: 'YelpCamp/10_swkwgv'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701377/YelpCamp/11_jwhxos.jpg',
                    filename: 'YelpCamp/11_jwhxos'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701372/YelpCamp/16_gesaox.jpg',
                    filename: 'YelpCamp/16_gesaox'
                },
                {
                    url: 'https://res.cloudinary.com/ddmawazlq/image/upload/v1606701368/YelpCamp/17_neygqm.jpg',
                    filename: 'YelpCamp/17_neygqm'
                }
            ]
        })
        await theatre.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})