const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', () => {
    console.log('DB CONNECTED');
})


const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '63b9dafe19f19202e7693e85',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, dicta quidem. Reiciendis dicta, pariatur nemo ut vel fugiat repellendus, sunt ipsum iusto laboriosam nobis alias, impedit praesentium molestiae facilis in?',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dz0hgpt05/image/upload/v1676918915/YelpCamp/tfdxyeqmqjeeiyf30xfi.jpg',
                    filename: 'YelpCamp/tfdxyeqmqjeeiyf30xfi'
                },
                {
                    url: 'https://res.cloudinary.com/dz0hgpt05/image/upload/v1676918900/YelpCamp/elvcxx6mv1uqspxjfdor.jpg',
                    filename: 'YelpCamp/elvcxx6mv1uqspxjfdor'
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

