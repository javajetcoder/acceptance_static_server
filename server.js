const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.redirect('static/index.html');
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));
