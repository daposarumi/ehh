import ClothesModel from "../models/clothesModel.js";
import fs from "fs";


// add dress

const addDress = async (req,res) => {
    const dress = new ClothesModel({
        name:req.body.name,
        description:rew.body.description,
        price:req.body.price,
        category:req.body.category,
        image:req.body.image
    })
    try {
        await dress.save();
        res.json({success:true,message:"Dress Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//all dress list 
const listDress = async (req,res) => {
    try {
        const dress = await ClothesModel.find({});
        res.json({success:true,data:dress})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove dress
const removeDress = async (req,res) => {
try {
    const dress = await ClothesModel.findById(req.body.id)
    await ClothesModel.findByIdAndDelete(req.body.id)
    res.json({success:ture,message:"Dress removed"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}

export {addDress, listDress,removeDress}