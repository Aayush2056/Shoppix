import Product from "../model/productSchema.js"
import User from "../model/userSchema.js"
import Order from "../model/orderSchema.js"

const adminStats = async (req,res) => {
    try {
         const totalUsers = await User.countDocuments({role : "user"})
          const totalProducts = await Product.countDocuments({})
         const totalOrders = await Order.countDocuments({})

         const orders = await Order.find({})
         const totalRevenue = orders.reduce((acc,order)=>acc+order.totalAmount,0)
         
         res.json({
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue
         })
       
    } catch (error) {
        res.status(500).json(error)
    }

}
export {adminStats}