const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Szia');
})

app.listen(process.env.PORT, () => {
  console.log("Running...")
});