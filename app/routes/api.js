var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = "harrypotter";

module.exports = function (router) {

    //http://localhost:8000/api.users
    //USER REGISTRATION ROUTE
    router.post('/users', function (req, res) {
        //console.log(req.body);  //user details from postman
        var user = new User();//give id
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        //console.log('user');
        //console.log(user);   //user details object contain id also
        if (!req.body.username || !req.body.password || !req.body.email) {
            res.json({success: false, message: "Ensure username, email and password were provided"});
        }
        else {
            user.save(function (err) {
                if (err) {
                    console.log('user not saved')
                    res.json({success: false, message: "username and email already exist"});
                } else {
                    console.log('user created')
                    res.json({success: true, message: 'successfully user created '});
                }
            });
        }
    });

    //USER LOGIN ROUTE
    //http://localhost:port/api/authenticate
    router.post('/authenticate', function (req, res) {
        User.findOne({username: req.body.username}).select('email username password').exec(function (err, user) {
            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Could not authenticate user'});
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
                    res.json({success: false, message: 'No password provided'})
                }
                if (!validPassword) {
                    res.json({success: false, message: 'Could not authenticate password'})
                } else {
                    var token = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: '24h'});
                    res.json({success: true, message: 'User Authenticate', token: token});
                }
            }
        });
    });

    router.use(function (req, res, next) {

        var token = req.body.token || req.body.query || req.header('x-access-token');
        //var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if (token) {
            //verify token
            jwt.verify(token, secret, function (err, decoded) {
                console.log(arguments)
                if (err) {
                    res.json({success: false, message: 'Token invalid'})
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            res.json({success: false, message: 'No token provided'});
        }
    });

    //get username, email and expire of token
    router.post('/me', function (req, res) {
        res.send(req.decoded);
    });

    return router;
}
