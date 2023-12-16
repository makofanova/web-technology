const express = require('express');
const path = require('path');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Main' });
});

// router.get('/login/', function(req, res, next) {
//     res.render('login', { title: 'Login' });
// });

router.get('/users/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'public', 'users.html'));
});

router.get('/models/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'public', 'models.html'));
});

router.get('/info/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'public', 'info.html'));
});


module.exports = router;