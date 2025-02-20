import express from "express";
const router = express.Router();
import * as catsController from "../controllers/cats-controller.js";

router.route("/").get(catsController.getCats);

// router
//   .route("/:id")
//   .get(inventoryController.findInventory)
//   .put(inventoryController.editInventory)
//   .delete(inventoryController.deleteInventory);

export default router;
