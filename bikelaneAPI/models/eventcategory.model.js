const mongoose = require('mongoose');

const eventcategorySchema = new mongoose.Schema({

    category: {
        type: String,
        required: [true, 'Category/kategori er påkrævet!']
    }
})


module.exports = mongoose.model('Eventcategory', eventcategorySchema, 'eventcategories')