import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/Product.js'


// add product : /api/product/add 

export const addProduct = async (req,res) => {
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type : 'image'});
                return result.secure_url
            })
        )

        await productModel.create({...productData, images : imageUrl})
        res.json({success : true, message : "Product Added!"})
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message})
        
    }
}

// product List : /api/product/list 

export const productList = async (req,res) => {
    try {
        const products = await productModel.find({})
        res.json({success : true, products})
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message})
    }
}

// get single product : /api/product/id 

export const productById = async (req,res) => {
    try {
        const { id } = req.body;
        const product = await productModel.findById(id)
        res.json({success : true, product})

    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message})
    }
}

// Change Product InStock : /api/product/stock 

export const changeStock = async (req,res) => {
    try {
        const { id, inStock } = req.body;
        const product = await productModel.findByIdAndUpdate(id, {inStock})
        res.json({success : true, message : "Stock Updated"})

    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message})
    }
}