//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//configure express
const app = express();
const PORT = process.env.PORT || 3000;

//incorporate body parser into express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//import routes
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

//start server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});