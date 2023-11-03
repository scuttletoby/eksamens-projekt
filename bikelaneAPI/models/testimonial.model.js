const mongoose = require( 'mongoose' );

const testimonialSchema = new mongoose.Schema( {

    name: {
        type: String,
        required: [ true, 'Testimonial: Name/navn er påkrævet!' ]
    },
    experience: {
        type: String,
        required: [ true, 'Testimonial: Experience/erfaring er påkrævet!' ]
    },
    motivation: {
        type: String,
        required: [ true, 'Testimonial: Motivation er påkrævet!' ]
    },
    image: {
        type: String,
        required: [ true, 'Testimonial: Image er påkrævet!' ]
    }
} )


module.exports = mongoose.model( 'Testimonial', testimonialSchema, 'testimonials' )