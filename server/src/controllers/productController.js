import cloudinary from "../config/cloudinary.js";
import Product from "../model/productSchema.js";

const getProducts =async(req,res)=>{
    try {
      const products = await Product.find()
      res.status(200).json(products)
    } catch (error) {
          res.status(400).json(error)
    }
}

const getProductsById = async(req,res)=>{
    try {
       const product = await Product.findById(req.params.id)
       if(product)  res.status(200).json(product)

    } catch (error) {
         res.status(400).json("product not found")
    }
}

const createProduct = async(req,res)=>{
    const {name,description,price,stock,category} = req.body
    console.log(name , req.file);
    let imageUrl = ''
    try {
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            imageUrl = result.secure_url
        }
        const product = await Product.create({
            name,
            description, price , stock, category , imageUrl
        }) 
        res.status(200).json(product)
    } catch (error) {
       console.log(error);
         res.status(400).json("somethings went wrong")
    }

}
const updateProduct = async (req,res) => {
     try {
        const {name , description , imageUrl ,category , stock} = req.body
        const product = await Product.findById(req.params.id)
        if(product){
            product.name = name || product.name
            product.description = description || product.description
            product.category = category || product.category
            product.stock = stock || product.stock
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path)
                product.imageUrl = result.secure_url
            }
            const updatedProduct = await product.save()
            res.json(updatedProduct)
        }
        else {
            res.status(400).json({message : "product not found"})
        }

     } catch (error) {
          res.status(400).json({message : error})
     }
}

const deleteProduct = async (req,res) => {
    
    try {
        const product = await Product.findById(req.params.id)
        if(product){
           await Product.findByIdAndDelete(req.params.id);
            res.json({message : "product deleted"})
        }
        else   res.status(400).json({message : "product not found"})
    } catch (error) {
          res.status(400).json({message : error})
    }
}

export {getProducts , getProductsById ,createProduct, updateProduct,deleteProduct}