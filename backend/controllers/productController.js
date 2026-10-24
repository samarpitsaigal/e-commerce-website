import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'

// function for add product

const addProduct = async (req, res) => {

  try {

    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body
    console.log(req.body);
    console.log(req.files);

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1,image2,image3,image4].filter((item)=>item !==undefined)

    // this function are used to uload the all images on/to cloudinary and also save their URLs in an array
    const imagesUrl = await Promise.all(
      images.map(async (item)=>{
        let result = await cloudinary.uploader.unsigned_upload(item.path,'ml_default' ,{ resource_type: 'image', });
        return result.secure_url
      })
    )
    // console.log(name, description, price, category, subCategory, sizes, bestSeller)
    // console.log(images);
    //  console.log("secure url is:",imageUrl);\

    const productData = {
      name,
      description, 
      price:Number(price),
      category,
      subCategory,
      sizes:JSON.parse(sizes),
      bestSeller: bestSeller == "true" ? true : false,
      image:imagesUrl,
      date:Date.now()
    }

    console.log("productData is: ", productData)
    const product = new productModel(productData)
    await product.save()

    res.json({success:true, message:"Product added"})

  } catch (error) {
      console.error('Cloudinary Upload Error:', error)

  if (res.headersSent) {
    return
  }

  return res.status(500).json({
    success: false,
    message: error.message
  })
}

}

// function for list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.json({success:true, products})
  } catch (error) {
    res.json({success:false,message:error.message})
    console.log(error)
  }
}


// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true, message:"Product Removed"})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }

}

// fuction for single product info
const singleProduct = async (req, res) => {

  try {
    const {productId} = req.body
    const product = await productModel.findById(productId)
    res.json({success:true, product})
  } catch (error) {
    console.log(error.message)
    res.json({success:false, message:error.message})
  }


}

export { addProduct, listProduct, removeProduct, singleProduct }