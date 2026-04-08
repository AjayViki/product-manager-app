const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { validateProduct } = require("../middleware/validate");

router.get("/", getProducts);
router.post("/", validateProduct, createProduct); // validate → then create
router.put("/:id", validateProduct, updateProduct); // validate → then update
router.delete("/:id", deleteProduct);

module.exports = router;
