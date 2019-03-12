//dotenv
require('dotenv').config({ path: __dirname + '/.env' });
// app
const express = require('express');
// middleware
const bodyParser = require('body-parser');
const session = require('express-session');
//custom middleware
const checkForSession = require('./middleware/checkForSession');
//controllers
const swagCtrl = require('./controllers/swag_controller');
const authCtrl = require('./controllers/auth_controller');
const cartCtrl = require('./controllers/cart_controller');
const searchCtrl = require('./controllers/search_controller');


//destruction of dotenv
const {
    SESSION_SECRET,
    SERVER_PORT,
} = process.env;

//Initializing app
const app = express();

//top level middleware
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(checkForSession);
app.use( express.static( `${__dirname}/../build` ) );

//endpoints
app.get('/api/swag', swagCtrl.read);
app.get('/api/user', authCtrl.getUser);
app.get('/api/search', searchCtrl.search);
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.post('/api/cart', cartCtrl.add);
app.post('/api/cart/checkout', cartCtrl.checkout);
app.delete('/api/cart', cartCtrl.delete);


app.listen(SERVER_PORT, () => {
    console.log('server is listening on port:' + SERVER_PORT);
})