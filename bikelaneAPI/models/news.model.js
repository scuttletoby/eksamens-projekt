const mongoose = require( 'mongoose' );

const newsSchema = new mongoose.Schema( {

    title: {
        type: String,
        required: [ true, 'Nyhed: Title/titel er påkrævet!' ]
    },
    author: {
        type: String,
        required: [ true, 'Nyhed: Author/forfatter er påkrævet!' ]
    },
    content: {
        type: String,
        required: [ true, 'Nyhed: Content/indhold er påkrævet!' ]
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Nyhedscategory',
        required: [false, 'Nyheds category/kategori er påkrævet!'],
    },
    newsdate: {
        type: Date,
        required: [ true, 'Nyhed: newsdate/dato er påkrævet!' ]
    },
    image: {
        type: String,
        required: [ true, 'Nyhed: Image/foto er påkrævet!' ]
    }
} )


module.exports = mongoose.model( 'News', newsSchema, 'news' )