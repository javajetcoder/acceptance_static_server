const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

/*keycloak start*/
const Keycloak = require('keycloak-connect');
const session = require('express-session');
//Set up keycloak
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });
//keycloak session                       
app.use(session({
    secret: 'BeALongSecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
app.use(keycloak.middleware());
/*keycloak end*/

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', keycloak.protect(), function(req, res) {
  res.redirect('static/index.html');
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));
