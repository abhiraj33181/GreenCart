import addressModel from "../models/Address.js";


// add address : /api/address/add


export const addAddress = async (req,res) => {
    try {
        const {address, userId} = req.body;
        await addressModel.create({...address, userId})

        res.json({success : true, message: "Address Added Successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message})
    }
}

// get address : /api/address/get

export const getAddress = async (req,res) => {
    try {
        const { userId} = req.body;
        const address = await addressModel.find({userId})
        res.json({success : true, address})
        
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message})
    }
}