import express from "express";
const router = express.Router();
import * as catsController from "../controllers/cats-controller.js";

router.route("/").get(catsController.getCats).post(catsController.addCat);

router
  .route("/:id")
  .get(catsController.findCat)
  .put(catsController.editCat)
  .delete(catsController.deleteCat);

export default router;
