const Eventcategory = require( '../models/eventcategory.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );


const routeTitle = "Eventcategory"


// ----- HENT/GET ALLE -------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "GET/HENT - HENT ALLE - " + routeTitle );

    try {

        const eventcategories = await Eventcategory.find();
        return res.status( 200 ).json( eventcategories );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );



// ----- HENT/GET UDVALGT ---------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/:id', async ( req, res ) => { //

    console.log( "GET/HENT UDVALGT - " + routeTitle );

    try {

        let eventcategory = await Eventcategory.findById( req.params.id );

        if ( eventcategory == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( eventcategory );

    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );

    }

} );



// ----- OPRET/POST - ADMIN --------------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/admin', async ( req, res ) => {

    console.log( "POST - " + routeTitle )

    try {

        let eventcategory = new Eventcategory( req.body )

        await eventcategory.save();
        return res.status( 201 ).json( { message: routeTitle + ": Ny er oprettet", oprettet: eventcategory } );

    } catch ( error ) {
        res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl", error: error.message } );
    }

} );



// ----- SLET/DELETE - ADMIN -------------------------------------------------------
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - " + routeTitle )

    try {

        let eventcategory = await Eventcategory.findByIdAndDelete( req.params.id );

        if ( eventcategory == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og slettes' } );
        }

        return res.status( 200 ).json( { message: routeTitle + " er slettet" } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );



// ----- RET/PUT - ADMIN -----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.put( '/admin/:id', async ( req, res ) => {

    console.log( "PUT - " + routeTitle )

    try {

        let eventcategory = await Eventcategory.findByIdAndUpdate( { _id: req.params.id }, req.body, { new: true } );

        if ( eventcategory == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og rettes' } );
        }

        return res.status( 201 ).json( { message: routeTitle + " er rettet", rettet: eventcategory } );

    } catch ( error ) {
        res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl", error: error.message } );
    }
} );

module.exports = router;