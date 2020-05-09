const express = require('express')
const indexController = require('./controller/indexController')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexController);

app.listen(port, () => console.log(`Backend server listening at http://localhost:${port}`))