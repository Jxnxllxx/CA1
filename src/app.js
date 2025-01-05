//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE APP
//////////////////////////////////////////////////////
const app = express();

//////////////////////////////////////////////////////
// USES
//////////////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//////////////////////////////////////////////////////
// SETUP ROUTES
//////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('I am Alive!')
  })
const mainRoutes = require('./routes/mainRoutes');
 app.use("/", mainRoutes);
//////////////////////////////////////////////////////
// EXPORT APP
//////////////////////////////////////////////////////
module.exports = app;