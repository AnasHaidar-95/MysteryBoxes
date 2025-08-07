import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/showAllProducts
// @access  Public
export const showAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Add a new product
// @route   POST /api/addNewProduct
// @access  Admin
export const addNewProduct = async (req, res) => {
  const { name, description, price, category, image } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      image: image || "/images/default-product.jpg", // Default image if not provided
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
