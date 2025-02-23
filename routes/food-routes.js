import express from "express";
import * as foodController from "../controllers/foodController.js";

const router = express.Router();

router
  .route("/")
  .get(foodController.getFood)
//   .post(catsController.addCat);

// router
//   .route("/:id")
//   .get(catsController.findCat)
//   .put(catsController.editCat)
//   .delete(catsController.deleteCat);

export default router;
