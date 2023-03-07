var express = require('express');
var router = express.Router();
const productHelpers=require('../helpers/product-helpers');


//get request for view products

router.get('/',(req,res,next)=>{
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products',{products,admin:true})
  })
  
})

//get request for add products
router.get('/add-products',(req,res)=>{
  res.render('admin/add-products',{admin:true})
})

router.post('/add-products',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);
  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image;
    console.log(id);
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-products',{admin:true})
      }else{
        console.log(err);
      }
    })
  })
})

//post request for add products


module.exports = router;
