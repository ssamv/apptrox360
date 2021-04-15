const router = require('express').Router();

const mainController = require('../controllers/mainController');

router.post('/login', mainController.login);
router.post('/save-time-auditorio', mainController.saveTimeAuditorio);

router.get('/logout', function(req, res) {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

router.get('/', function(req, res) {
    res.render('home',{
        denied: false
      });
});

router.get('/lobby', function(req, res) {
    var user = req.session.user;
    if (user === undefined){
        res.redirect('/');
    }else{
        res.render('lobby',{
            data: user
        });
    }
});

router.get('/auditorio', function(req, res) {
    var user = req.session.user;
    if (user === undefined){
        res.redirect('/');
    }else{
        res.render('auditorio',{
            data: user
        });
    }
});

router.get('/auditorio-live', function(req, res) {
    var user = req.session.user;
    if (user === undefined){
        res.redirect('/');
    }else{
        res.render('auditorio-play',{
            data: user
        });
    }
});

router.get('/stand-br', function(req, res) {
    var user = req.session.user;
    if (user === undefined){
        res.redirect('/');
    }else{
        res.render('stand-br',{
            data: user
        });
    }
});

router.get('/stand-ar', function(req, res) {
    var user = req.session.user;
    if (user === undefined){
        res.redirect('/');
    }else{
        res.render('stand-ar',{
            data: user
        });
    }
});

router.get('/stand-mx', function(req, res) {
    var user = req.session.user;
    if (user === undefined){
        res.redirect('/');
    }else{
        res.render('stand-mx',{
            data: user
        });
    }
});


module.exports = router;
