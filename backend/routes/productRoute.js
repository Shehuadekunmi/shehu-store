import express from "express";
import formdiable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

import {
  addProduct,
  updatedProduct,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formdiable(), addProduct);
router.route("/allproducts").get(fetchAllProducts);
router
  .route("/:id/reviews")
  .post(authenticate, checkId, addProductReview);
router.get("/top", fetchTopProducts);
router.get('/new', fetchNewProducts)
router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formdiable(), updatedProduct)
  .delete(authenticate, authorizeAdmin, removeProduct);


  router.route('/filtered-products').post(filterProducts)
export default router;
