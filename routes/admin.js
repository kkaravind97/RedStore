const { response } = require('express');
var express = require('express');
var router = express.Router();
const productHelpers=require('../helpers/product-helpers');
var objectId=require('mongodb').ObjectId;


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

//post request for add products
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

// get request for delete product
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id;
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin');
  })
})




module.exports = router;
