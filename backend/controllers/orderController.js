import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
// import razorpay from "razorpay"


// const currency = 'inr'
// const deliveryCharge = 10

// const razorpayInstance = new razorpay({
//   key_id : process.env.rzp_test_TvaIj8Nycaputh,
//   key_secret : process.env.NcYN973hX6IE7F6imjo7wcFG
// })

// placing order using cod method
const placeOrder = async (req, res) => {


  try {
    const { userId, items, amount, address, paymentMethod } = req.body

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.json({ success: true, message: "Order Placed" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}
// placing order using stripe Method
const placeOrderStripe = async (req, res) => {

}

// placing order using Razorpay Method
const placeOrderRazorpay = async (req, res) => {

  try {
    
    const {userId,items,amount,address} = req.body

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod:"Razorpay",
      payment: false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    const options = {
      amount: amount*100,
      currency: currency.toUpperCase(),
      reciept: newOrder._id.toString()
    }

    await razorpayInstance.orders.create(options, (error,order)=>{
      if(error){
        console.log(error)
        return res.json({success:false, message:error})
      }
      res.json({success:true, order})
    })
    

  } catch (error) {
   console.log(error) 
   res.json({success:false, message:error.message})
  }

}
// all order data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
// User Order Data for Frontend
const userOrders = async (req, res) => {
  try {

    const { userId } = req.body
    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

// update order status from admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Status Updated" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, updateStatus, userOrders }