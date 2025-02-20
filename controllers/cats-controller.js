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
