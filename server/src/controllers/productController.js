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
    let imageUrl = ''
    try {
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            imageUrl = result.secure_url
        }
        const product = Product.create({
            name,
            description, price , stock, category , imageUrl
        }) 
        res.status(200).json(product)
    } catch (error) {
         res.status(400).json("something went wrong")
    }

}