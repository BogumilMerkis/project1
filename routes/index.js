var express = require('express');
var router = express.Router();
var ejs = require('ejs');
const {check, validationResult } = require('express-validator');

let registerValidate = [
  check('uname').trim().escape(),
  check('email', 'Must be a valid Email Address').isEmail().trim().escape().normalizeEmail(),
  check('psw').isLength({min:8}).withMessage('Password must be at least 8 Characters')
  .matches('[0-9]').withMessage('Password must contain a Number')
  .matches('[A-Z]').withMessage('Password must contain an Uppercase letter').trim().escape()
];


var currentTime = new Date();


/* GET home page. */
router.get('/', (req, res, next) =>{
  console.log(`${currentTime}`);
  res.render('index', { title: 'Express' , currentTime: `${currentTime}`})
});

router.get('/users', function(req, res, next) {
  console.log("HI");
  res.render('users', { title: 'Users' });
});

router.post('/register', registerValidate, (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(422).json({errors:errors.array()});
  }
  else{
    let username = req.body.uname;
    let email = req.body.email;
    let password = req.body.psw;
    res.render('usr', {username: username, email: email, password: password})
  }

});

router.post('/login', (req,res) =>{
  let username = req.body.username;
  let password = req.body.password;
  res.send("hi");
  console.log(`${username}:${password}` );
  
});




module.exports = router;
