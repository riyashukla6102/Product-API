const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModels')
const app =express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes

app.get('/',(req,res)=>{
    res.send('hello node api')
})

app.get("/blog",(req,res)=>{
    res.send("Hello blog my name is dev")
})

app.post('/product',async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

app.get('/products', async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
       }catch(error){
        res.status(500).json({message:error.message})
    }
} )

app.get('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params; 
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
 //Update the product
app.put('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:`Cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error){
        res.status(500).json({message:error.message})

    }
})

//delete a product

app.delete('/products/:id' , async(req,res) =>{
    try{
        const {id} =req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with IS ${id}`})
        }
        res.status(200).json(product);

    }catch(error){
        res.status(500).json({message:error.message})
    }
})
mongoose.
connect('mongodb+srv://2019riyashukla:123456789RIYA@devapi.7ouxclk.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000,()=>{
        console.log('Node api is running on port 3000')
    })
}).catch((error)=>{
    console.log(error)
})