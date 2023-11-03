const mongoose = require( 'mongoose' );


const keypointSchema = new mongoose.Schema(
    {
        keypoint: {
            type: String,
            required: [ true, 'Community keypoint/fokuspunkt er påkrævet' ]
        }
    }
);

const communitySchema = new mongoose.Schema( {
    suptitle: {
        type: String,
        required: [ true, 'Community: Suptitle/overtitel er påkrævet' ],
    },
    title: {
        type: String,
        required: [ true, 'Community: Title/titel er påkrævet' ],
    },
    content: {
        type: String,
        required: [ true, 'Community: Content/indhold er påkrævet' ],
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

module.exports = mongoose.model( 'Community', communitySchema, 'community' )