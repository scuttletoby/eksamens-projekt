const mongoose = require( 'mongoose' );

const eventSchema = new mongoose.Schema( {

    title: {
        type: String,
        required: [ true, 'Event: Title/titel er påkrævet!' ]
    },
    content: {
        type: String,
        required: [ true, 'Event: Content/indhold er påkrævet!' ]
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Eventcategory',
        required: [true, 'Produktets category/kategori er påkrævet!'],
    },
    eventdate: {
        type: Date,
        required: [ true, 'Event: Eventdate/dato er påkrævet!' ]
    },
    destination: {
        type: String,
        required: [ true, 'Event: Destination er påkrævet!' ]
    },
    coordinates: {
        type: String,
        required: [ true, 'Event: Coordinates/koordinater er påkrævet!' ]
    },
    distance: {
        type: Number,
        required: [ true, 'Event: Distance/afstand er påkrævet!' ]
    },
    difficulty: {
        type: Number,
        min: [1, 'Event: Minimum 1 difficulty/sværhedsgrad'],
        max: [10, 'Event: Maximum 10 difficulty/sværhedsgrad'],
        default: 5
    },
    image: {
        type: String,
        required: [ true, 'Event: Image/foto er påkrævet!' ]
    }
} )


module.exports = mongoose.model( 'Event', eventSchema, 'events' )