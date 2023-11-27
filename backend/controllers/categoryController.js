import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";

export const createCategoryController = async(req,res) => {
    try{
        const {name} = req.body
        if(!name){
            return res.status(401).send({message:'name is required'})
        }
        //check if it exists
        const existingCategory = await CategoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'category already exists'
            })
        }
        //save
        const category = await new CategoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'new category created',
            category
        })

    }catch(error){
        res.status(500).send({
            success:false,
            error,
            message:'error in category'
        })
    }
};