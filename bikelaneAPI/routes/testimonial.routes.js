const Testimonial = require( '../models/testimonial.model' );

const express = require( 'express' );
const router = express.Router();


// ----- Multer til upload af images -----------------------------------------------
// ---------------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/testimonial' );
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );


const routeTitle = "Testimonial"

// ----- HENT/GET ALLE -------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "HENT ALLE - " + routeTitle );

    try {
        const testimonial = await Testimonial.find().sort( [ [ 'title', 1 ] ] );
        return res.status( 200 ).json( testimonial );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- HENT/GET UDVALGT  --------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/:id', async ( req, res ) => {

    console.log( "GET/HENT - " + routeTitle );

    try {

        let testimonial = await Testimonial.findById( req.params.id );

        if ( testimonial == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( testimonial );

    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );

    }

} );


// ----- OPRET/POST NY - ADMIN -----------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/admin', upload.single( "image" ), async ( req, res ) => {

    console.log( "POST - " + routeTitle )

    try {

        let testimonial = new Testimonial( req.body );
        testimonial.image = req.file.filename;
        await testimonial.save();

        return res.status( 201 ).json( { message: routeTitle + ": Ny er oprettet", oprettet: testimonial } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );


// ----- SLET/DELETE - ADMIN ------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - " + routeTitle )

    try {

        let testimonial = await Testimonial.findByIdAndDelete( req.params.id );

        if ( testimonial == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og slettes' } );
        }
        return res.status( 200 ).json( { message: routeTitle + " er slettet" } );

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
            let t = await Testimonial.findById(req.params.id)
            req.body.image = t.image; // bevar nuværende
        }

        let testimonial = await Testimonial.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        //await service.save();


        if ( testimonial == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes og rettes' } );
        }

        return res.status( 201 ).json( { message: routeTitle + " er rettet", rettet: testimonial } )

    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );
    }

} );

module.exports = router;