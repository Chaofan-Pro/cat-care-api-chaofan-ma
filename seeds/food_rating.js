export async function seed(knex) {
  await knex("food_rating").del();
  await knex("food_rating").insert([
    {
      id: 1,
      food_id: 1,
      cat_name: "Tomat",
      rating: 5,
      comment: "delicious",
    },
    {
      id: 2,
      food_id: 1,
      cat_name: "Pomat",
      rating: 5,
      comment: "delicious",
    },
  ]);
}
