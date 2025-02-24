import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getRating = async (_req, res) => {
  try {
    const food = await knex("food_rating").select(
      "id",
      "food_id",
      "cat_id",
      "rating",
      "comment",
      "timestamp"
    );
    res.status(200).json(food);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error getting rating.");
  }
};

export const addRating = async (req, res) => {
  const { food_id, cat_id, rating, comment, timestamp } = req.body;

  if (!food_id || !cat_id || !rating || !comment || !timestamp) {
    return res.status(400).json({ error: "Missing required property" });
  }

  try {
    await knex("food_rating").insert(req.body);

    res.status(201).json({ message: "Rating added successfully!" });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ error: "Failed to add rating" });
  }
};

export const deleteRating = async (req, res) => {
  const ratingId = req.params.id;
  try {
    const rowsDeleted = await knex("food_rating")
      .where("id", ratingId)
      .delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Food with ID ${ratingId} not found`,
      });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};
