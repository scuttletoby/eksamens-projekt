const Newssubscription = require( '../models/newssubscription.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );

const routerTitle = "Newssubscription"


// ----- HENT/GET - ADMIN ----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/admin/', async ( req, res ) => {

    console.log( "GET/hent - " + routerTitle )

    try {

        let newssubscription = await Newssubscription.find();
        return res.status( 200 ).json( newssubscription );

    } catch ( error ) {

        console.log( "FEJL: ", error );
        return res.status( 400 ).json( { message: routerTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- HENT/GET UDVALGT - ADMIN -------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/admin/:id', async ( req, res ) => {

    console.log( "GET/HENT - " + routerTitle );

    try {

        let newssubscription = await Newssubscription.findById( req.params.id ); 

        if ( newssubscription == null ) {
            return res.status( 404 ).json( { message: routerTitle + ': Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( newssubscription );

    } catch ( error ) {

        console.log( "FEJL: ", error.message );
        return res.status( 400 ).json( { message: routerTitle + ": Der er sket en fejl: " + error.message } );

    }
} );


// ----- OPRET/POST ----------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/', async ( req, res ) => {

    console.log( "POST - " + routerTitle )

    try {

        let newssubscription = new Newssubscription( req.body );
        await newssubscription.save();
        return res.status( 200 ).json( { message: routerTitle + ": Ny er oprettet", oprettet: newssubscription } );

    } catch ( error ) {
        console.log( "FEJL: ", error );
        return res.status( 400 ).json( { message: routerTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- RET/PUT - ADMIN -----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.put( '/admin/:id', async ( req, res ) => {

    console.log( "PUT - " + routerTitle )

    try {

        // Husk at id ikke er med i req.body - derfor dur det ikke med res.gaade = req.body;
        let newssubscription = await Newssubscription.findOneAndUpdate( {}, req.body, { new: true } );
        return res.status( 200 ).json( { message: routerTitle + ' er rettet', rettet: newssubscription } );

    } catch ( error ) {
        console.log( "FEJL: ", error );
        return res.status( 400 ).json( { message: routerTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- SLET/DELETE - ADMIN -------------------------------------------------------
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - " + routerTitle )

    try {

        let newssubscription = await Newssubscription.findByIdAndDelete( req.params.id );

        if ( newssubscription == null ) {
            return res.status( 404 ).json( { message: routerTitle + ': Data kunne ikke findes og slettes' } );
        }
        return res.status( 200 ).json( { message: routerTitle + " er slettet" } );

    } catch ( error ) {
        console.log( "FEJL: ", error );
        return res.status( 400 ).json( { message: routerTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- SLET/DELETE UD FRA EMAIL - IKKE ADMIN (en user skal kunne afmelde sig med sin email) 
// ------------------------------------------------------------------------------------------
// OBS DER IKKE KAN SENDES BODY MED DELETE!!!!!!!!!!!

router.delete( '/afmeld/:email', async ( req, res ) => {

    console.log( "DELETE ud fra EMAIL - " + routerTitle )

    try {

        let emailslettes = req.params.email;

        let newssubscription = await Newssubscription.findOne( { email: emailslettes } );

        if ( newssubscription == null ) {
            return res.status( 404 ).json( { message: routerTitle + ': Data kunne ikke findes/slettes - ingen med den email' } );
        }

        await newssubscription.remove();
        res.status( 200 ).json( { message: routerTitle + ' er nu slettet' } )


    } catch ( error ) {
        console.log( "FEJL: ", error );
        return res.status( 400 ).json( { message: routerTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


module.exports = router;