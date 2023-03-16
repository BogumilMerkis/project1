var express = require('express');
var router = express.Router();
var ejs = require('ejs');
const {check, validationResult } = require('express-validator');
const {body} = require('express-validator');
let registerValidate = [
  check('uname').trim().escape(),
  check('email', 'Must be a valid Email Address').isEmail().trim().escape().normalizeEmail(),
  body('pswcheck').custom((value, {}) => {
    if (value !== body('psw')) {
      console.log(`${value} , ${body('psw')}`)
      console.log('Passwords must match password');
      throw new Error('Password must match');
    }
  
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  check('psw').isLength({min:8}).withMessage('Password must be at least 8 Characters')
  .matches('[0-9]').withMessage('Password must contain a Number')
  .matches('[A-Z]').withMessage('Password must contain an Uppercase letter').trim().escape()
];



var currentTime = new Date();


/* GET home page. */
router.get('/', (req, res, next) =>{
  console.log(`${currentTime}`);
  res.render('index', { title: 'JustMe.' , currentTime: `${currentTime}`, passwordMismatch :""})
});

router.get('/users', function(req, res, next) {
  console.log("HI");
  res.render('users', { title: 'Users' });
});

router.post('/register', [check("email", "Invalid email").isEmail(),
check("psw", "invalid password")
    .isLength({ min: 8 })
    .custom((value,{req, loc, path}) => {
        if (value !== req.body.pswcheck) {
            // throw error if passwords do not match
            console.log(`${value} , ${req.body.pswcheck}`)
        } else {
            return value;
        }
    })] ,(req,res)=> {

  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.render('index', {title: 'JustMe.' , passwordMismatch: "Passwords must match!"})
  }
  else{
    let username = req.body.uname;
    let email = req.body.email;
    let password = req.body.psw;
    res.redirect(301,'/'+username);
    router.get('/:username', (req,res) =>{
      res.render('usr', {title: 'JustMe.', passwordMismatch: "", username: username, email: email, password: password})
    });
  
  }
});

router.post('/login', (req,res) =>{
  let username = req.body.uname;
  let password = req.body.psw;
  res.redirect(301,'/'+username);
    router.get('/:username', (req,res) =>{
      res.render('usr', {title: 'JustMe.', passwordMismatch: "", username: username, password: password})
    });
  console.log(`${username}:${password}` );
  
});




module.exports = router;
