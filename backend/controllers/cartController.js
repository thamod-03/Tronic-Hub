import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// API to add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    return res.json({ success: true, cart });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get items of cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "items.product",
      select: "name newPrice stock category imageUrl",
      populate: { path: "category", select: "name" },
    });

    if (!cart) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    return res.json({ success: true, cart });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to delete item from cart
export const deleteFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    const product = cart.items.find((item) => item.product.toString() === productId);

    if(!product) {
        return res.json({success: false, message: "Product not found in cart"});
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    return res.json({ success: true, cart });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to update the quantity of item
export const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return req.json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.json({ success: false, message: "Product not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    return res.json({ success: true, cart });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
