const router = require('express').Router();

router.get('/context', (req, res) => {
    res.send('Hello context!')
})

module.exports = router;