const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const graphQLServer = require('./graphql')

const app = express()
const port = 3001

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);
graphQLServer.applyMiddleware({ app });

app.listen(port, () => console.log(`Backend server listening at http://localhost:${port}`))

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }
    console.error('ERROR', err);
    res.status(err.status || 500);
    res.send({ message: err.message });
    return res;
});
