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
      "comment"
    );
    res.status(200).json(food);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error getting rating.");
  }
};

export const addRating = async (req, res) => {
  const { food_id, cat_id, rating, comment } = req.body;

  if (!food_id) {
    return res.status(400).json({ error: "Missing required food id" });
  }
  if (!cat_id) {
    return res.status(400).json({ error: "Missing required cat id" });
  }
  if (!rating) {
    return res.status(400).json({ error: "Missing required rating" });
  }
  if (!comment) {
    return res.status(400).json({ error: "Missing required comment" });
  }

  try {
    await knex("food_rating").insert(req.body);

    res.status(201).json({ message: "Rating added successfully!" });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ error: "Failed to add rating" });
  }
};

// export const findFood = async (req, res) => {
//   try {
//     const foodFound = await knex("food")
//       .select("id", "food_name", "food_brand", "food_photo", "food_type")
//       .where({
//         id: req.params.id,
//       })
//       .first();

//     if (foodFound.length === 0) {
//       return res.status(404).json({
//         message: `Food with ID ${req.params.id} not found`,
//       });
//     }
//     res.status(200).json(foodFound);
//   } catch (error) {
//     res.status(500).json({
//       message: `Unable to retrieve food data for food with ID ${req.params.id}`,
//     });
//   }
// };

// export const editFood = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({ error: "Image upload failed" });
//     }

//     const { food_name, food_brand, food_photo, food_type } = req.body;

//     if (!food_name || !food_brand || !food_photo || !food_type) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     let photoUrl = food_photo;
//     if (req.file) {
//       try {
//         const uploadResult = await new Promise((resolve, reject) => {
//           cloudinary.v2.uploader
//             .upload_stream({ folder: "cat-care-app" }, (error, result) => {
//               if (error) reject(error);
//               else resolve(result);
//             })
//             .end(req.file.buffer);
//         });

//         photoUrl = uploadResult.secure_url;
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         return res.status(500).json({ error: "Failed to upload image" });
//       }
//     }

//     try {
//       const updateData = {
//         food_name,
//         food_brand,
//         food_photo,
//         food_type,
//       };

//       if (photoUrl) {
//         updateData.food_photo = photoUrl;
//       }

//       const rowAffected = await knex("food")
//         .where({ id: req.params.id })
//         .update(updateData);

//       if (rowAffected === 0) {
//         return res
//           .status(404)
//           .json({ message: `Food with ID ${req.params.id} not found` });
//       }

//       res.status(200).json({ message: "Food updated successfully" });
//     } catch (error) {
//       console.error("Error updating food:", error);
//       res.status(500).json({ error: "Failed to update food" });
//     }
//   });
// };

export const deleteRating = async (req, res) => {
  const ratingId = req.params.id;
  try {
    const rowsDeleted = await knex("food_rating").where("id", ratingId).delete();

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
