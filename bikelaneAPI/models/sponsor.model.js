const mongoose = require( 'mongoose' );



const sponsorSchema = new mongoose.Schema( {
    sponsor: {
        type: String,
        required: [ true, 'Sponsor: Sponsor er påkrævet' ],
    },
    logo: {
        type: String,
        required: [ true, 'Sponsor: Logo er påkrævet' ],
    }
} )

module.exports = mongoose.model( 'Sponsor', sponsorSchema, 'sponsors' )