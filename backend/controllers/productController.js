import productModel from "../models/ProductModel.js";
import categoryModel from '../models/CategoryModel.js';
import doctorModel from '../models/DoctorModel.js'
import fs from "fs";
import slugify from "slugify";
import mongoose from "mongoose";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")

      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "AllProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};
// get single product
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    // Fetch additional information like available quantity
    const availableQuantity = product.quantity; // Assuming available quantity is stored in the product document

    // Include available quantity in the response
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product: {
        ...product.toObject(),
        availableQuantity: availableQuantity
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//update products
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
};

//product filters controller
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
}

//product count controller
export const productCountController = async(req,res)=>{
  try{
    const total = await productModel.find({}).estimatedDocumentCount()
    res.status(200).send({
      success:true,
      total
    })
  }catch(error){
    console.log(error)
     res.status(400).send({
      success: false,
      message: "Error counting Products",
      error,
    });    
  }
}

//product list based on page
export const productListController = async(req,res)=>{
  try{
    const perPage = 6
    const page = req.params.page ? req.params.page : 1
    const products = await productModel
      .find({})
      .select('-photo')
      .skip((page-1)*perPage)
      .limit(perPage)
      .sort({createdAt:-1})

      res.status(200).send({
        success:true,
        products
      })
  }catch(error){
    console.log(error)
     res.status(400).send({
      success: false,
      message: "Error in page control",
      error,
    });    
  }
}

//search product
export const searchProductController = async(req,res) => {
  try{
    const {keyword} = req.params
    const results = await productModel.find({
      $or:[
        {name:{$regex:keyword,$options:'i'}}, //i meaning case sensitive
        {description:{$regex:keyword,$options:'i'}}
      ]
    }).select('-photo')
    res.json(results)
  }catch(error){
    console.log(error)
    res.status(400).send({
      success: false,
      message: "Error in search product api",
      error,
    });    
  }

}

//related products
export const relatedProductController= async(req,res)=>{
  try{
    const {pid,cid} = req.params
    const products = await productModel.find({
      category:cid,
      _id:{$ne:pid}//ne means not included
    }).select('-photo').limit(3).populate('category')
    res.status(200).send({
      success:false,
      products
    })

  }catch(error){
    console.log(error)
    res.status(400).send({
      success: false,
      message: "Error while getting related products",
      error,
    });  
  }
}

//get product by category
export const productCategoryController = async(req,res) => {
  try{
    const category = await categoryModel.findOne({slug:req.params.slug})
    const products = await productModel.find({category}).populate('category')
    res.status(200).send({
      success:true,
      category,
      products
    })
  }catch(error){
    console.log(error)
    res.status(400).send({
      success:false,
      error,
      message:'Error while getting products'
    })
  }
}

export const updateProductRating = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating } = req.body; 
    const {user}= req
    // Find the product by ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Ensure that product.ratings is an array
    product.ratings = product.ratings || [];

    // Update or add the rating given by the doctor
    const existingRatingIndex = product.ratings.findIndex(
      (r) => r.doctorId && r.doctorId.toString() === user._id.toString(),
    )
    if (existingRatingIndex !== -1) {
      product.ratings[existingRatingIndex].rating = Number(rating);
    } else {
      product.ratings.push({ doctorId: user._id, rating: Number(rating) })
    }

    product.markModified('ratings');


    // Filter out ratings without doctorId and calculate average rating
    
    const doctorRatings = product.ratings.filter((r) => r._id);
    const totalRating = doctorRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating =
      doctorRatings.length > 0 ? totalRating / doctorRatings.length : 0;

    // Update the averageRating field in the product model
    product.averageRating = averageRating;
    console.log('doctorRatings:', doctorRatings);
    console.log('totalRating:', totalRating);
    console.log('averageRating:', averageRating);
    // Save the changes
    await product.save();

    // Send a response back to the client
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error updating product rating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const productStockUpdate = async (req, res) => {
  try {
    const { slug, quantityToBuy } = req.body;

    // Parse quantityToBuy as a number
    const quantityToBuyNumber = parseInt(quantityToBuy);

    // Find the product by its slug
    const product = await productModel.findOne({ slug: slug });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if the available quantity is sufficient for the purchase
    if (product.quantity < quantityToBuyNumber) {
      return res.status(400).json({ success: false, message: 'Insufficient quantity in stock' });
    }

    // Update the quantity by subtracting the quantity being purchased
    product.quantity = quantityToBuyNumber;

    // Save the updated product
    await product.save();

    res.json({ success: true, message: 'Quantity updated successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const getProductQuantities = async (req, res) => {
  try {
    const { productIds } = req.body;

    // Find products by IDs and retrieve their quantities
    const products = await productModel.find({ _id: { $in: productIds } });
    const quantities = {};
    products.forEach((product) => {
      quantities[product._id] = product.quantity;
    });

    res.json({ quantities });
  } catch (error) {
    console.error('Error fetching product quantities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};