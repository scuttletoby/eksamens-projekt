const Inquery = require( '../models/inquery.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );

const routeTitle = "Inquery"

// ----- HENT/GET - ADMIN ----------------------------------------------------------
// ---------------------------------------------------------------------------------
router.get( '/admin/', async ( req, res ) => {

    console.log( "GET/hent - " + routeTitle )

    try {

        let inqueries = await Inquery.find();

        return res.status( 200 ).json( inqueries );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- HENT/GET UDVALGT - ADMIN -------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/admin/:id', async ( req, res ) => {

    console.log( "GET/HENT - " + routeTitle );

    try {

        let inquery = await Inquery.findById( req.params.id ); 

        if ( inquery == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( inquery );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );

// ----- RET/PATCH (read true/false) - ADMIN ---------------------------------------
// ---------------------------------------------------------------------------------

router.patch( '/admin/:id', async ( req, res ) => {

    console.log( "PATCH - " + routeTitle )

    try {

        let inquery = await Inquery.findById( req.params.id );
        inquery.read = req.body.read; // true el. false (true=read/læst, false=unread/ulæst)
        await inquery.save();

        res.status( 200 ).json( { message: routeTitle + ' read-status er rettet', rettet: inquery } );

    } catch ( error ) {
        res.status( 400 ).json( { message: routeTitle + ' kan ikke rettes - der er opstået en fejl: ' + error.message } )
    }

} );


// ----- OPRET/POST ----------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/', async ( req, res ) => {

    console.log( "POST - " + routeTitle )

    try {
        let inquery = new Inquery( req.body );
        await inquery.save();
        return res.status( 200 ).json( { message: routeTitle + ": Ny er oprettet", oprettet: inquery } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- SLET/DELETE - ADMIN ------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - " + routeTitle )

    try {

        let inquery = await Inquery.findByIdAndDelete( req.params.id );
        if ( inquery == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og slettes' } );
        }
        return res.status( 200 ).json( { message: routeTitle + " er slettet" } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );




module.exports = router;