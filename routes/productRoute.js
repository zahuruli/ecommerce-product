import express from "express";
import formidable from "express-formidable";

import { isAdmin, requireSignin } from "../middlewers/authMiddlewear.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
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

export default router;
