import mongoose from "mongoose";
import Product from "../models/product.model.js";


export const getProducts=async (req,res) =>{
    try {
        const products = await Product.find({});//empty object means fetch all the products from thedb
        res.status(200).json({success:true, data: products});
    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export const createProduct = async(req,res) =>{
    const product = req.body; //user will send this data 

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false,message: "please provide all fields "});
    }

    const neewProduct = new Product (product)

    try {
        await neewProduct.save(); // will save the entered data in tha db.
        res.status(201).json({success:true, data : neewProduct});
    } catch (error) {
        console.log("Error in Create Product",error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }
}

export const updateProduct = async (req,res) =>{
    const {id}= req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product ID "});
    }

    const product = req.body;
    try {
        const updated_product = await Product.findByIdAndUpdate(id, product, {new :true});
        res.status(200).json({success:true, data:updated_product});
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product ID "});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product deleted"});
    } catch (error) {
        console.log("Error in deleting Product",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
}