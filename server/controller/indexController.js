const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('REST -> GraphQL migration'))

module.exports = router;
