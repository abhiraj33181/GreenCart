import JWT from 'jsonwebtoken'

// seller login : /api/seller/login 

export const sellerLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
            const token = JWT.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'})
    
            res.cookie('sellerToken', token, {
                httpOnly : true,
                secure : process.env.NODE_ENV === 'production',
                sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge : 7 * 24 * 60 * 60 * 1000
            })
    
            return res.json({success : true, message : "Logged In" })
        }else{
            return res.json({success : false, message : "Inavlid Credentials !!" })
        }
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message})
        
    }
}

// Check Seller Auth :  /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
    try {
        return res.json({success : true})
    } catch (error) {
        console.error(error.message);
        res.json({success : false, message : error.message})
    }
}

// logout Seller : /api/seller/logout

export const logout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : "strict"
        })
        return res.json({success : true, message : "User Logged Out"})
    } catch (error) {
        console.error(error.message);
        res.json({success : false, message : error.message})
    }
}