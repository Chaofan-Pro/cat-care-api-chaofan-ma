import express from "express";
import * as ratingController from "../controllers/ratingController.js";

const router = express.Router();

router.route("/").get(ratingController.getRating).post(ratingController.addRating);

router
  .route("/:id")
//   .get(foodController.findFood)
//   .put(foodController.editFood)
  .delete(ratingController.deleteRating);

export default router;
