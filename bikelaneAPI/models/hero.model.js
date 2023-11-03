// forside:                     titel   content    button  image   videolink
// goal (forside )  suptitel    titel   content            image   videolink
// about:           suptitel    titel               button  image 
// testimonial (om) suptitel    titel   content    
// contact:         suptitel    titel                       image

// evt. nyheder:    suptitel    titel               button  image

// heros:           suptitel    titel 
const mongoose = require( 'mongoose' );

const heroSchema = new mongoose.Schema( {

    subject: {
        type: String,
        required: [ true, 'Hero: Subject/emne er påkrævet!' ]
    },
    suptitle: {
        type: String
    },
    title: {
        type: String,
        required: [ true, 'Hero: Title/titel er påkrævet!' ]
    },
    content: {
        type: String
    },
    buttontext: {
        type: String
    },
    buttonlink: {
        type: String
    },
    image: {
        type: String
    },
    videolink: {
        type: String
    }
} )


module.exports = mongoose.model( 'Hero', heroSchema, 'heros' )