var express = require('express');
var router = express.Router();
var ejs = require('ejs');



var currentTime = new Date()


/* GET home page. */
router.get('/', (req, res, next) =>{
  console.log(`${currentTime}`);
  res.render('index', { title: 'Express' , currentTime: `${currentTime}`})
});

router.get('/users', function(req, res, next) {
  console.log("HI");
  res.render('users', { title: 'Users' });
});

router.post('/form', (req,res) =>{
  res.send("hi");
  console.log(req.body);
});




module.exports = router;
