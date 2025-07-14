const express = require('express');
const { createLinkShortner, getAllLinks } = require('../controllers/linkShortnerController');
const router = express.Router();


router.post('/shorturls',createLinkShortner);
router.get('/shorturls-all',getAllLinks);


module.exports = router