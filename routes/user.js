const { response } = require('express');
var express = require('express');
var router = express.Router();
const productHelpers=require('../helpers/product-helpers');
const userHelpers=require('../helpers/user-helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user;
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-products', {products,admin:false,user});
  })
  
});

// get request for login page
router.get('/login',(req,res)=>{
  res.render('user/login');
})

// get request for signup page
router.get('/signup',(req,res)=>{
  res.render('user/signup');
})

// post request for signup page
router.post('/signup',(req,res)=>{
  userHelpers.doSignUp(req.body).then((response)=>{
    console.log(response);
  })
})

//post request for login page
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true;
      req.session.user=response.user;
      res.redirect('/');
    }else{
      res.redirect('/login')
    }
  })
})

// request for logout

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
