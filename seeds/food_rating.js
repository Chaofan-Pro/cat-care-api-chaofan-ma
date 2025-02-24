export async function seed(knex) {
  await knex("food_rating").del();
  await knex("food_rating").insert([
    {
      id: 1,
      food_id: 1,
      cat_id: 1,
      rating: 4,
      comment: "didn't like it much",
    },
    {
      id: 2,
      food_id: 1,
      cat_id: 2,
      rating: 5,
      comment: "finished it fast",
    },
    {
      id: 3,
      food_id: 2,
      cat_id: 1,
      rating: 5,
      comment: "likes it",
    },
    {
      id: 4,
      food_id: 2,
      cat_id: 2,
      rating: 3,
      comment: "don't really bother to eat this",
    },
  ]);
}
