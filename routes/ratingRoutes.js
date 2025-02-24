import express from "express";
import * as ratingController from "../controllers/ratingController.js";

const router = express.Router();

router.route("/").get(ratingController.getRating).post(ratingController.addRating);

router
  .route("/:id")
  .delete(ratingController.deleteRating);

export default router;
