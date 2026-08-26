import Order from "../model/orderSchema.js";
import sendEmail from "../utils/sendEmail.js"
import Product from "../model/productSchema.js";
import User from "../model/userSchema.js";
const createOrder = async (req, res) => {
     console.log(req.User.id);
  try {
    const { products, totalAmount,  address,paymentId  } = req.body;
   
    console.log(products,totalAmount,address,paymentId);
       if(!products || products.length===0 || !totalAmount|| !address ){
              return res.status(400).json({message : "order can't be created"})
       }
    const order = await Order.create({
     user: req.User.id,
      products,
      totalAmount,
      address,
      paymentId
    });
 const user = await User.findById(req.User.id);
    const message = `Hello ${user.name},Your order has been placed successfully.Order ID: ${order._id}
Total Amount: ₹${order.totalAmount}
Status: ${order.status}
Thank you for shopping with Shoppix!
`;
    await sendEmail(  user.email, "Order Confirmation - Shoppix",message );
    return res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to create order",
      error: error.message
    });
  }
};
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("products.Product");
    return res.status(200).json({
      orders
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("products.Product");

    return res.status(200).json({
      orders
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = status;

    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      order
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to update order status",
      error: error.message
    });
  }
};




export {createOrder,myOrders,getOrders,updateOrderStatus};