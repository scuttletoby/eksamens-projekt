const mongoose = require( 'mongoose' );


// titel til kontaktsiden
// subtitel do.
// billede do.
// adresse 
const someSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [ true, 'Contactinformation social-media: Navn på medie er påkrævet' ]
        },
        link: {
            type: String,
            required: [ true, 'Contactinformation social-media: Link til medie er påkrævet' ]
        },
        icon: {
            type: String
        },
    }
);

const contactinformationSchema = new mongoose.Schema( {
    companypayoff: {
        type: String,
        required: [ true, 'Contactinformation: Companypayoff/slogan er påkrævet' ],
    },
    company: {
        type: String,
        required: [ true, 'Contactinformation: Company/firmanavn er påkrævet' ],
    },
    address: {
        type: String,
        required: [ true, 'Contactinformation: Address/adresse er påkrævet' ],
    },
    zipcity: {
        type: String,
        required: [ true, 'Contactinformation: Zip og city/Postnummer og by er påkrævet' ],
    },
    phone: {
        type: String,
        required: [ true, 'Contactinformation: Phone/telefonnummer er påkrævet' ],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [ true, 'Contactinformation: Email er påkrævet' ],
    },
    openinghours: {
        type: String,
        required: [ true, 'Contactinformation: Openinghours/åbningstider er påkrævet' ]
    },
    coordinates: {
        type: String,
        required: [ true, 'Contactinformation: Coordinates/koordinater er påkrævet' ]
    },
    some: [ someSchema ]
} )

module.exports = mongoose.model( 'Contactinformation', contactinformationSchema, 'contactinformation' )