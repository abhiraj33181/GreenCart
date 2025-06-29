import express from "express";
import { updateCart } from "../controllers/cartController.js";
import authUsers from '../middlewares/authUser.js'

const cartRouter = express.Router();

cartRouter.post('/update', authUsers, updateCart)

export default cartRouter