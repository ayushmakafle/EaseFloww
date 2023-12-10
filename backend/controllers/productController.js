import productModel from "../models/ProductModel.js";
import categoryModel from '../models/CategoryModel.js';
import fs from "fs";
import slugify from "slugify";

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
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "AllProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getitng single product",
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
      message: "Erorr while getting photo",
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

//upate products
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

//get product by catehory
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