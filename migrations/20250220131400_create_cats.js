export function up(knex) {
  return knex.schema.createTable("cats", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("photo").notNullable();
    table.date("birth_date").notNullable();
    table.enu("gender", ["Male", "Female"]).notNullable();
    table.string("color").notNullable();
    table.float("weight").notNullable();
    table.text("intro").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTable("album").dropTable("artist");
}
