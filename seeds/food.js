export async function seed(knex) {
  await knex("food").del();
  await knex("food").insert([
    {
      id: 1,
      food_brand: "Instinct",
      food_name: "Ultimate Protein Cage-Free Duck Recipe",
      food_photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740367519/ppjw9s83pvjronzj9qix_avk5ss.jpg",
      food_type: "Dry Food",
      food_description:
        "90% of protein from real duck, chicken, and eggs. Up to 2X more real duck and chicken.* Absolutely no animal meal ",
    },
    {
      id: 2,
      food_brand: "Acana",
      food_name: "First Feast",
      food_photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740367550/cat-care-app/u28rblmi1dzjukqnbmtf.webp",
      food_type: "Dry Food",
      food_description:
        "Rich with 70% quality animal ingredients1 including fresh or raw free-run2 chicken and whole herring, First Feast has the animal protein your kitten needs to grow up strong. ",
    },
    {
      id: 3,
      food_brand: "Open Farm",
      food_name: "Harvest Chicken Rustic Blend",
      food_photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740367654/PDP-Images-RB-Main-2023-Chicken-FOP_rs85ce.webp",
      food_type: "Wet Food",
      food_description:
        " This chicken soup for the feline soul is a great source of Omega 6 fatty acids thanks to a single-protein blend of humanely raised chicken and non-GMO dandelion greens and superfoods.",
    },
    {
      id: 4,
      food_brand: "Stella&Chewy's",
      food_name: "Meowfulls Chicken & Chicken Liver",
      food_photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740367765/761210.CAT-MF-FDCCL-1.5.Main_325d2dff-ba9a-4ac9-91bf-c0b906f87a8e_c4kwhp.webp",
      food_type: "Snack",
      food_description:
        " Delicious taste from real, freeze-dried raw chicken & chicken liver. Salmon oil supports skin & coat health",
    },
  ]);
}
