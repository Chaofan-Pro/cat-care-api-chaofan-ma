import initKnex from "knex";
import cloudinary from "cloudinary";
import multer from "multer";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getCats = async (_req, res) => {
  try {
    const cats = await knex("cats").select(
      "id",
      "photo",
      "name",
      "birth_date",
      "gender",
      "color",
      "weight",
      "intro"
    );
    res.status(200).json(cats);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error getting cats.");
  }
};

// export const uploadImage = async (req, res) => {
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("photo");

//   const form = formidable({ multiples: false });

//   form.parse(req, async (err, fields, files) => {
//     if (err || !files.image) {
//       return res
//         .status(400)
//         .json({ error: "No image provided or file parsing error" });
//     }
//   });

//   const imageFile = files.image[0] || files.image;
//   if (!imageFile || !imageFile.filepath) {
//     return res.status(400).json({ error: "Invalid file format" });
//   }

//   const imagePath = imageFile.filepath;
//   console.log("✅ File Received:", imagePath);

//   // ✅ Upload to Cloudinary
//   let uploadResult;
//   try {
//     console.log("🔍 Uploading file to Cloudinary:", imagePath);
//     uploadResult = await cloudinary.uploader.upload(imagePath, {
//       folder: "uploads",
//     });
//   } catch (cloudinaryError) {
//     console.error("❌ Cloudinary Upload Failed:", cloudinaryError);
//     return res.status(500).json({ error: "Cloudinary upload failed" });
//   }

//   const imageUrl = uploadResult.secure_url;
//   console.log("✅ Cloudinary Upload Success:", imageUrl);
// };

export const addCat = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Image upload failed" });
    }

    const { name, birth_date, gender, color, weight, intro } = req.body;

    if (
      !req.file ||
      !name ||
      !birth_date ||
      !gender ||
      !color ||
      !weight ||
      !intro
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Upload image to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream(
            { folder: "cat-care-app" }, // Optional folder
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      const photoUrl = uploadResult.secure_url; // Get the uploaded image URL
      console.log(photoUrl);

      // Insert cat data into the database
      await knex("cats").insert({
        photo: photoUrl,
        name,
        birth_date,
        gender,
        color,
        weight,
        intro,
      });

      res.status(201).json({ message: "Cat added successfully!" });
    } catch (error) {
      console.error("Error adding cat:", error);
      res.status(500).json({ error: "Failed to add cat" });
    }
  });
};
//   const { name, birth_date, gender, color, weight, intro } = req.body;

//   let photo = "";
//   if (req.file) {
//     photo = `http://localhost:${PORT}/uploads/${req.file.filename}`; // URL to the uploaded file
//   }

//   if (
//     !photo ||
//     !name ||
//     !birth_date ||
//     !gender ||
//     !color ||
//     !weight ||
//     !intro
//   ) {
//     return res
//       .status(400)
//       .json("Error adding cat because of missing properties");
//   }
//   try {
//     await knex("cats").insert({
//       name,
//       photo,
//       birth_date,
//       gender,
//       color,
//       weight,
//       intro,
//     });
//     res.status(201).json();
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: `Error adding cat. ${error}` });
//   }
// };

export const findCat = async (req, res) => {
  try {
    const catFound = await knex("cats")
      .select(
        "id",
        "name",
        "photo",
        "birth_date",
        "gender",
        "color",
        "weight",
        "intro"
      )
      .where({
        id: req.params.id,
      })
      .first();

    if (catFound.length === 0) {
      return res.status(404).json({
        message: `Cat with ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(catFound);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve cat data for cat with ID ${req.params.id}`,
    });
  }
};

export const editCat = async (req, res) => {
  const { photo, name, birth_date, gender, color, weight, intro } = req.body;

  if (
    !photo ||
    !name ||
    !birth_date ||
    !gender ||
    !color ||
    !weight ||
    !intro
  ) {
    return res
      .status(400)
      .json("Error adding cat because of missing properties");
  }

  try {
    const rowAffected = await knex("cats")
      .where({ id: req.params.id })
      .update(req.body);
    if (rowAffected === 0) {
      return res.status(404).json({
        message: `Cat with ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(rowAffected);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error editing cat. ${error}` });
  }
};

export const deleteCat = async (req, res) => {
  const catId = req.params.id;
  try {
    const rowsDeleted = await knex("cats").where("id", catId).delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Cat with ID ${catId} not found`,
      });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};
