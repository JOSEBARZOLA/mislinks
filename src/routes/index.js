const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
res.send('mi app con plantillas');

})

module.exports = router; 