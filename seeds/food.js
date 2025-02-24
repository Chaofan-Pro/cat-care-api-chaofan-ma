export async function seed(knex) {
  await knex("food").del();
  await knex("food").insert([
    {
      id: 1,
      food_brand: "Instinct",
      food_name: "Ultimate Protein Cage-Free Duck Recipe",
      food_photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740308564/cat-care-app/ysshin5dup4v7apwrbdt.jpg",
      food_type: "Dry Food",
      food_description:
        "90% of protein from real duck, chicken, and eggs. Up to 2X more real duck and chicken.* Absolutely no animal meal ",
    },
    {
      id: 2,
      food_brand: "Acana",
      food_name: "First Feast",
      food_photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740335685/ACANA_Cat_First_Feast_Front_1_nlqmye.webp",
      food_type: "Dry Food",
      food_description:
        " Rich with 70% quality animal ingredients1 including fresh or raw free-run2 chicken and whole herring, First Feast has the animal protein your kitten needs to grow up strong. ",
    },
  ]);
}
