const Event = require( '../models/event.model' );

const express = require( 'express' );
const router = express.Router();


// ----- Multer til upload af images -----------------------------------------------
// ---------------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/event' );
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );


const routeTitle = "Event"

// ----- HENT/GET ALLE -------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "HENT ALLE - " + routeTitle );

    try {
        // const events = await Event.find().sort( [ [ 'eventdate', 1 ] ] );
        const events = await Event.find().populate('category').sort( [ [ 'eventdate', 1 ] ] );
        return res.status( 200 ).json( events );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );





// ----- HENT/GET UDVALGT  --------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/:id', async ( req, res ) => {

    console.log( "GET/HENT UDVALGT - " + routeTitle );

    try {

        let event = await Event.findById( req.params.id );

        if ( event == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( event );

    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );

    }

} );



// ----- HENT/GET X antal tilfældige - til gallery ---------------------------------
// ---------------------------------------------------------------------------------

router.get( '/random/:number', async ( req, res ) => {

    console.log( "HENT ANTAL TILFÆLDIGE - " + routeTitle );

    try {
        // { $sample: { size: 3 } }
        // https://stackoverflow.com/questions/70739145/how-can-i-get-random-4-documents-from-a-collection-in-mongodb-by-node
        const events = await Event.aggregate([
            { $sample: { size: req.params.number } }
        ]);
        return res.status( 200 ).json( events );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );

// TODO SØG EVENT


// ----- OPRET/POST NY - ADMIN -----------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/admin', upload.single( "image" ), async ( req, res ) => {

    console.log( "POST - " + routeTitle )

    try {

        let event = new Event( req.body );
        //event.image = req.file.filename;
        await event.save();

        return res.status( 201 ).json( { message: routeTitle + ": Ny er oprettet", oprettet: event } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- SLET/DELETE - ADMIN ------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - " + routeTitle )

    try {

        let event = await Event.findByIdAndDelete( req.params.id );

        if ( event == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og slettes' } );
        }
        return res.status( 200 ).json( { message: routeTitle + ": er slettet" } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- RET/PUT - ADMIN ----------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.put( '/admin/:id', upload.single( "image" ), async ( req, res ) => {

    console.log( "PUT - " + routeTitle )

    try {
        
        if ( req.file ) {
            req.body.image = req.file.filename;
        } else {
            let e = await Event.findById(req.params.id)
            req.body.image = e.image; // bevar nuværende
        }

        let event = await Event.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })

        if ( event == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og rettes' } );
        }

        return res.status( 201 ).json( { message: routeTitle + " er rettet", rettet: event } )

    } catch ( error ) {

        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );

module.exports = router;