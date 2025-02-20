export function up(knex) {
    return knex.schema
        .createTable("cats", (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.date('birth_date').nullable();
            table.enu('gender', ['Male', 'Female']).notNullable();
            table.string('color').nullable(); 
            table.float('weight').nullable(); 
            table.text('intro').nullable(); 
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        });
}

export function down(knex) {
    return knex.schema.dropTable("album").dropTable("artist");
}
