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
      "food_type"
    );
    res.status(200).json(food);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error getting food.");
  }
};

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });
// const storage = multer.memoryStorage();
// const upload = multer({ storage }).single("photo");

// export const addCat = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({ error: "Image upload failed" });
//     }

//     const { name, birth_date, gender, color, weight, intro } = req.body;

//     if (
//       !req.file ||
//       !name ||
//       !birth_date ||
//       !gender ||
//       !color ||
//       !weight ||
//       !intro
//     ) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     try {
//       const uploadResult = await new Promise((resolve, reject) => {
//         cloudinary.v2.uploader
//           .upload_stream({ folder: "cat-care-app" }, (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           })
//           .end(req.file.buffer);
//       });

//       const photoUrl = uploadResult.secure_url;
//       console.log(photoUrl);

//       await knex("cats").insert({
//         photo: photoUrl,
//         name,
//         birth_date,
//         gender,
//         color,
//         weight,
//         intro,
//       });

//       res.status(201).json({ message: "Cat added successfully!" });
//     } catch (error) {
//       console.error("Error adding cat:", error);
//       res.status(500).json({ error: "Failed to add cat" });
//     }
//   });
// };

// export const findCat = async (req, res) => {
//   try {
//     const catFound = await knex("cats")
//       .select(
//         "id",
//         "name",
//         "photo",
//         "birth_date",
//         "gender",
//         "color",
//         "weight",
//         "intro"
//       )
//       .where({
//         id: req.params.id,
//       })
//       .first();

//     if (catFound.length === 0) {
//       return res.status(404).json({
//         message: `Cat with ID ${req.params.id} not found`,
//       });
//     }
//     res.status(200).json(catFound);
//   } catch (error) {
//     res.status(500).json({
//       message: `Unable to retrieve cat data for cat with ID ${req.params.id}`,
//     });
//   }
// };

// export const editCat = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({ error: "Image upload failed" });
//     }

//     const { name, birth_date, gender, color, weight, intro, photo } = req.body;

//     if (!name || !birth_date || !gender || !color || !weight || !intro) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     let photoUrl = photo;
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
//         name,
//         birth_date,
//         gender,
//         color,
//         weight,
//         intro,
//       };

//       if (photoUrl) {
//         updateData.photo = photoUrl;
//       }

//       const rowAffected = await knex("cats")
//         .where({ id: req.params.id })
//         .update(updateData);

//       if (rowAffected === 0) {
//         return res
//           .status(404)
//           .json({ message: `Cat with ID ${req.params.id} not found` });
//       }

//       res.status(200).json({ message: "Cat updated successfully" });
//     } catch (error) {
//       console.error("Error updating cat:", error);
//       res.status(500).json({ error: "Failed to update cat" });
//     }
//   });
// };

// export const deleteCat = async (req, res) => {
//   const catId = req.params.id;
//   try {
//     const rowsDeleted = await knex("cats").where("id", catId).delete();

//     if (rowsDeleted === 0) {
//       return res.status(404).json({
//         message: `Cat with ID ${catId} not found`,
//       });
//     }
//     return res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send();
//   }
// };
