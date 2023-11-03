const mongoose = require( 'mongoose' );

const goalSchema = new mongoose.Schema( {

    goal: {
        type: String,
        required: [ true, 'Goal: Title/titel er påkrævet!' ]
    },
    goalcount: {
        type: Number,
        required: [ true, 'Goal: Goalcount/optæller er påkrævet!' ]
    },
    icon: {
        type: String,
        required: [ true, 'Goal: Icon/ikon er påkrævet!' ]
    },
    order: {
        type: Number
    }
} )


module.exports = mongoose.model( 'Goal', goalSchema, 'goals' )