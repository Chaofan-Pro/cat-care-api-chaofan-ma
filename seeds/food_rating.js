export async function seed(knex) {
  await knex("food_rating").del();
  await knex("food_rating").insert([
    {
      id: 1,
      food_id: 1,
      cat_id: 1,
      rating: 3,
      comment: "Didn't like it much",
    },
    {
      id: 2,
      food_id: 1,
      cat_id: 2,
      rating: 4,
      comment: "It's just okay",
    },
    {
      id: 3,
      food_id: 2,
      cat_id: 1,
      rating: 4,
      comment: "Likes it in general",
    },
    {
      id: 4,
      food_id: 2,
      cat_id: 2,
      rating: 3,
      comment: "Hate this one and didn't eat at all",
    },
    {
      id: 5,
      food_id: 3,
      cat_id: 1,
      rating: 5,
      comment: "Love it, finished all",
    },
    {
      id: 6,
      food_id: 3,
      cat_id: 2,
      rating: 5,
      comment: "Love it, finish very fast",
    },
    {
      id: 7,
      food_id: 4,
      cat_id: 1,
      rating: 5,
      comment: "Best snack!",
    },
    {
      id: 8,
      food_id: 4,
      cat_id: 2,
      rating: 5,
      comment: "Favorite one!",
    },
  ]);
}
