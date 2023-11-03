const Interest = require( '../models/interest.model' );

const express = require( 'express' );
const router = express.Router();

// Aht. keypoints
const formData = require( 'express-form-data' );
const parse = formData.parse();

// ----- Multer til upload af images -----------------------------------------------
// ---------------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/interest' );
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );


const routeTitle = "Interest";


// ----- HENT/GET ------------------------------------------------------------------ 
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "GET/HENT - " + routeTitle );

    try {

        let interest = await Interest.findOne();

        if ( interest == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( interest );

    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );

    }

} );


// ----- RET/PUT - ADMIN ----------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.put( '/admin', upload.fields( [ { name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 } ] ), async ( req, res ) => {

    console.log( "PUT - " + routeTitle )

    try {

        if ( req.files[ 'image1' ] ) {
            req.body.image1 = req.files[ 'image1' ][ 0 ].filename;
        }
        if ( req.files[ 'image2' ] ) {
            req.body.image2 = req.files[ 'image2' ][ 0 ].filename;
        }
        if ( req.files[ 'image3' ] ) {
            req.body.image3 = req.files[ 'image3' ][ 0 ].filename;
        }
        if ( req.files[ 'image4' ] ) {
            req.body.image4 = req.files[ 'image4' ][ 0 ].filename;
        }

        let interest = await Interest.findOneAndUpdate( {}, req.body, { new: true } );
        return res.status( 200 ).json( { message: routeTitle + " er rettet", rettet: interest } )

    } catch ( error ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );



// ---------------------------------------------------------------------------------
// ---- KEYPOINTS (interests key points) -------------------------------------------
// ---------------------------------------------------------------------------------


// ----- OPRET/POST Interest keypoints - ADMIN
// ---------------------------------------------------------------------------------
router.post( '/keypoints/admin', parse,async ( req, res ) => {

    console.log( "POST - " + routeTitle + " keypoints" )

    try {

        let interest = await Interest.findOne();

        interest.keypoints.push( req.body )
        await interest.save();

        return res.status( 200 ).json( { message: routeTitle + ": keypoints er oprettet", oprettet: interest } );
 
    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );

    }

} );


// ----- SLET/DELETE Interest keypoints - ADMIN
// ---------------------------------------------------------------------------------
router.delete( '/keypoints/admin/:id', async ( req, res ) => {

    console.log( "DELETE - " + routeTitle + " keypoint" )

    try {

        let interest = await Interest.findOne();
        let count_before_delete = interest.keypoints.length;

        interest.keypoints.pull( req.params.id );

        console.log(count_before_delete, interest.keypoints.length)

        if ( count_before_delete.length === interest.keypoints.length ) {
            return res.status( 404 ).json( { message: routeTitle + ": keypoints kunne ikke findes/slettes" } );
        }
        
        interest.save();

        return res.status( 200 ).json( { message: routeTitle + " keypoint er slettet" } );

    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );

    }
} );



module.exports = router;