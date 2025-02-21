import express from "express";
import { upload } from "../config/multer-config.js";
import * as catsController from "../controllers/cats-controller.js";

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
