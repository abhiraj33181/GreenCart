import userModel from '../models/User.js'

// update User CartData : api/cart/update

export const updateCart = async (req,res) => {
    try {
        const {userId, cartItem} = req.body;
        await userModel.findByIdAndUpdate(userId, {cartItem})
        

        res.json({success : true, message : "Cart Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message})
    }
}