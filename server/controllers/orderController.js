import orderModel from "../models/Order.js";
import productModel from '../models/Product.js'
import stripe from 'stripe'

// place order COD : /api/order/cod 


export const placeOrderCOD = async (req,res) => {
    try {
        const {userId, items, address} = req.body;
        if (!address | items.length === 0){
            return res.json({success : false, message : 'Invalid Data!'})
        }
        // calculate amount using items 
        let amount = await items.reduce(async (acc, item) => {
            const product = await productModel.findById(item.product)
            return (await acc) + product.offerPrice * item.quantity
        }, 0)

        // add tax charge 2%

        amount += Math.floor(amount *0.02)
        await orderModel.create({
            userId,
            items,
            amount,
            address,
            paymentType : 'COD'
        })

        return res.json({success : true, message : 'Order Placed Successfully !'})
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}

// get order by userId : api/order/user

export const getUserOrders = async (req, res) => {
    try {
        const {userId} = req.body;

        const orders = await orderModel.find({
            userId,
            $or:  [{paymentType : 'COD'}, {isPaid : true}]
        }).populate('items.product address').sort({createdAt : -1})

        return res.json({success : true, orders})
        
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}

// Get all Orders (for seller /admin) : /api/order/seller 
export const getAllOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({
            $or:  [{paymentType : 'COD'}, {isPaid : true}]
        }).populate('items.product address').sort({createdAt : -1})
        
        console.log(orders);
        
        return res.json({success : true, orders})
        
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}

// place order using stripe  /api/order/stripe 

export const placeOrderStripe = async (req,res) => {
    try {
        const {userId, items, address} = req.body;

        const {origin} = req.headers;

        if (!address | items.length === 0){
            return res.json({success : false, message : 'Invalid Data!'})
        }

        let productData = [] 

        // calculate amount using items 
        let amount = await items.reduce(async (acc, item) => {
            const product = await productModel.findById(item.product)
            productData.push({
                name : product.name,
                price : product.OfferPrice,
                quantity : item.quantity
            })
            return (await acc) + product.offerPrice * item.quantity
        }, 0)

        // add tax charge 2%

        amount += Math.floor(amount *0.02)
        const order = await orderModel.create({
            userId,
            items,
            amount,
            address,
            paymentType : 'Online'
        })

        // stripe gateway initilize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        // Create line items fro stripe

        const line_items = productData.map((item) => {
            return {
                price_data : {
                    currency : "usd",
                    product_data : {
                        name : item.name
                    },
                    unit_amount : Math.floor(item.price + item.price *2)
                },
                quantity : item.quantity
            }
        })

        // create session 
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode : 'payment',
            success_url : `${origin}/loader?next=my-orders`,
            cancel_url : `${origin}/cart`,
            metadata : {
                orderId : order._id.toString(),
                userId
            }
        })


        return res.json({success : true, url : session.url})
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}