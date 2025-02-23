import initKnex from "knex";
import cloudinary from "cloudinary";
import multer from "multer";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getFood = async (_req, res) => {
  try {
    const food = await knex("food").select(
      "id",
      "food_name",
      "food_brand",
      "food_photo",
      "food_type",
      "food_description"
    );
    res.status(200).json(food);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error getting food.");
  }
};

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("food_photo");

export const addFood = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {console.error("Image upload failed:", err);
      return res.status(500).json({ error: "Image upload failed" });
    }

    const { food_name, food_brand, food_type, food_description } = req.body;

    if (
      !req.file ||
      !food_name ||
      !food_brand ||
      !food_type ||
      !food_description
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: "cat-care-app" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(req.file.buffer);
      });

      const photoUrl = uploadResult.secure_url;
      console.log(photoUrl);

      await knex("food").insert({
        food_photo: photoUrl,
        food_name,
        food_brand,
        food_type,
        food_description,
      });

      res.status(201).json({ message: "Food added successfully!" });
    } catch (error) {
      console.error("Error adding food:", error);
      res.status(500).json({ error: "Failed to add food" });
    }
  });
};

export const findFood = async (req, res) => {
  try {
    const foodFound = await knex("food")
      .select(
        "id",
        "food_name",
        "food_brand",
        "food_photo",
        "food_type",
        "food_description"
      )
      .where({
        id: req.params.id,
      })
      .first();

    if (foodFound.length === 0) {
      return res.status(404).json({
        message: `Food with ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(foodFound);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve food data for food with ID ${req.params.id}`,
    });
  }
};

export const editFood = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Image upload failed" });
    }

    const { food_name, food_brand, food_photo, food_type, food_description } =
      req.body;

    if (
      !food_name ||
      !food_brand ||
      !food_photo ||
      !food_type ||
      !food_description
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let photoUrl = food_photo;
    if (req.file) {
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader
            .upload_stream({ folder: "cat-care-app" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(req.file.buffer);
        });

        photoUrl = uploadResult.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    try {
      const updateData = {
        food_name,
        food_brand,
        food_photo,
        food_type,
        food_description,
      };

      if (photoUrl) {
        updateData.food_photo = photoUrl;
      }

      const rowAffected = await knex("food")
        .where({ id: req.params.id })
        .update(updateData);

      if (rowAffected === 0) {
        return res
          .status(404)
          .json({ message: `Food with ID ${req.params.id} not found` });
      }

      res.status(200).json({ message: "Food updated successfully" });
    } catch (error) {
      console.error("Error updating food:", error);
      res.status(500).json({ error: "Failed to update food" });
    }
  });
};

export const deleteFood = async (req, res) => {
  const foodId = req.params.id;
  try {
    const rowsDeleted = await knex("food").where("id", foodId).delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Food with ID ${catId} not found`,
      });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

export const findFoodRating = async (req, res) => {
  try {
    const ratings = await knex("food")
      .join("food_rating", "food_rating.food_id", "food.id")
      .where({ food_id: req.params.id })
      .select(
        "food_rating.id",
        "food_rating.food_id",
        "food_rating.cat_name",
        "food_rating.rating",
        "food_rating.comment"
      );

    res.status(200).json(ratings);
  } catch (error) {
    res.status(404).json({
      message: `no rating found with this food ID ${req.params.id}: ${error}`,
    });
  }
};
