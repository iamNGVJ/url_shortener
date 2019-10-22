const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/urlShort', ({
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})).then(() => {
    console.log('Db connected');
}).catch((err) => {
    console.log(err.message);
});