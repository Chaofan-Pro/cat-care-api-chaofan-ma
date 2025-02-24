export async function seed(knex) {
  await knex("cats").del();
  await knex("cats").insert([
    {
      id: 1,
      name: "Tomat",
      photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740077558/photo_2025-01-16_13-17-41_jlup8g.jpg",
      birth_date: "2024-09-10",
      gender: "Female",
      color: "grey",
      weight: 2,
      intro:
        "Tomat is a cute and gentle cat. Tomat likes to play a lot. Tomat like to sleep near the end of the bed. Tomat eats food slowly",
    },
    {
      id: 2,
      name: "Potat",
      photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740077540/photo_2025-01-23_13-08-24_jq2hbo.jpg",
      birth_date: "2024-09-10",
      gender: "Female",
      color: "black",
      weight: 3,
      intro:
        "Potat is a huge and brutal cat. Potat only plays when the toy is moving fast. Potat would come to the bed for pet in the morning. Potat eats a lot and eats fast",
    },
  ]);
}
