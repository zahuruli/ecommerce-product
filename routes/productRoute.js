import express from "express";
import formidable from "express-formidable";

import { isAdmin, requireSignin } from "../middlewers/authMiddlewear.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

//routes:
//Create product route:
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);

//get products:
router.get("/get-product", getProductController);

//get single product:
router.get("/single-product/:id", getSingleProductController);

//get photo:
router.get("/product-photo/:pid", productPhotoController);

//delete product:
router.delete(
  "/delete-product/:pid",
  requireSignin,
  isAdmin,
  deleteProductController
);

//update product:
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product:
router.post("/product-filters", productFilterController);

//product count:
router.get("/product-count", productCountController);

//product per page:
router.get("/product-list/:page", productListController);

export default router;
