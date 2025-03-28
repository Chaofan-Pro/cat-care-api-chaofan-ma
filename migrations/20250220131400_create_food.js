export function up(knex) {
  return knex.schema.createTable("food", (table) => {
    table.increments("id").primary();
    table.string("food_name").notNullable();
    table.string("food_brand").notNullable();
    table.string("food_photo").notNullable();
    table.string("food_type", ["Wet Food", "Dry Food", "Snack"]).notNullable();
    table.string("food_description").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTable("food");
}
