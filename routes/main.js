const router = require('express').Router();

const mainController = require('../controllers/mainController');

router.post('/login', mainController.login);
router.post('/save-time-auditorio', mainController.saveTimeAuditorio);
router.post('/save-stand-view', mainController.saveStandView);

router.get('/logout', function(req, res) {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

router.get('/', function(req, res) {
        res.render('lobby');
});

router.get('/lobby', function(req, res) {
    res.render('lobby');
});

router.get('/auditorio', function(req, res) {
    res.render('auditorio');
});

router.get('/auditorio-live', function(req, res) {

        res.render('auditorio-play');
});

router.get('/stand-br', function(req, res) {
    res.render('stand-br');
});

router.get('/stand-ar', function(req, res) {
    res.render('stand-ar');
});

router.get('/stand-mx', function(req, res) {
    res.render('stand-mx');
});


module.exports = router;
