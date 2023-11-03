const mongoose = require( 'mongoose' );


const keypointSchema = new mongoose.Schema(
    {
        keypoint: {
            type: String,
            required: [ true, 'Interest keypoint: Keypoint/fokuspunkt er påkrævet' ]
        },
        description: {
            type: String,
            required: [ true, 'Interest keypoint: Description/beskrivelse er påkrævet' ]
        },
        icon: {
            type: String,
            required: [ true, 'Interest keypoint: Icon/ikon er påkrævet' ]
        }
    }
);


const interestSchema = new mongoose.Schema( {
    suptitle: {
        type: String,
        required: [ true, 'Interest: Suptitle/overtitel er påkrævet' ],
    },
    title: {
        type: String,
        required: [ true, 'Interest: Title/titel er påkrævet' ],
    },
    content: {
        type: String,
        required: [ true, 'Interest: Content/indhold er påkrævet' ],
    },
    image1: {
        type: String,
        required: [ true, 'Event: Image/foto 1 er påkrævet!' ]
    },
    image2: {
        type: String,
        required: [ true, 'Event: Image/foto 2 er påkrævet!' ]
    },
    image3: {
        type: String,
        required: [ true, 'Event: Image/foto 3 er påkrævet!' ]
    },
    image4: {
        type: String,
        required: [ true, 'Event: Image/foto 4 er påkrævet!' ]
    },
    keypoints: [ keypointSchema ] // fokuspunkter
} )

module.exports = mongoose.model( 'Interest', interestSchema, 'interest' )