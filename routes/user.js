const { response } = require('express');
var express = require('express');
const session = require('express-session');
var router = express.Router();
const productHelpers=require('../helpers/product-helpers');
const userHelpers=require('../helpers/user-helpers');

const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next();
  }else{
    res.redirect('/login');
  }
}

/* GET home page. */
router.get('/',async function(req, res, next) {
  let user=req.session.user;
  let cartCount=null;
  if(req.session.user){
    cartCount=await userHelpers.getCartCount(req.session.user._id)
  }

  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-products', {products,user,cartCount});
  })
  
});

// get request for login page
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/');
  }else{
    res.render('user/login',{"loginErr":req.session.loginErr});
    req.session.longinErr=false;
  }
})

// get request for signup page
router.get('/signup',(req,res)=>{
  res.render('user/signup');
})

// post request for signup page
router.post('/signup',verifyLogin,(req,res)=>{
  userHelpers.doSignUp(req.body).then((response)=>{
    console.log(response);
    req.session.loggedIn=true;
    req.session.user=response;
    res.redirect('/');
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
      req.session.loginErr="Invalid username or password!!";
      res.redirect('/login')
    }
  })
})

// request for logout

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/');
})

// get request for cart page
router.get('/cart',verifyLogin,async(req,res)=>{
  let products=await userHelpers.getCartProducts(req.session.user._id)
  console.log(products);
  res.render('user/cart',{products,user:req.session.user});
})

// get request for add to cart
router.get('/add-to-cart/:id',(req,res)=>{
  console.log("api call");
  userHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.json({status:true})
  })
})

// post request for change product quantity



module.exports = router;
