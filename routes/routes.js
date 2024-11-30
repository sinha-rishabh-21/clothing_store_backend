import express from "express";
import {
  handlerLoginUser,
  handlerProductsData,
  handlerSetData,
  handlerSignUpUser,
} from "../controllers/controller.js";

const router = express.Router();

router.get("/products", handlerProductsData);
router.post("/products", handlerSetData);
router.post("/register", handlerSignUpUser);
router.get("/login", handlerLoginUser);

export default router;
