const express = require('express')
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const app = express();
const port = 3000;
const router = express.Router();
const path = require('path');

/* Set up Express to serve HTML files using "res.render" with help of Nunjucks */
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use(express.static(__dirname));
app.use('/assets', express.static('assets'))
app.use('/styles', express.static('styles'));
app.use(bodyParser());
app.use('/', router)


/* Place all routes here */
router.get('/', (req, res) => {
    res.render('index.html')
});

router.post('/charge', (req, res) => {
    /* 1. Have a handler here to process "req.body.stripeToken" to complete payment
     * 2. Store email, billing address, or shipping address (follow various compliance rules -- GDPR, PCI, etc.) 
     */

    /* Example: 
        req.body = { 
            stripeToken: 'tok_1DDe1f2eZvKYlo2C3JanAVvx',
            stripeTokenType: 'card',
            stripeEmail: 'user@example.com',
            stripeBillingName: 'Jane Doe',
            stripeBillingAddressCountry: 'United States',
            stripeBillingAddressCountryCode: 'US',
            stripeBillingAddressZip: '95104',
            stripeBillingAddressLine1: '1 Infinite Loop',
            stripeBillingAddressCity: 'Cupertino',
            stripeBillingAddressState: 'CA',
            stripeShippingName: 'Jane Doe',
            stripeShippingAddressCountry: 'United States',
            stripeShippingAddressCountryCode: 'US',
            stripeShippingAddressZip: '95104',
            stripeShippingAddressLine1: '1 Infinite Loop',
            stripeShippingAddressCity: 'Cupertino',
            stripeShippingAddressState: 'CA' 
        }
    */

    /* 3. Pass relevant data to another page */
    var data = {
        email: req.body.stripeEmail,
        name: req.body.stripeBillingName
    };
    res.render('productConfirmation', data);
});

router.post('/newsletterSignup', (req, res) => {
    /* 1. Save this information to database: 
     * req.body.email
     * req.body.name
     */
    
    /* 2. Pass relevant data to another page */
    var data = {
        name: req.body.name
    };
    res.render('newsletterConfirmation', data);
});
  

/* Start listening on specified port */
app.listen(port, () => {
    console.info('Example app listening on port', port)
});
