const express = require('express');

const router = express.Router();

// /user 라우터
router.get('/', (req, res) => {
    res.send('Hello, User');
});

// sementic URL
router.get('/:id', (req, res) => {
    console.log(req.params.id);
})

module.exports = router;