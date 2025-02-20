import initKnex from "knex";
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

export const addCat = async (req, res) => {
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
    await knex("cats").insert(req.body);
    res.status(201).json();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error adding cat. ${error}` });
  }
};

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

// const editWarehouse = async (req, res) => {
//   const {
//     warehouse_name,
//     address,
//     city,
//     country,
//     contact_name,
//     contact_position,
//     contact_phone,
//     contact_email,
//   } = req.body;
//   if (
//     !warehouse_name ||
//     !address ||
//     !city ||
//     !country ||
//     !contact_name ||
//     !contact_position ||
//     !contact_phone ||
//     !contact_email
//   ) {
//     return res
//       .status(400)
//       .json("Error editing warehouse because of missing properties");
//   }
//   if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(contact_phone)) {
//     return res.status(400).json({ error: "Invalid phone number" });
//   }
//   if (!/\S+@\S+\.\S+/.test(contact_email)) {
//     return res.status(400).json({ error: "Invalid email" });
//   }
//   try {
//     const rowAffected = await knex("warehouses")
//       .where({ id: req.params.id })
//       .update(req.body);
//     if (rowAffected === 0) {
//       return res.status(404).json({
//         message: `Warehouse with ID ${req.params.id} not found`,
//       });
//     }
//     const editedWarehouse = await knex("warehouses")
//       .select(
//         "id",
//         "warehouse_name",
//         "address",
//         "city",
//         "country",
//         "contact_name",
//         "contact_position",
//         "contact_phone",
//         "contact_email"
//       )
//       .where({
//         id: req.params.id,
//       })
//       .first();
//     res.status(200).json(editedWarehouse);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: `Error adding warehouse. ${error}` });
//   }
// };

// const getWarehouseinventories = async (req, res) => {
//   try {
//     const inventories = await knex("warehouses")
//       .join("inventories", "inventories.warehouse_id", "warehouses.id")
//       .where({ warehouse_id: req.params.id })
//       .select(
//         "inventories.id",
//         "inventories.item_name",
//         "inventories.category",
//         "inventories.status",
//         "inventories.quantity"
//       );

//     res.status(200).json(inventories);
//   } catch (error) {
//     res.status(404).json({
//       message: `no inventory found with this warehouse ID ${req.params.id}: ${error}`,
//     });
//   }
// };

// const deleteWarehouse = async (req, res) => {
//   const warehouseId = req.params.id;
//   try {
//     const rowsDeletedInventories = await knex("inventories")
//       .where("warehouse_id", warehouseId)
//       .delete();

//     const rowsDeletedWarehouse = await knex("warehouses")
//       .where("id", warehouseId)
//       .delete();

//     if (rowsDeletedWarehouse === 0) {
//       return res.status(404).json({
//         message: `Warehouse with ID ${warehouseId} not found`,
//       });
//     }
//     return res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send();
//   }
// };
