import express from "express";
import * as foodController from "../controllers/foodController.js";

const router = express.Router();

router.route("/").get(foodController.getFood).post(foodController.addFood);

router
  .route("/:id")
  .get(foodController.findFood)
//   .put(catsController.editCat)
//   .delete(catsController.deleteCat);

export default router;
