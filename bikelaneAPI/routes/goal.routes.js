const Goal = require( '../models/goal.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );


const routeTitle = "Goal"


// ----- HENT/GET ALLE -------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "GET/HENT - HENT ALLE - " + routeTitle );

    try {

        const goals = await Goal.find();
        return res.status( 200 ).json( goals );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );



// ----- HENT/GET UDVALGT ---------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/:id', async ( req, res ) => { //

    console.log( "GET/HENT UDVALGT - " + routeTitle );

    try {

        let goal = await Goal.findById( req.params.id );

        if ( goal == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( goal );

    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );

    }

} );



// ----- OPRET/POST - ADMIN --------------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/admin', async ( req, res ) => {

    console.log( "POST - " + routeTitle )

    try {

        let goal = new Goal( req.body )

        await goal.save();
        return res.status( 201 ).json( { message: routeTitle + ": Ny er oprettet", oprettet: goal } );

    } catch ( error ) {
        res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl", error: error.message } );
    }

} );



// ----- SLET/DELETE - ADMIN -------------------------------------------------------
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - " + routeTitle )

    try {

        let goal = await Goal.findByIdAndDelete( req.params.id );

        if ( goal == null ) {
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

        let goal = await Goal.findByIdAndUpdate( { _id: req.params.id }, req.body, { new: true } );

        if ( goal == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og rettes' } );
        }

        return res.status( 201 ).json( { message: routeTitle + " er rettet", rettet: goal } );

    } catch ( error ) {
        res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl", error: error.message } );
    }
} );

module.exports = router;