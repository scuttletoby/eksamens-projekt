const Sponsor = require( '../models/sponsor.model' );

const express = require( 'express' );
const router = express.Router();


// ----- Multer til upload af images -----------------------------------------------
// ---------------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/sponsor' );
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );


const routeTitle = "Sponsor"

// ----- HENT/GET ALLE -------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "HENT ALLE - " + routeTitle );

    try {
        const sponsors = await Sponsor.find();
        return res.status( 200 ).json( sponsors );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );





// ----- HENT/GET UDVALGT  --------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/:id', async ( req, res ) => {

    console.log( "GET/HENT UDVALGT - " + routeTitle );

    try {

        let sponsor = await Sponsor.findById( req.params.id );

        if ( sponsor == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( sponsor );

    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );

    }

} );





// ----- OPRET/POST NY - ADMIN -----------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/admin', upload.single( "logo" ), async ( req, res ) => {

    console.log( "POST - " + routeTitle )

    try {

        let sponsor = new Sponsor( req.body );
        sponsor.logo = req.file.filename;
        await sponsor.save();

        return res.status( 201 ).json( { message: routeTitle + ": Ny er oprettet", oprettet: sponsor } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- SLET/DELETE - ADMIN ------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - " + routeTitle )

    try {

        let sponsor = await Sponsor.findByIdAndDelete( req.params.id );

        if ( sponsor == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og slettes' } );
        }
        return res.status( 200 ).json( { message: routeTitle + ": er slettet" } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- RET/PUT - ADMIN ----------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.put( '/admin/:id', upload.single( "logo" ), async ( req, res ) => {

    console.log( "PUT - " + routeTitle )

    try {
        
        if ( req.file ) {
            req.body.logo = req.file.filename;
        } else {
            let s = await Sponsor.findById(req.params.id)
            req.body.logo = s.logo; // bevar nuværende
        }

        let sponsor = await Sponsor.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })

        if ( sponsor == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og rettes' } );
        }

        return res.status( 201 ).json( { message: routeTitle + " er rettet", rettet: sponsor } )

    } catch ( error ) {

        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );

module.exports = router;