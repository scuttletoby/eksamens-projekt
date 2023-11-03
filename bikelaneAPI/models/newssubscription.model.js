const mongoose = require( 'mongoose' );


const newssubscriptionSchema = new mongoose.Schema( {
    email: {
        type: String,
        trim: true,
        lowercase: true,
        index: { unique: true },
        required: [ true, 'Newssubscription: Email er påkrævet!' ],
    },
    received: {
        type: Date,
        default: Date.now
    }
} )


module.exports = mongoose.model( 'Newssubscription', newssubscriptionSchema, 'newssubscriptions' )