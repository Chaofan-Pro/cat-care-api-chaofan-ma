export function up(knex) {
  return knex.schema.createTable("food_rating", (table) => {
    table.increments("id").primary();
    table.integer("food_id");
    table.string("cat_id");
    table.integer("rating");
    table.string("comment").notNullable();
    table.timestamp("timestamp").defaultTo(knex.fn.now());
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTable("food_rating");
}
