export async function seed(knex) {
  await knex("food").del();
  await knex("food").insert([
    {
      id: 1,
      food_name: "Instinct",
      food_brand: "Chicken feast",
      food_photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740077558/photo_2025-01-16_13-17-41_jlup8g.jpg",
      food_type: "Dry Food",
    },
    {
      id: 2,
      food_name: "Instinct",
      food_brand: "Chicken feast",
      food_photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740077558/photo_2025-01-16_13-17-41_jlup8g.jpg",
      food_type: "Dry Food",
    },
  ]);
}
