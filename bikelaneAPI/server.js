const express = require( 'express' );
require( 'dotenv' ).config();
const cors = require( 'cors' );

const app = express();
const PORT = process.env.PORT; // hent portnummer fra env-fil


// ---- DB Mongo og Mongoose
// ------------------------------------------------------------
const mongoose = require( 'mongoose' );

//Lokal DB 
mongoose.connect( process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true } );

//Ekstern DB (fx MongoDB Atlas) - indsæt connectionstring i .env-fil
//mongoose.connect( process.env.DB_URL_EXT, { useNewUrlParser: true, useUnifiedTopology: true } );

const db = mongoose.connection;
db.on( 'error', ( error ) => console.log( "FEJL: " + error ) )
db.once( 'open', () => console.log( "/// ---> MongoDATABSE: Ohøj skipper - jeg er din datamatros og søsætter eksamensdata til dig - hvis du spørger pænt (og rigtigt)!  ¯\\_(ツ)_/¯ " ) )


// ---- APP
// ------------------------------------------------------------
app.use( express.json() );                              // håndter POST/PUT data som json
app.use( express.urlencoded( { extended: true } ) );    // håndter POST/PUT data som urlencoded-data
app.use( cors( { credentials: true, origin: true } ) )  // CORS
app.use( express.static( 'public' ) )                   // Herfra hentes uploadede filer/billeder fra serveren


// ---- SESSION
// ------------------------------------------------------------

const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' )

const expire = 1000 * 60 * 60 * 24 * 5 // 5 dage

app.use( session( {

    name: process.env.SESSION_NAME, // det navn cookien har i klientens browser - bruges til at slette cookien i den specifikke klients browser
    resave: true,  // om sessionen bliver gemt på serveren, selvom der ikke har været nogen ændringer i sessionens data - "true" kan være belastende for serveren 
    rolling: true,  // maxAge vil automatisk blive opdateret hver gang en anmodning modtages fra klienten
    saveUninitialized: false, // om sessionen (som altid laves) gemmes i store selvom der ingen "brugerdefinerede data" er oprettet i session (fx name og cookie)
    //store: MongoStore.create( { mongoUrl: process.env.DB_URL_EXT } ),
    store: MongoStore.create( { mongoUrl: process.env.DB_URL } ),
    //reapInterval: 60000, // Interval i millisekunder (f.eks. 60000 ms = 1 minut) - slet gl. cookies i Mongo (som ellers kun slettes ved destroy/logud)
    secret: process.env.SESS_SECRET, // til at kryptere session/cookie
    cookie: {
        maxAge: expire,
        sameSite: 'strict', // 'none' 'lax'
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true, // vigtigt - session-cookie som ikke kan manipuleres med javascript
    }
} ) );


// ---- AUTH TJEK - tjek om bruger er "logget ind" (har godkendt cookie)
// ------------------------------------------------------------

// OBS OBS OBS!!! 
// Udkommenter/slet denne del, hvis der skal være adgang til ADMIN-metoder UDEN login

// app.use( '*/admin*', async ( req, res, next ) => {

//     // if ( req.session && req.session.userId ) {
//     if ( req.session.userId ) {

//         return next();

//     } else {

//         console.log( "LOGIN AFVIST" )
//         res.set( "Connection", "close" ).status( 401 ).json( { message: 'Du har ikke adgang...' } );
//     }
// } )

// ---- TIL TEST - forsink API-kaldet
// ------------------------------------------------------------

// app.use( '*', async ( req, res, next ) => {
//     setTimeout( () => {
//         return next();
//     }, 1000 );
// } )


// ---- ROUTES
// ------------------------------------------------------------
// ---- GET serverens endpoint - http://localhost:" + process.env.PORT + "/

app.get( '/', async ( req, res ) => {
    console.log( "Velkommen til serverens startside - vælg 1 route hvis du vil andet end denne console-log-sniksnak!" );
    res.status( 200 ).json(
        {
            info:
            {
                message: 'Velkommen til bikelane-serverens basis-endpoint - og held og lykke med eksamen!',
                port: process.env.PORT
            },

            endpoints:
            {
                community: "http://localhost:" + process.env.PORT + "/community",
                contactinformation: "http://localhost:" + process.env.PORT + "/contactinformation",
                events: "http://localhost:" + process.env.PORT + "/events",
                eventcategories: "http://localhost:" + process.env.PORT + "/eventcategories",
                goals: "http://localhost:" + process.env.PORT + "/goals",
                heros: "http://localhost:" + process.env.PORT + "/heros",
                inqueries: "http://localhost:" + process.env.PORT + "/inqueries",
                interest: "http://localhost:" + process.env.PORT + "/interest",
                login: "http://localhost:" + process.env.PORT + "/login",
                newssubscriptions: "http://localhost:" + process.env.PORT + "/newssubscriptions",
                sponsors: "http://localhost:" + process.env.PORT + "/sponsors",
                testimonials: "http://localhost:" + process.env.PORT + "/testimonials",
                user: "http://localhost:" + process.env.PORT + "/user",
                news: "http://localhost:" + process.env.PORT + "/news",
            },

            imagepath:
            {
                community: "http://localhost:" + process.env.PORT + "/images/community/",
                events: "http://localhost:" + process.env.PORT + "/images/event/",
                heros: "http://localhost:" + process.env.PORT + "/images/hero/",
                interest: "http://localhost:" + process.env.PORT + "/images/interest/",
                sponsors: "http://localhost:" + process.env.PORT + "/images/sponsor/",
                testimonials: "http://localhost:" + process.env.PORT + "/images/testimonial/",
                news: "http://localhost:" + process.env.PORT + "/images/news/",
            }
        }
    );
} );

app.use( '/community', require( './routes/community.routes' ) );
app.use( '/contactinformation', require( './routes/contactinformation.routes' ) );
app.use( '/events', require( './routes/event.routes' ) );
app.use( '/eventcategories', require( './routes/eventcategory.routes' ) );
app.use( '/goals', require( './routes/goal.routes' ) );
app.use( '/heros', require( './routes/hero.routes' ) );
app.use( '/inqueries', require( './routes/inquery.routes' ) );
app.use( '/interest', require( './routes/interest.routes' ) );
app.use( '/login', require( './routes/login.routes' ) );
app.use( '/newssubscription', require( './routes/newssubscription.routes' ) );
app.use( '/sponsors', require( './routes/sponsor.routes' ) );
app.use( '/testimonials', require( './routes/testimonial.routes' ) );
app.use( '/user', require( './routes/user.routes' ) );
app.use( '/news', require( './routes/news.routes' ) );


// ---- LISTEN
// ------------------------------------------------------------
app.listen( PORT, () =>
    console.log( "// ===> Din ydmyge SERVER er eksamensklar og hepper på dig - lytter lykkeligt og spændt på port " + PORT + " ۜʕʘ̅͜ʘ̅ʔ <3" )
)