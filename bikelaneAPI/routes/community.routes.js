const Community = require( '../models/community.model' );

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
            cb( null, 'public/images/community' );
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );


const routeTitle = "Community";


// ----- HENT/GET ------------------------------------------------------------------ 
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "GET/HENT - " + routeTitle );

    try {

        let community = await Community.findOne();

        if ( community == null ) {
            return res.status( 404 ).json( { message: routeTitle + ': Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( community );

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

        let community = await Community.findOneAndUpdate( {}, req.body, { new: true } );
        return res.status( 200 ).json( { message: routeTitle + " er rettet", rettet: community } )

    } catch ( error ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );



// ---------------------------------------------------------------------------------
// ---- KEYPOINTS (community key points) -------------------------------------------
// ---------------------------------------------------------------------------------


// ----- OPRET/POST Community keypoints - ADMIN
// ---------------------------------------------------------------------------------
router.post( '/keypoints/admin', parse, async ( req, res ) => {

    console.log( "POST - " + routeTitle + " keypoints" )

    try {

        let community = await Community.findOne();

        community.keypoints.push( req.body )
        await community.save();

        return res.status( 200 ).json( { message: routeTitle + ": keypoints er oprettet", oprettet: community } );

    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );

    }

} );


// ----- SLET/DELETE Community keypoints - ADMIN
// ---------------------------------------------------------------------------------
router.delete( '/keypoints/admin/:id', async ( req, res ) => {

    console.log( "DELETE - " + routeTitle + " keypoint" )

    try {

        let community = await Community.findOne();
        let count_before_delete = community.keypoints.length;

        community.keypoints.pull( req.params.id );

        console.log(count_before_delete, community.keypoints.length)

        if ( count_before_delete.length === community.keypoints.length ) {
            return res.status( 404 ).json( { message: routeTitle + ": keypoints kunne ikke findes/slettes" } );
        }
        
        community.save();

        return res.status( 200 ).json( { message: routeTitle + " keypoint er slettet" } );

    } catch ( error ) {

        return res.status( 400 ).json( { message: routeTitle + ": Der er sket en fejl: " + error.message } );

    }
} );



module.exports = router;