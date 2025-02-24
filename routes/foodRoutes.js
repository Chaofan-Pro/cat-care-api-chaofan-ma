import express from "express";
import * as foodController from "../controllers/foodController.js";

const router = express.Router();

router.route("/").get(foodController.getFood).post(foodController.addFood);

router
  .route("/:id")
  .get(foodController.findFood)
  .put(foodController.editFood)
  .delete(foodController.deleteFood);

  router
  .route("/:id/rating")
  .get(foodController.findFoodRating)

export default router;
