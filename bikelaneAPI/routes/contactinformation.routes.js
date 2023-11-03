const Contactinformation = require( '../models/contactinformation.model' );
const Some = require( '../models/contactinformation.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );

const routeTitle = "Contactinformation"



// ----- HENT/GET  -----------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "GET/hent - " + routeTitle )

    try {

        let contactinformation = await Contactinformation.findOne();

        if ( contactinformation == null ) {
            return res.status( 404 ).json( { message: routeTitle + ' kunne ikke findes' } );
        }

        return res.status( 200 ).json( contactinformation );

    } catch ( error ) {

        console.log( error );
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- RET/PUT - ADMIN -----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.put( '/admin', async ( req, res ) => {

    console.log( "PUT - contactinformation" )

    try {

        let contactinformation = await Contactinformation.findOneAndUpdate( {}, req.body, { new: true } );

        if ( contactinformation == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og rettes' } );
        }

        return res.status( 200 ).json( { message: routeTitle + ' er rettet', rettet: contactinformation } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ---------------------------------------------------------------------------------
// ---- SOME (social media icons+links) --------------------------------------------
// ---------------------------------------------------------------------------------


// ----- OPRET/POST some/social-media - ADMIN
// ---------------------------------------------------------------------------------
router.post( '/some/admin', async ( req, res ) => {

    console.log( "POST - " + routeTitle + " some" )

    try {

        let contactinformation = await Contactinformation.findOne();

        contactinformation.some.push( req.body )
        await contactinformation.save();

        return res.status( 200 ).json( { message: routeTitle + ": Ny social-media er oprettet", oprettet: contactinformation } );

    } catch ( error ) {

        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );

    }

} );


// ----- SLET/DELETE some/social-media - ADMIN
// ---------------------------------------------------------------------------------
router.delete( '/some/admin/:id', async ( req, res ) => {

    console.log( "DELETE - contactinformation some" )

    try {

        let contactinformation = await Contactinformation.findOne();
        let count_before_delete = contactinformation.some.length;
        contactinformation.some.pull( req.params.id );

        console.log(count_before_delete, contactinformation.some.length)

        if ( count_before_delete.length === contactinformation.some.length ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes/slettes' } );
        }
        contactinformation.save();

        return res.status( 200 ).json( { message: "Social-media er slettet" } );

    } catch ( error ) {

        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );

    }
} );


module.exports = router;