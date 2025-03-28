import express from "express";
import * as catsController from "../controllers/catsController.js";

const router = express.Router();

router
  .route("/")
  .get(catsController.getCats)
  .post(catsController.addCat);

router
  .route("/:id")
  .get(catsController.findCat)
  .put(catsController.editCat)
  .delete(catsController.deleteCat);

export default router;
