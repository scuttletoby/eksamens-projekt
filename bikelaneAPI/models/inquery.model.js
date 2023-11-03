const mongoose = require( 'mongoose' );

const inquerySchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, 'Inquery: Name/navn er påkrævet!' ],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [ true, 'Inquery: Email er påkrævet!' ]
    },
    phone: {
        type: String,
        required: [ true, 'Inquery: Phone/telefonnummer er påkrævet!' ],
    },
    message: {
        type: String,
        required: [ true, 'Inquery: Message/besked er påkrævet! Ellers giver det da for hulen ingen mening at skrive til os!!!' ],
    },
    read: {
        type: Boolean,
        default: false
    },
    received: {
        type: Date,
        default: Date.now
    }

} )


module.exports = mongoose.model( 'Inquery', inquerySchema, 'inqueries' )