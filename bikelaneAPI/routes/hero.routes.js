const Hero = require( '../models/hero.model' );

const express = require( 'express' );
const router = express.Router();


// ----- Multer til upload af images -----------------------------------------------
// ---------------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/hero' );
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );


const routeTitle = "Hero"

// ----- HENT/GET ALLE -------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "HENT ALLE - " + routeTitle );

    try {
        const heros = await Hero.find();
        return res.status( 200 ).json( heros );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );





// ----- HENT/GET UDVALGT  --------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/:id', async ( req, res ) => {

    console.log( "GET/HENT UDVALGT - " + routeTitle );

    try {

        let hero = await Hero.findById( req.params.id );

        if ( hero == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( hero );

    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );

    }

} );



// ----- OPRET/POST NY - ADMIN -----------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/admin', upload.single( "image" ), async ( req, res ) => {

    console.log( "POST - " + routeTitle )

    try {

        let hero = new Hero( req.body );
        hero.image ? hero.image = req.file.filename : hero.image = null;
        await hero.save();

        return res.status( 201 ).json( { message: routeTitle + ": Ny er oprettet", oprettet: hero } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- SLET/DELETE - ADMIN ------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - " + routeTitle )

    try {

        let hero = await Hero.findByIdAndDelete( req.params.id );

        if ( hero == null ) {
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
            let h = await Hero.findById(req.params.id)
            req.body.image = h.image
            // todo: er image først oprettet kan det ikke fjernes - overvej håndtering af parameter om nuværende image skal bevares eller fjernes
        }

        let hero = await Hero.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })

        if ( hero == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og rettes' } );
        }

        return res.status( 201 ).json( { message: routeTitle + " er rettet", rettet: hero } )

    } catch ( error ) {

        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );

module.exports = router;