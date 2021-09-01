const { Router } = require("express");
const {
  addProduct,
  getProducts,
  getProduct,
} = require("../controllers/product");
const router = Router();

router.post("/add", addProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);

module.exports = router;
